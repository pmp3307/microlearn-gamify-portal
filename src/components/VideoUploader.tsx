
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Link, X, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VideoUploaderProps {
  onVideoSelected: (source: string) => void;
  defaultUrl?: string;
}

export const VideoUploader: React.FC<VideoUploaderProps> = ({ onVideoSelected, defaultUrl = '' }) => {
  const [videoUrl, setVideoUrl] = useState(defaultUrl);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(e.target.value);
  };

  const handleUrlSubmit = () => {
    if (!videoUrl) {
      toast({
        title: "URL Required",
        description: "Please enter a valid video or audio URL",
        variant: "destructive",
      });
      return;
    }
    
    // If it's an ElevenLabs sharing URL, use it directly
    if (videoUrl.includes('elevenlabs.io/app/share')) {
      onVideoSelected(videoUrl);
      toast({
        title: "Media URL Added",
        description: "ElevenLabs shared content has been set",
      });
      return;
    }

    // Check if the URL is valid and points to a media file
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv'];
    const audioExtensions = ['.mp3', '.wav', '.m4a', '.aac'];
    const isVideoFile = videoExtensions.some(ext => videoUrl.toLowerCase().endsWith(ext));
    const isAudioFile = audioExtensions.some(ext => videoUrl.toLowerCase().endsWith(ext));
    const isYouTube = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be');
    const isVimeo = videoUrl.includes('vimeo.com');

    if (isVideoFile || isAudioFile || isYouTube || isVimeo) {
      onVideoSelected(videoUrl);
      toast({
        title: "Media URL Added",
        description: "URL has been set successfully",
      });
    } else {
      toast({
        title: "Invalid Media URL",
        description: "Please enter a URL pointing to a video/audio file or YouTube/Vimeo link",
        variant: "destructive",
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check if file is a video or audio
    if (!file.type.startsWith('video/') && !file.type.startsWith('audio/')) {
      toast({
        title: "Invalid File Type",
        description: "Please select a video or audio file",
        variant: "destructive",
      });
      return;
    }
    
    setSelectedFile(file);
    
    // Create local URL for preview
    const objectUrl = URL.createObjectURL(file);
    onVideoSelected(objectUrl);
    
    // Mock upload process
    simulateUpload(file);
  };
  
  const simulateUpload = (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);
    
    // In a real application, you would use FormData and fetch/axios to upload
    // For now, we'll simulate the upload process
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const next = prev + 10;
        if (next >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          toast({
            title: "Upload Complete",
            description: `${file.name} has been uploaded successfully`,
          });
          return 100;
        }
        return next;
      });
    }, 500);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const clearSelection = () => {
    setVideoUrl('');
    setSelectedFile(null);
    setUploadProgress(0);
    onVideoSelected('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="video-url">Media URL</Label>
        <div className="flex gap-2 mt-1.5">
          <Input
            id="video-url"
            type="text"
            placeholder="Enter video/audio URL (YouTube, Vimeo, ElevenLabs, etc.)"
            value={videoUrl}
            onChange={handleUrlChange}
            className="flex-1"
          />
          <Button onClick={handleUrlSubmit} type="button" className="flex items-center gap-1">
            <Link className="h-4 w-4 mr-1" />
            Add URL
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Supports YouTube, Vimeo, ElevenLabs shares, and direct video/audio links
        </p>
      </div>

      <div className="flex items-center">
        <div className="flex-grow border-t border-gray-200"></div>
        <span className="flex-shrink mx-4 text-gray-400">OR</span>
        <div className="flex-grow border-t border-gray-200"></div>
      </div>

      <div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="video/*,audio/*"
          className="hidden"
        />
        
        <Button 
          onClick={triggerFileInput} 
          variant="outline" 
          className="w-full h-24 flex flex-col items-center justify-center border-dashed border-2"
          disabled={isUploading}
        >
          {isUploading ? (
            <>
              <Loader2 className="h-6 w-6 animate-spin mb-2" />
              <span>Uploading... {uploadProgress}%</span>
            </>
          ) : (
            <>
              <Upload className="h-6 w-6 mb-2" />
              <span>Click to upload video or audio</span>
              <p className="text-xs text-muted-foreground">MP4, MP3, WebM, etc. (max 100MB)</p>
            </>
          )}
        </Button>
      </div>

      {(selectedFile || videoUrl) && !isUploading && (
        <div className="flex items-center justify-between p-2 bg-muted rounded-md">
          <span className="text-sm truncate flex-1">
            {selectedFile ? selectedFile.name : videoUrl}
          </span>
          <Button variant="ghost" size="sm" onClick={clearSelection}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
