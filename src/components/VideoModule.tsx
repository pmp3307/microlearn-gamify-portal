
import React, { useState } from 'react';
import { VideoPlayer } from './VideoPlayer';
import { VideoUploader } from './VideoUploader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Settings, Video } from 'lucide-react';

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
  title = "Video Content",
  description = "Watch and interact with video content",
  defaultVideoUrl = "",
  onVideoChange,
  allowUpload = true,
  showReactions = true,
  onComplete
}) => {
  const [videoUrl, setVideoUrl] = useState(defaultVideoUrl);
  const [activeTab, setActiveTab] = useState<string>("player");

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

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="player" className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                Player
              </TabsTrigger>
              {allowUpload && (
                <TabsTrigger value="settings" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Video Source
                </TabsTrigger>
              )}
            </TabsList>
            
            {videoUrl && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setActiveTab(activeTab === "player" ? "settings" : "player")}
              >
                {activeTab === "player" ? "Change Video" : "Back to Player"}
              </Button>
            )}
          </div>
          
          <TabsContent value="player" className="mt-0">
            {videoUrl ? (
              <div className="aspect-video bg-black rounded-md overflow-hidden">
                <VideoPlayer 
                  videoUrl={videoUrl} 
                  showReactions={showReactions}
                  onComplete={onComplete}
                />
              </div>
            ) : (
              <div className="aspect-video bg-muted rounded-md flex items-center justify-center flex-col p-6">
                <Video className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Video Selected</h3>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Select a video source to get started
                </p>
                <Button onClick={() => setActiveTab("settings")}>
                  Select Video
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="settings" className="mt-0">
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
