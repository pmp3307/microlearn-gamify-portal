
import React, { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

interface VideoUploaderProps {
  onVideoSelected: (source: string) => void;
  defaultUrl?: string;
}

export const VideoUploader: React.FC<VideoUploaderProps> = ({ onVideoSelected, defaultUrl = '' }) => {
  const [videoSource, setVideoSource] = useState(defaultUrl);
  const [videoType, setVideoType] = useState('file'); // 'file' or 'link'
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    handleVideoFile(file);
  };

  // Handle video file processing
  const handleVideoFile = (file: File | undefined) => {
    if (!file) return;

    // Check if file is a video
    if (!file.type.startsWith('video/')) {
      setUploadError('Please select a valid video file.');
      return;
    }

    setUploadError('');
    
    // Create a temporary URL for preview
    const fileURL = URL.createObjectURL(file);
    setVideoSource(fileURL);
    onVideoSelected(fileURL);

    // Simulate upload process
    simulateUpload(file);
  };

  // Handle video link input
  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoSource(e.target.value);
    setUploadError('');
  };

  // Simulate file upload with progress
  const simulateUpload = (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);

    const totalSize = file.size;
    let loadedSize = 0;
    const chunkSize = totalSize / 100;
    
    const interval = setInterval(() => {
      loadedSize += chunkSize;
      const progress = Math.min(Math.round((loadedSize / totalSize) * 100), 100);
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setIsUploading(false);
      }
    }, 100);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (videoType === 'link' && !isValidVideoUrl(videoSource)) {
      setUploadError('Please enter a valid video URL.');
      return;
    }

    if (!videoSource) {
      setUploadError('Please provide a video file or link.');
      return;
    }

    if (!videoTitle.trim()) {
      setUploadError('Please provide a title for the video.');
      return;
    }

    // Here you would typically send the data to your backend
    console.log('Video uploaded successfully:', {
      type: videoType,
      source: videoSource,
      title: videoTitle,
      description: videoDescription
    });

    // Pass the video source to parent component
    onVideoSelected(videoSource);

    // Reset form after submission
    setUploadProgress(0);
    setUploadError('');
    toast({
      title: "Success",
      description: "Video uploaded successfully!"
    });
  };

  // Validate video URL (basic validation)
  const isValidVideoUrl = (url: string) => {
    // Basic URL validation
    const urlPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|vimeo\.com|dailymotion\.com|wistia\.com|sproutvideo\.com|vidyard\.com|brightcove\.com|jwplayer\.com|vzaar\.com|ooyala\.com|twitch\.tv|facebook\.com|instagram\.com)\/[a-zA-Z0-9_\-\.\/\?\=\&]+$/i;
    return urlPattern.test(url);
  };

  // Handle drag and drop events
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleVideoFile(files[0]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Upload Video Lesson</h2>
      
      <div className="mb-6">
        <div className="flex space-x-4 mb-4">
          <button
            type="button"
            className={`px-4 py-2 rounded-md ${videoType === 'file' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200'}`}
            onClick={() => setVideoType('file')}
          >
            Upload File
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded-md ${videoType === 'link' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200'}`}
            onClick={() => setVideoType('link')}
          >
            Video Link
          </button>
        </div>

        {videoType === 'file' && (
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center ${isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-600'}`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
            <div className="flex flex-col items-center justify-center">
              <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">MP4, MOV, AVI, WEBM (MAX. 500MB)</p>
              <button
                type="button"
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={() => fileInputRef.current?.click()}
              >
                Select Video File
              </button>
            </div>
          </div>
        )}

        {videoType === 'link' && (
          <div className="mb-4">
            <label htmlFor="videoLink" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Video URL (YouTube, Vimeo, etc.)
            </label>
            <input
              type="url"
              id="videoLink"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="https://example.com/video"
              value={videoSource}
              onChange={handleLinkChange}
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Paste a link from YouTube, Vimeo, or other video hosting platforms</p>
          </div>
        )}

        {isUploading && (
          <div className="mt-4">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Uploading: {uploadProgress}%</p>
          </div>
        )}

        {uploadError && (
          <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md">
            {uploadError}
          </div>
        )}
      </div>

      {videoSource && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2 text-gray-800 dark:text-gray-100">Video Preview</h3>
          {videoType === 'file' || !videoSource.includes('youtube.com') ? (
            <video 
              className="w-full h-auto rounded-lg" 
              controls
              src={videoSource}
            />
          ) : (
            // For YouTube URLs, show an embed frame
            <div className="aspect-w-16 aspect-h-9">
              <iframe 
                className="w-full h-64 rounded-lg"
                src={videoSource.includes('youtube.com') ? videoSource.replace('watch?v=', 'embed/') : videoSource}
                title="Video preview" 
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="videoTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Video Title*
          </label>
          <input
            type="text"
            id="videoTitle"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="Enter title for your video"
            value={videoTitle}
            onChange={(e) => setVideoTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="videoDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Video Description
          </label>
          <textarea
            id="videoDescription"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="Enter description for your video"
            rows={4}
            value={videoDescription}
            onChange={(e) => setVideoDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={isUploading || !videoSource}
          >
            {isUploading ? 'Uploading...' : 'Save Video'}
          </button>
        </div>
      </form>
    </div>
  );
};
