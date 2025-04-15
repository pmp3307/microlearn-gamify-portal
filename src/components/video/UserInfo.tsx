
import React from 'react';
import { Music, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface UserInfoProps {
  username: string;
  description: string;
  songTitle: string;
}

/**
 * Component to display user information (username, description, song title)
 */
export const UserInfo: React.FC<UserInfoProps> = ({ username, description, songTitle }) => {
  return (
    <div className="absolute bottom-20 left-4 text-white max-w-[70%]">
      <div className="flex items-center mb-2">
        <Avatar className="h-10 w-10 mr-3 border border-white/20">
          <AvatarImage src="" />
          <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500">
            <User className="h-5 w-5 text-white" />
          </AvatarFallback>
        </Avatar>
        
        <div className="flex flex-col">
          <div className="font-semibold text-lg">{username}</div>
          <Button variant="ghost" size="sm" className="text-xs rounded-full px-3 py-0.5 h-auto bg-white/20 hover:bg-white/30 text-white">
            Follow
          </Button>
        </div>
      </div>
      
      <div className="text-sm mb-2 line-clamp-2">{description}</div>
      
      <div className="flex items-center bg-black/30 backdrop-blur-sm rounded-full px-3 py-1.5 max-w-fit">
        <Music className="h-3.5 w-3.5 mr-1.5 animate-pulse" />
        <span className="text-xs font-medium">{songTitle}</span>
      </div>
    </div>
  );
};
