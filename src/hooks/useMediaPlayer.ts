
import { useState, useRef, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

// Types for tracking mechanisms
interface TrackingData {
  objectId?: string;
  verb: string;
  result?: {
    completion?: boolean;
    duration?: number;
    progress?: number;
  };
}

interface UseMediaPlayerOptions {
  onComplete?: () => void;
  url?: string;
  trackProgress?: boolean;
  learningObjectId?: string;
}

// Add proper type definitions for SCORM APIs
declare global {
  interface Window {
    // SCORM 2004 API
    API_1484_11?: any;
    // SCORM 1.2 API
    API?: any;
    // xAPI
    ADL?: {
      XAPIWrapper: {
        sendStatement: (statement: any) => void;
      };
    };
  }
}

/**
 * Custom hook for media player functionality with SCORM and xAPI support
 */
export const useMediaPlayer = ({ 
  onComplete, 
  url,
  trackProgress = false,
  learningObjectId
}: UseMediaPlayerOptions = {}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [volume, setVolume] = useState(1);
  const [liked, setLiked] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isAudioOnly, setIsAudioOnly] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Loading media...");
  const { toast } = useToast();
  
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const processedUrlRef = useRef<string>('');
  
  // SCORM API reference
  const scormAPIRef = useRef<any>(null);
  const lastTrackedProgressRef = useRef<number>(0);
  
  // Initialize SCORM API
  useEffect(() => {
    if (trackProgress) {
      // Try to find SCORM API in parent windows (for LMS integration)
      try {
        let win: Window = window;
        let findAttempts = 0;
        const findAPI = (win: Window): any => {
          // Search for standard SCORM 2004 API
          let API = win.API_1484_11;
          if (API) return API;
          
          // Search for SCORM 1.2 API
          API = win.API;
          if (API) return API;
          
          // Search in parent if we're in an iframe
          if (win.parent && win.parent !== win) {
            return findAPI(win.parent as Window);
          }
          
          return null;
        };
        
        while (!scormAPIRef.current && findAttempts < 10) {
          scormAPIRef.current = findAPI(win);
          findAttempts++;
          
          // If we can't find it, try the parent window
          if (!scormAPIRef.current && win.parent && win.parent !== win) {
            win = win.parent as Window;
          } else {
            break;
          }
        }
        
        if (scormAPIRef.current) {
          console.log("SCORM API found");
          // Initialize communication with SCORM
          if (typeof scormAPIRef.current.Initialize === 'function') {
            // SCORM 2004
            scormAPIRef.current.Initialize("");
          } else if (typeof scormAPIRef.current.LMSInitialize === 'function') {
            // SCORM 1.2
            scormAPIRef.current.LMSInitialize("");
          }
        } else {
          console.log("SCORM API not found - running in standalone mode");
        }
      } catch (e) {
        console.error("Error initializing SCORM API:", e);
      }
    }
    
    return () => {
      // Terminate SCORM session on unmount
      if (scormAPIRef.current) {
        try {
          if (typeof scormAPIRef.current.Terminate === 'function') {
            // SCORM 2004
            scormAPIRef.current.Terminate("");
          } else if (typeof scormAPIRef.current.LMSFinish === 'function') {
            // SCORM 1.2
            scormAPIRef.current.LMSFinish("");
          }
        } catch (e) {
          console.error("Error terminating SCORM session:", e);
        }
      }
    };
  }, [trackProgress]);
  
  // Track progress
  const trackMediaEvent = (verb: string, progress?: number) => {
    if (!trackProgress) return;
    
    const trackingData: TrackingData = {
      objectId: learningObjectId || url,
      verb,
      result: {}
    };
    
    if (progress !== undefined) {
      trackingData.result!.progress = progress;
    }
    
    if (verb === 'completed') {
      trackingData.result!.completion = true;
      trackingData.result!.duration = duration;
    }
    
    // Track via SCORM if available
    if (scormAPIRef.current) {
      try {
        if (typeof scormAPIRef.current.SetValue === 'function') {
          // SCORM 2004
          if (progress !== undefined) {
            scormAPIRef.current.SetValue("cmi.progress_measure", progress.toString());
          }
          if (verb === 'completed') {
            scormAPIRef.current.SetValue("cmi.completion_status", "completed");
            scormAPIRef.current.SetValue("cmi.success_status", "passed");
          }
          scormAPIRef.current.Commit("");
        } else if (typeof scormAPIRef.current.LMSSetValue === 'function') {
          // SCORM 1.2
          if (verb === 'completed') {
            scormAPIRef.current.LMSSetValue("cmi.core.lesson_status", "completed");
          }
          // SCORM 1.2 doesn't have a direct progress measure, but we can set session time
          scormAPIRef.current.LMSCommit("");
        }
      } catch (e) {
        console.error("Error setting SCORM values:", e);
      }
    }
    
    // Track via xAPI if function is available in window
    if (window.ADL && window.ADL.XAPIWrapper) {
      try {
        const statement = {
          actor: {
            name: "User",
            mbox: "mailto:user@example.com"
          },
          verb: {
            id: `http://adlnet.gov/expapi/verbs/${verb}`,
            display: { "en-US": verb }
          },
          object: {
            id: trackingData.objectId,
            definition: {
              name: { "en-US": "Video Content" }
            }
          },
          result: trackingData.result
        };
        
        window.ADL.XAPIWrapper.sendStatement(statement);
      } catch (e) {
        console.error("Error sending xAPI statement:", e);
      }
    }
    
    // Debug tracking data
    console.log("Tracking event:", trackingData);
  };

  const resetControlsTimeout = () => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    setShowControls(true);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying && !isAudioOnly) {
        setShowControls(false);
      }
    }, 3000);
  };

  const handlePlayPause = () => {
    const media = isAudioOnly ? audioRef.current : videoRef.current;
    if (!media) return;

    if (media.paused) {
      media.play().catch(e => {
        console.error("Media play failed:", e);
        setIsError(true);
        toast({
          title: "Media Error",
          description: "There was a problem playing this content. Please check the URL or file format.",
          variant: "destructive",
        });
      });
      setIsPlaying(true);
      resetControlsTimeout();
      trackMediaEvent('played');
    } else {
      media.pause();
      setIsPlaying(false);
      setShowControls(true);
      trackMediaEvent('paused');
    }
  };

  const handleTimeUpdate = () => {
    const media = isAudioOnly ? audioRef.current : videoRef.current;
    if (!media) return;

    setCurrentTime(media.currentTime);
    
    // Track progress at 10% intervals for SCORM/xAPI
    if (trackProgress && media.duration > 0) {
      const progressPercent = Math.floor((media.currentTime / media.duration) * 100) / 100;
      
      // Only track every 10% change to avoid too many events
      const lastProgress = lastTrackedProgressRef.current;
      const progressDiff = Math.abs(progressPercent - lastProgress);
      
      if (progressDiff >= 0.1) {
        trackMediaEvent('progressed', progressPercent);
        lastTrackedProgressRef.current = progressPercent;
      }
    }
    
    // Check if playback is complete (with a small buffer)
    if (media.currentTime >= media.duration - 0.5) {
      if (trackProgress) {
        trackMediaEvent('completed', 1.0);
      }
      
      if (onComplete) {
        onComplete();
      }
    }
  };

  const handleLoadedMetadata = () => {
    const media = isAudioOnly ? audioRef.current : videoRef.current;
    if (!media) return;
    setDuration(media.duration);
    setIsError(false);
    
    // Track media loaded
    trackMediaEvent('initialized');
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    
    const media = isAudioOnly ? audioRef.current : videoRef.current;
    if (media) {
      media.volume = newVolume;
      media.muted = newVolume === 0;
      setIsMuted(newVolume === 0);
    }
  };

  const handleMuteToggle = () => {
    const media = isAudioOnly ? audioRef.current : videoRef.current;
    if (!media) return;

    media.muted = !media.muted;
    setIsMuted(media.muted);
    
    // If unmuting and volume was 0, set to default volume
    if (!media.muted && volume === 0) {
      setVolume(1);
      media.volume = 1;
    }
  };

  const handleFullScreen = () => {
    const container = videoRef.current?.parentElement;
    if (!container) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      container.requestFullscreen().catch(e => console.error("Fullscreen error:", e));
    }
  };

  const handleSeek = (value: number[]) => {
    const media = isAudioOnly ? audioRef.current : videoRef.current;
    if (!media) return;
    
    const newTime = value[0];
    media.currentTime = newTime;
    setCurrentTime(newTime);
    
    // Track seeking event
    if (trackProgress) {
      trackMediaEvent('seeked');
    }
  };

  const handleMediaError = (e: React.SyntheticEvent<HTMLVideoElement | HTMLAudioElement, Event>) => {
    console.error("Media error:", e);
    setIsError(true);
    
    // Track error
    if (trackProgress) {
      trackMediaEvent('failed');
    }
    
    // Check if this is an ElevenLabs URL to provide a specific message
    if (url && url.includes('elevenlabs.io/app/share')) {
      toast({
        title: "ElevenLabs Error",
        description: "There was a problem loading the ElevenLabs audio. The share link might have expired or be invalid.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Media Error",
        description: "There was a problem loading this media. Please check the URL or file format.",
        variant: "destructive",
      });
    }
  };

  // Handle reactions
  const handleReaction = (reaction: 'like' | 'comment' | 'share') => {
    let message = '';
    let icon = '';
    
    switch(reaction) {
      case 'like':
        setLiked(!liked);
        message = liked ? 'Removed like' : 'You liked this content!';
        icon = '❤️';
        
        // Track interaction
        if (trackProgress) {
          trackMediaEvent(liked ? 'unliked' : 'liked');
        }
        return;
      case 'comment':
        message = 'Comment feature would open here';
        icon = '💬';
        
        // Track interaction
        if (trackProgress) {
          trackMediaEvent('commented');
        }
        break;
      case 'share':
        message = 'Share options would appear here';
        icon = '↗️';
        
        // Track interaction
        if (trackProgress) {
          trackMediaEvent('shared');
        }
        break;
    }
    
    toast({
      title: `${icon} ${message}`,
    });
  };

  return {
    videoRef,
    audioRef,
    isPlaying,
    isMuted,
    currentTime,
    duration,
    showControls,
    volume,
    liked,
    isError,
    isAudioOnly,
    loadingMessage,
    processedUrlRef,
    setIsAudioOnly,
    setLoadingMessage,
    setIsError,
    resetControlsTimeout,
    handlePlayPause,
    handleTimeUpdate,
    handleLoadedMetadata,
    handleVolumeChange,
    handleMuteToggle,
    handleFullScreen,
    handleSeek,
    handleMediaError,
    handleReaction,
    setShowControls,
    setIsPlaying
  };
};
