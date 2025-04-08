
/**
 * Media utilities for processing video/audio URLs and handling media types
 */

/**
 * Process a media URL and determine if it's audio-only
 */
export const processMediaUrl = (url: string | undefined): { processedUrl: string, isAudioOnly: boolean } => {
  if (!url) return { processedUrl: '', isAudioOnly: false };
  
  // Handle ElevenLabs share URL
  if (url.includes('elevenlabs.io/app/share')) {
    const shareId = url.split('/').pop();
    if (!shareId) return { processedUrl: '', isAudioOnly: false };
    
    return { 
      processedUrl: `https://api.elevenlabs.io/v1/audio/${shareId}/stream?optimize_streaming_latency=3`,
      isAudioOnly: true
    };
  }
  
  // Determine if this is an audio file
  const audioExtensions = ['.mp3', '.wav', '.m4a', '.aac', '.flac', '.ogg'];
  const isAudioFile = audioExtensions.some(ext => url.toLowerCase().endsWith(ext));
  
  return { processedUrl: url, isAudioOnly: isAudioFile };
};

/**
 * Format time in seconds to MM:SS format
 */
export const formatTime = (timeInSeconds: number): string => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};
