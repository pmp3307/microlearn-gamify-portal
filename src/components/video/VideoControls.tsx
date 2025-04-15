
import React from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { formatTime } from '@/utils/mediaUtils';

interface VideoControlsProps {
  isPlaying: boolean;
  isMuted: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isAudioOnly: boolean;
  showControls: boolean;
  onPlayPause: () => void;
  onMuteToggle: () => void;
  onVolumeChange: (value: number[]) => void;
  onSeek: (value: number[]) => void;
  onFullScreen: () => void;
}

/**
 * Media player controls component with play/pause, volume, seek and fullscreen functionality
 */
export const VideoControls: React.FC<VideoControlsProps> = ({
  isPlaying,
  isMuted,
  currentTime,
  duration,
  volume,
  isAudioOnly,
  showControls,
  onPlayPause,
  onMuteToggle,
  onVolumeChange,
  onSeek,
  onFullScreen
}) => {
  // Skip ahead/back 10 seconds
  const handleSkipForward = () => {
    if (duration > 0) onSeek([Math.min(currentTime + 10, duration)]);
  };
  
  const handleSkipBack = () => {
    if (duration > 0) onSeek([Math.max(currentTime - 10, 0)]);
  };
  
  return (
    <div 
      className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent px-4 pt-16 pb-4 transition-all duration-300 ${showControls || isAudioOnly ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Progress bar */}
      {duration > 0 && (
        <div className="mb-2">
          <Slider
            value={[currentTime]}
            min={0}
            max={duration || 100}
            step={0.1}
            onValueChange={onSeek}
            className="mb-1.5 cursor-pointer"
          />
          <div className="flex justify-between text-xs text-white/80">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      )}
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={onPlayPause}>
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>

          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={handleSkipBack}>
            <SkipBack className="h-4 w-4" />
          </Button>
          
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={handleSkipForward}>
            <SkipForward className="h-4 w-4" />
          </Button>
          
          <div className="hidden sm:flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={onMuteToggle}>
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </Button>
            
            <Slider
              value={[volume]}
              min={0}
              max={1}
              step={0.1}
              onValueChange={onVolumeChange}
              className="w-24"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-white text-xs hidden sm:inline">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
          
          {!isAudioOnly && (
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={onFullScreen}>
              <Maximize className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
