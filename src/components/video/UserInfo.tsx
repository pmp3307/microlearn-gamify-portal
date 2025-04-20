
import React from 'react';
import { Music, User, Heart } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface UserInfoProps {
  username: string;
  description: string;
  songTitle: string;
}

/**
 * Component to display user information (username, description, song title)
 * with enhanced visual effects
 */
export const UserInfo: React.FC<UserInfoProps> = ({ username, description, songTitle }) => {
  return (
    <motion.div 
      className="absolute bottom-20 left-4 text-white max-w-[70%]"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.4 }}
    >
      <div className="flex items-center mb-2">
        <Avatar className="h-10 w-10 mr-3 border border-white/20 ring-2 ring-white/10 ring-offset-1 ring-offset-black/20">
          <AvatarImage src="" />
          <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500">
            <User className="h-5 w-5 text-white" />
          </AvatarFallback>
        </Avatar>
        
        <div className="flex flex-col">
          <motion.div 
            className="font-semibold text-lg"
            initial={{ y: 5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {username}
          </motion.div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs rounded-full px-3 py-0.5 h-auto bg-white/20 hover:bg-white/30 text-white group"
          >
            <Heart className="h-3 w-3 mr-1.5 transition-transform group-hover:scale-125 group-hover:text-pink-400" />
            Follow
          </Button>
        </div>
      </div>
      
      <div className="text-sm mb-2 line-clamp-2 bg-black/30 backdrop-blur-sm rounded-lg px-3 py-2">{description}</div>
      
      <motion.div 
        className="flex items-center bg-black/30 backdrop-blur-sm rounded-full px-3 py-1.5 max-w-fit"
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Music className="h-3.5 w-3.5 mr-1.5 animate-pulse text-blue-400" />
        <span className="text-xs font-medium">{songTitle}</span>
      </motion.div>
    </motion.div>
  );
};
