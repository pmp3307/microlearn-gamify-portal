
import React, { useState } from 'react';
import { VideoPlayer } from './VideoPlayer';
import { VideoUploader } from './VideoUploader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Settings, PlayCircle, Upload, CheckCircle } from 'lucide-react';

interface VideoModuleProps {
  title?: string;
  description?: string;
  defaultVideoUrl?: string;
  onVideoChange?: (url: string) => void;
  allowUpload?: boolean;
  showReactions?: boolean;
  onComplete?: () => void;
}

export const VideoModule: React.FC<VideoModuleProps> = ({
  title = "Media Content",
  description = "Watch and interact with audio/video content",
  defaultVideoUrl = "",
  onVideoChange,
  allowUpload = true,
  showReactions = true,
  onComplete
}) => {
  const [videoUrl, setVideoUrl] = useState(defaultVideoUrl);
  const [activeTab, setActiveTab] = useState<string>("player");
  const [completed, setCompleted] = useState(false);

  const handleVideoSelected = (url: string) => {
    setVideoUrl(url);
    if (onVideoChange) {
      onVideoChange(url);
    }
    
    // Switch to player tab after selecting a video
    if (url) {
      setActiveTab("player");
    }
  };

  const handleVideoComplete = () => {
    setCompleted(true);
    if (onComplete) onComplete();
  };

  // Determine if we're dealing with audio
  const isAudioFile = (url: string) => {
    const audioExtensions = ['.mp3', '.wav', '.m4a', '.aac', '.flac', '.ogg'];
    return audioExtensions.some(ext => url.toLowerCase().endsWith(ext)) || 
           url.includes('elevenlabs.io/app/share');
  };

  const mediaType = videoUrl ? (isAudioFile(videoUrl) ? "audio" : "video") : "media";

  return (
    <Card className="w-full overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
      <CardHeader className="bg-slate-50 border-b border-slate-100 pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl text-slate-800">{title}</CardTitle>
            <p className="text-sm text-slate-500 mt-1">{description}</p>
          </div>
          {completed && (
            <div className="flex items-center text-sm font-medium text-green-600">
              <CheckCircle className="h-4 w-4 mr-1" />
              Completed
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-between items-center px-4 pt-4 pb-2">
            <TabsList className="bg-slate-100">
              <TabsTrigger value="player" className="flex items-center gap-1 data-[state=active]:bg-white">
                <PlayCircle className="h-4 w-4" />
                Player
              </TabsTrigger>
              {allowUpload && (
                <TabsTrigger value="settings" className="flex items-center gap-1 data-[state=active]:bg-white">
                  <Upload className="h-4 w-4" />
                  Media Source
                </TabsTrigger>
              )}
            </TabsList>
            
            {videoUrl && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setActiveTab(activeTab === "player" ? "settings" : "player")}
                className="text-xs"
              >
                {activeTab === "player" ? "Change Media" : "Back to Player"}
              </Button>
            )}
          </div>
          
          <TabsContent value="player" className="m-0">
            {videoUrl ? (
              <div className="bg-black rounded-b-md overflow-hidden">
                <VideoPlayer 
                  videoUrl={videoUrl} 
                  showReactions={showReactions}
                  onComplete={handleVideoComplete}
                />
              </div>
            ) : (
              <div className="aspect-video bg-slate-50 rounded-b-md flex items-center justify-center flex-col p-6">
                <div className="bg-slate-100 p-4 rounded-full mb-4">
                  <PlayCircle className="h-10 w-10 text-slate-400" />
                </div>
                <h3 className="text-lg font-medium text-slate-700 mb-2">No Media Selected</h3>
                <p className="text-sm text-slate-500 text-center mb-4 max-w-xs">
                  Select a video or audio source to get started with this lesson
                </p>
                <Button 
                  onClick={() => setActiveTab("settings")}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                >
                  Select Media
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="settings" className="m-0">
            <VideoUploader 
              onVideoSelected={handleVideoSelected} 
              defaultUrl={videoUrl}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
