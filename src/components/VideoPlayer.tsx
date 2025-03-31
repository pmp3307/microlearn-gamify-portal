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

  // ... (keep other handler functions the same as previous versions)

  return (
    <div className="relative flex justify-center items-center bg-black">
      {/* Container with fixed width but flexible height for different screens */}
      <div 
        className="relative w-[300px] h-[533px] bg-black rounded-lg overflow-hidden"
        onMouseMove={resetControlsTimeout}
        onMouseLeave={() => {
          if (isPlaying) {
            setShowControls(false);
          }
        }}
      >
        {/* Video element with absolute positioning to fill container */}
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
        
        {/* Play/Pause overlay */}
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
        
        {/* Right side action buttons */}
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
        
        {/* Bottom user info */}
        <div className="absolute bottom-20 left-4 text-white">
          <div className="font-bold text-lg">{username}</div>
          <div className="text-sm mb-2 max-w-[200px] line-clamp-2">{description}</div>
          <div className="flex items-center">
            <Music className="h-4 w-4 mr-1" />
            <span className="text-xs max-w-[180px] truncate">{songTitle}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
