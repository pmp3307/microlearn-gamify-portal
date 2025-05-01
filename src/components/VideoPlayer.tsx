
import React, { useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
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
  // New accessibility props
  ariaLabel?: string;
  transcriptUrl?: string;
  captionsUrl?: string;
  // New tracking props
  trackProgress?: boolean;
  learningObjectId?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  videoUrl = 'https://csxoazpnhatnvioopndo.supabase.co/storage/v1/object/public/projectimages//Master%20the%20PMP%20Exam%20(11).mp4', 
  showReactions = true,
  onComplete,
  username = '@username',
  description = 'This is a sample video description',
  songTitle = 'Original Sound - Artist',
  // Initialize accessibility props
  ariaLabel = 'Video player',
  transcriptUrl,
  captionsUrl,
  // Initialize tracking props
  trackProgress = false,
  learningObjectId
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
    setShowControls,
    setIsPlaying
  } = useMediaPlayer({ onComplete, url: videoUrl, trackProgress, learningObjectId });
  
  const transcriptRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLTrackElement>(null);
  
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

  // Load transcript if available
  useEffect(() => {
    if (transcriptUrl && transcriptRef.current) {
      fetch(transcriptUrl)
        .then(response => {
          if (!response.ok) throw new Error('Failed to load transcript');
          return response.text();
        })
        .then(text => {
          if (transcriptRef.current) transcriptRef.current.innerHTML = text;
        })
        .catch(error => {
          console.error('Error loading transcript:', error);
        });
    }
  }, [transcriptUrl]);

  return (
    <div 
      className="relative w-full h-full bg-black rounded-xl overflow-hidden aspect-[9/16] max-h-[90vh] mx-auto shadow-lg transition-all duration-300 hover:shadow-xl"
      onMouseMove={resetControlsTimeout}
      onMouseLeave={() => {
        if (isPlaying && !isAudioOnly) {
          setShowControls(false);
        }
      }}
      role="region"
      aria-label={ariaLabel}
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
                aria-label={ariaLabel}
                controls={false}
              />
            </>
          ) : (
            <div className="video-container">
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
                aria-label={ariaLabel}
                tabIndex={0}
                // Accessibility attributes
                aria-describedby={transcriptUrl ? "transcript" : undefined}
              >
                {captionsUrl && (
                  <track 
                    ref={trackRef}
                    kind="captions" 
                    src={captionsUrl} 
                    srcLang="en" 
                    label="English"
                    default
                  />
                )}
              </video>
            </div>
          )}
        </>
      )}
      
      {/* Loading indicator */}
      {!isError && !duration && processedUrlRef.current && (
        <LoadingIndicator message={loadingMessage} />
      )}
      
      {/* Play/Pause central overlay */}
      {!isPlaying && !isError && duration > 0 && (
        <div className="absolute inset-0 flex items-center justify-center animate-fade-in">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-20 w-20 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 text-white transition-all duration-300 transform hover:scale-110"
            onClick={handlePlayPause}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="h-12 w-12" /> : <Play className="h-12 w-12 ml-1" />}
          </Button>
        </div>
      )}
      
      {/* Media controls with accessibility */}
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
      
      {/* Right side action buttons */}
      {showReactions && (
        <ReactionButtons liked={liked} onReaction={handleReaction} />
      )}
      
      {/* Bottom user info */}
      {showReactions && (
        <UserInfo
          username={username}
          description={description}
          songTitle={songTitle}
        />
      )}
      
      {/* Hidden transcript for screen readers */}
      {transcriptUrl && (
        <div 
          id="transcript" 
          ref={transcriptRef} 
          className="sr-only"
          aria-live="polite"
        ></div>
      )}
    </div>
  );
};
