
import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, Pause, Volume2, VolumeX, Maximize, 
  ChevronUp, Heart, MessageSquare, Share2, Music 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';

interface VideoPlayerProps {
  videoUrl?: string;
  showReactions?: boolean;
  onComplete?: () => void;
  username?: string;
  description?: string;
  songTitle?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  videoUrl = 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4', 
  showReactions = true,
  onComplete,
  username = '@username',
  description = 'This is a sample video description',
  songTitle = 'Original Sound - Artist'
}) => {
  // Fixed: Using separate refs for video and audio, not switching them conditionally
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

  // Process URL - handle ElevenLabs shares properly
  const processMediaUrl = (url: string | undefined) => {
    if (!url) return '';
    
    // Handle ElevenLabs share URL
    if (url.includes('elevenlabs.io/app/share')) {
      const shareId = url.split('/').pop();
      if (!shareId) return '';
      
      setIsAudioOnly(true);
      return `https://api.elevenlabs.io/v1/audio/${shareId}/stream?optimize_streaming_latency=3`;
    }
    
    // Determine if this is an audio file
    const audioExtensions = ['.mp3', '.wav', '.m4a', '.aac', '.flac', '.ogg'];
    const isAudioFile = audioExtensions.some(ext => url.toLowerCase().endsWith(ext));
    setIsAudioOnly(isAudioFile);
    
    return url;
  };
  
  const processedVideoUrl = processMediaUrl(videoUrl);

  // Hide controls timeout
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Reset state when URL changes
    setIsError(false);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setLoadingMessage("Loading media...");
    
    // For ElevenLabs URLs, show specific loading message
    if (videoUrl && videoUrl.includes('elevenlabs.io/app/share')) {
      setLoadingMessage("Loading ElevenLabs audio...");
    }
    
    // Fixed: Not setting mediaRef conditionally
    if (isAudioOnly) {
      if (audioRef.current) {
        audioRef.current.muted = true;
        audioRef.current.load();
      }
    } else {
      if (videoRef.current) {
        videoRef.current.muted = true;
        videoRef.current.load();
      }
    }
    
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [videoUrl, isAudioOnly]);

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

  // Media event handlers
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
    if (videoUrl && videoUrl.includes('elevenlabs.io/app/share')) {
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

  // Format time display
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
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

  // Audio-only visualization component
  const AudioVisualizer = () => (
    <div className="flex items-center justify-center h-full w-full bg-gradient-to-r from-blue-900 to-purple-900">
      <div className="p-8 rounded-full bg-black/30 flex items-center justify-center">
        <Music className="h-24 w-24 text-white" />
      </div>
    </div>
  );

  return (
    <div 
      className="relative w-full h-full bg-black rounded-lg overflow-hidden aspect-[9/16] max-h-[90vh] mx-auto"
      onMouseMove={resetControlsTimeout}
      onMouseLeave={() => {
        if (isPlaying && !isAudioOnly) {
          setShowControls(false);
        }
      }}
    >
      {isError ? (
        <div className="absolute inset-0 flex items-center justify-center text-white flex-col">
          <p className="text-lg mb-4">Media could not be loaded</p>
          <p className="text-sm text-gray-300 mb-4">Please check the URL or try another file</p>
          <Button 
            variant="outline" 
            onClick={() => setIsError(false)}
            className="text-white border-white hover:bg-white/20"
          >
            Try Again
          </Button>
        </div>
      ) : (
        <>
          {isAudioOnly ? (
            <>
              <AudioVisualizer />
              <audio
                ref={audioRef}
                src={processedVideoUrl}
                loop
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
                onError={handleMediaError}
                onCanPlayThrough={() => console.log("Audio can play through")}
                style={{ display: 'none' }}
              />
            </>
          ) : (
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-contain bg-black"
              src={processedVideoUrl}
              loop
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
              onClick={handlePlayPause}
              onError={handleMediaError}
            />
          )}
        </>
      )}
      
      {/* Loading indicator */}
      {!isError && !duration && processedVideoUrl && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
            <p>{loadingMessage}</p>
          </div>
        </div>
      )}
      
      {/* Play/Pause central overlay */}
      {!isPlaying && !isError && duration > 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-20 w-20 rounded-full bg-black/30 hover:bg-black/50 text-white"
            onClick={handlePlayPause}
          >
            <Play className="h-12 w-12" />
          </Button>
        </div>
      )}
      
      {/* Media controls */}
      <div 
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 transition-opacity duration-300 ${showControls || isAudioOnly ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Progress bar */}
        {duration > 0 && (
          <Slider
            value={[currentTime]}
            min={0}
            max={duration || 100}
            step={0.1}
            onValueChange={handleSeek}
            className="mb-2"
          />
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-white" onClick={handlePlayPause}>
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="text-white" onClick={handleMuteToggle}>
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>
              
              <Slider
                value={[volume]}
                min={0}
                max={1}
                step={0.1}
                onValueChange={handleVolumeChange}
                className="w-24"
              />
            </div>
            
            {duration > 0 && (
              <span className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            )}
          </div>
          
          {!isAudioOnly && (
            <Button variant="ghost" size="icon" className="text-white" onClick={handleFullScreen}>
              <Maximize className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
      
      {/* Right side action buttons (TikTok style) */}
      {showReactions && (
        <div className="absolute right-2 bottom-24 flex flex-col items-center space-y-4">
          <div className="flex flex-col items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-12 w-12 rounded-full bg-transparent hover:bg-white/10 text-white"
              onClick={() => handleReaction('like')}
            >
              <Heart className={`h-6 w-6 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
            <span className="text-white text-xs mt-1">123K</span>
          </div>
          
          <div className="flex flex-col items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-12 w-12 rounded-full bg-transparent hover:bg-white/10 text-white"
              onClick={() => handleReaction('comment')}
            >
              <MessageSquare className="h-6 w-6" />
            </Button>
            <span className="text-white text-xs mt-1">5.2K</span>
          </div>
          
          <div className="flex flex-col items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-12 w-12 rounded-full bg-transparent hover:bg-white/10 text-white"
              onClick={() => handleReaction('share')}
            >
              <Share2 className="h-6 w-6" />
            </Button>
            <span className="text-white text-xs mt-1">Share</span>
          </div>
          
          <div className="rounded-full bg-white/10 w-12 h-12 flex items-center justify-center">
            <Music className="h-6 w-6 text-white" />
          </div>
        </div>
      )}
      
      {/* Bottom user info (TikTok style) */}
      {showReactions && (
        <div className="absolute bottom-20 left-4 text-white">
          <div className="font-bold text-lg">{username}</div>
          <div className="text-sm mb-2">{description}</div>
          <div className="flex items-center">
            <Music className="h-4 w-4 mr-1" />
            <span className="text-xs">{songTitle}</span>
          </div>
        </div>
      )}
    </div>
  );
};
