
import { useState, useRef, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface UseMediaPlayerOptions {
  onComplete?: () => void;
  url?: string;
}

/**
 * Custom hook for media player functionality
 */
export const useMediaPlayer = ({ onComplete, url }: UseMediaPlayerOptions = {}) => {
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
    } else {
      media.pause();
      setIsPlaying(false);
      setShowControls(true);
    }
  };

  const handleTimeUpdate = () => {
    const media = isAudioOnly ? audioRef.current : videoRef.current;
    if (!media) return;

    setCurrentTime(media.currentTime);
    
    // Check if playback is complete (with a small buffer)
    if (media.currentTime >= media.duration - 0.5 && onComplete) {
      onComplete();
    }
  };

  const handleLoadedMetadata = () => {
    const media = isAudioOnly ? audioRef.current : videoRef.current;
    if (!media) return;
    setDuration(media.duration);
    setIsError(false);
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
  };

  const handleMediaError = (e: React.SyntheticEvent<HTMLVideoElement | HTMLAudioElement, Event>) => {
    console.error("Media error:", e);
    setIsError(true);
    
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
        return;
      case 'comment':
        message = 'Comment feature would open here';
        icon = '💬';
        break;
      case 'share':
        message = 'Share options would appear here';
        icon = '↗️';
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
  };
};
