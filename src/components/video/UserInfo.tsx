
import React from 'react';
import { Music } from 'lucide-react';

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
    <div className="absolute bottom-20 left-4 text-white">
      <div className="font-bold text-lg">{username}</div>
      <div className="text-sm mb-2">{description}</div>
      <div className="flex items-center">
        <Music className="h-4 w-4 mr-1" />
        <span className="text-xs">{songTitle}</span>
      </div>
    </div>
  );
};
