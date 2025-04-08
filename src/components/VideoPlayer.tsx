
import React, { useEffect } from 'react';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMediaPlayer } from '@/hooks/useMediaPlayer';
import { processMediaUrl } from '@/utils/mediaUtils';
import { AudioVisualizer } from '@/components/video/AudioVisualizer';
import { VideoControls } from '@/components/video/VideoControls';
import { ReactionButtons } from '@/components/video/ReactionButtons';
import { UserInfo } from '@/components/video/UserInfo';
import { MediaLoadingError } from '@/components/video/MediaLoadingError';
import { LoadingIndicator } from '@/components/video/LoadingIndicator';

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
  const {
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
  } = useMediaPlayer({ onComplete, url: videoUrl });
  
  // Process URL and set up media when URL changes
  useEffect(() => {
    const { processedUrl, isAudioOnly: isAudio } = processMediaUrl(videoUrl);
    processedUrlRef.current = processedUrl;
    setIsAudioOnly(isAudio);
    
    // Reset state when URL changes
    setIsError(false);
    setLoadingMessage("Loading media...");
    
    // For ElevenLabs URLs, show specific loading message
    if (videoUrl && videoUrl.includes('elevenlabs.io/app/share')) {
      setLoadingMessage("Loading ElevenLabs audio...");
    }
    
    // Return cleanup function
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [videoUrl, setIsAudioOnly, setLoadingMessage, setIsError]);

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
        <MediaLoadingError onRetry={() => setIsError(false)} />
      ) : (
        <>
          {isAudioOnly ? (
            <>
              <AudioVisualizer />
              <audio
                ref={audioRef}
                src={processedUrlRef.current}
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
              src={processedUrlRef.current}
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
      {!isError && !duration && processedUrlRef.current && (
        <LoadingIndicator message={loadingMessage} />
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
      <VideoControls
        isPlaying={isPlaying}
        isMuted={isMuted}
        currentTime={currentTime}
        duration={duration}
        volume={volume}
        isAudioOnly={isAudioOnly}
        showControls={showControls}
        onPlayPause={handlePlayPause}
        onMuteToggle={handleMuteToggle}
        onVolumeChange={handleVolumeChange}
        onSeek={handleSeek}
        onFullScreen={handleFullScreen}
      />
      
      {/* Right side action buttons (TikTok style) */}
      {showReactions && (
        <ReactionButtons liked={liked} onReaction={handleReaction} />
      )}
      
      {/* Bottom user info (TikTok style) */}
      {showReactions && (
        <UserInfo
          username={username}
          description={description}
          songTitle={songTitle}
        />
      )}
    </div>
  );
};
