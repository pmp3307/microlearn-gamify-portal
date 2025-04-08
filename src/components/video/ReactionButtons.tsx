
import React from 'react';
import { Heart, MessageSquare, Share2, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ReactionButtonsProps {
  liked: boolean;
  onReaction: (reaction: 'like' | 'comment' | 'share') => void;
}

/**
 * Social media style reaction buttons (like, comment, share)
 */
export const ReactionButtons: React.FC<ReactionButtonsProps> = ({ liked, onReaction }) => {
  return (
    <div className="absolute right-2 bottom-24 flex flex-col items-center space-y-4">
      <div className="flex flex-col items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-12 w-12 rounded-full bg-transparent hover:bg-white/10 text-white"
          onClick={() => onReaction('like')}
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
          onClick={() => onReaction('comment')}
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
          onClick={() => onReaction('share')}
        >
          <Share2 className="h-6 w-6" />
        </Button>
        <span className="text-white text-xs mt-1">Share</span>
      </div>
      
      <div className="rounded-full bg-white/10 w-12 h-12 flex items-center justify-center">
        <Music className="h-6 w-6 text-white" />
      </div>
    </div>
  );
};
