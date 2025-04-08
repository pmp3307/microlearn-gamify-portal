
import React from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
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
  return (
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
          onValueChange={onSeek}
          className="mb-2"
        />
      )}
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-white" onClick={onPlayPause}>
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="text-white" onClick={onMuteToggle}>
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
          
          {duration > 0 && (
            <span className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          )}
        </div>
        
        {!isAudioOnly && (
          <Button variant="ghost" size="icon" className="text-white" onClick={onFullScreen}>
            <Maximize className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
};
