import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, Pause, Volume2, VolumeX, Maximize, 
  Heart, MessageSquare, Share2, Music 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';

interface VideoPlayerProps {
  videoUrl?: string;
  username?: string;
  description?: string;
  songTitle?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  videoUrl = 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
  username = '@username',
  description = 'This is a sample video description',
  songTitle = 'Original Sound - Artist'
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [volume, setVolume] = useState(1);
  const [liked, setLiked] = useState(false);
  const { toast } = useToast();

  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
    }
    
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

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

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch(e => console.error("Video play failed:", e));
      setIsPlaying(true);
      resetControlsTimeout();
    } else {
      video.pause();
      setIsPlaying(false);
      setShowControls(true);
    }
  };

  // Add the missing handler functions
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    setCurrentTime(video.currentTime);
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    setDuration(video.duration);
  };

  const handleMuteToggle = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
    
    if (!video.muted && volume === 0) {
      setVolume(1);
      video.volume = 1;
    }
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

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

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
    <div className="relative flex justify-center items-center bg-black">
      <div 
        className="relative w-[300px] h-[533px] bg-black rounded-lg overflow-hidden"
        onMouseMove={resetControlsTimeout}
        onMouseLeave={() => {
          if (isPlaying) {
            setShowControls(false);
          }
        }}
      >
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={videoUrl}
          loop
          playsInline
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
          onClick={handlePlayPause}
        />
        
        {/* Rest of the component remains the same */}
        {!isPlaying && (
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
        
        {/* Video controls and other elements... */}
        {/* ... */}
      </div>
    </div>
  );
};
