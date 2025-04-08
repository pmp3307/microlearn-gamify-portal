
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // TikTok videos are muted by default
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [volume, setVolume] = useState(1);
  const [liked, setLiked] = useState(false);
  const [isError, setIsError] = useState(false);
  const { toast } = useToast();

  // Handle ElevenLabs sharing URLs
  const processedVideoUrl = videoUrl && videoUrl.includes('elevenlabs.io/app/share') 
    ? `https://api.elevenlabs.io/v1/audio/${videoUrl.split('/').pop()}/stream?optimize_streaming_latency=3` 
    : videoUrl;

  // Hide controls timeout
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Reset video state when URL changes
    if (videoRef.current) {
      videoRef.current.muted = true;
      setIsError(false);
      setIsPlaying(false);
      videoRef.current.load(); // Reload the video with new source
    }
    
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [videoUrl]);

  const resetControlsTimeout = () => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    setShowControls(true);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  // Video event handlers
  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch(e => {
        console.error("Video play failed:", e);
        setIsError(true);
        toast({
          title: "Video Error",
          description: "There was a problem playing this video. Please check the URL or file.",
          variant: "destructive",
        });
      });
      setIsPlaying(true);
      resetControlsTimeout();
    } else {
      video.pause();
      setIsPlaying(false);
      setShowControls(true);
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    setCurrentTime(video.currentTime);
    
    // Check if video is complete (with a small buffer)
    if (video.currentTime >= video.duration - 0.5 && onComplete) {
      onComplete();
    }
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    setDuration(video.duration);
    setIsError(false);
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      videoRef.current.muted = newVolume === 0;
      setIsMuted(newVolume === 0);
    }
  };

  const handleMuteToggle = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
    
    // If unmuting and volume was 0, set to default volume
    if (!video.muted && volume === 0) {
      setVolume(1);
      video.volume = 1;
    }
  };

  const handleFullScreen = () => {
    const videoContainer = videoRef.current?.parentElement;
    if (!videoContainer) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoContainer.requestFullscreen().catch(e => console.error("Fullscreen error:", e));
    }
  };

  const handleSeek = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;
    
    const newTime = value[0];
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVideoError = () => {
    setIsError(true);
    toast({
      title: "Video Error",
      description: "There was a problem loading this video. Please check the URL or file.",
      variant: "destructive",
    });
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
        message = liked ? 'Removed like' : 'You liked this video!';
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

  return (
    <div 
      className="relative w-full h-full bg-black rounded-lg overflow-hidden aspect-[9/16] max-h-[90vh] mx-auto"
      onMouseMove={resetControlsTimeout}
      onMouseLeave={() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }}
    >
      {isError ? (
        <div className="absolute inset-0 flex items-center justify-center text-white flex-col">
          <p className="text-lg mb-4">Video could not be loaded</p>
          <p className="text-sm text-gray-300 mb-4">Please check the URL or try another video</p>
          <Button 
            variant="outline" 
            onClick={() => setIsError(false)}
            className="text-white border-white hover:bg-white/20"
          >
            Try Again
          </Button>
        </div>
      ) : (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-contain bg-black"
          src={processedVideoUrl}
          loop // TikTok videos loop by default
          playsInline // Important for mobile browsers
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
          onClick={handlePlayPause}
          onError={handleVideoError}
        />
      )}
      
      {/* Play/Pause central overlay */}
      {!isPlaying && !isError && (
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
      
      {/* Video controls */}
      <div 
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Progress bar */}
        <Slider
          value={[currentTime]}
          min={0}
          max={duration || 100}
          step={0.1}
          onValueChange={handleSeek}
          className="mb-2"
        />
        
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
            
            <span className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
          
          <Button variant="ghost" size="icon" className="text-white" onClick={handleFullScreen}>
            <Maximize className="h-5 w-5" />
          </Button>
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
