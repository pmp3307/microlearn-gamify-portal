
import React from 'react';
import { Heart, MessageSquare, Share2, Music, BookmarkPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface ReactionButtonsProps {
  liked: boolean;
  onReaction: (reaction: 'like' | 'comment' | 'share') => void;
}

/**
 * Social media style reaction buttons (like, comment, share)
 */
export const ReactionButtons: React.FC<ReactionButtonsProps> = ({ liked, onReaction }) => {
  // Animation variants for buttons
  const buttonVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: { 
        delay: i * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }),
    hover: { 
      scale: 1.1,
      transition: { 
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const iconComponents = [
    {
      icon: <Heart className={`h-6 w-6 ${liked ? 'fill-red-500 text-red-500' : ''}`} />,
      label: '126K',
      onClick: () => onReaction('like'),
      customClass: liked ? 'text-red-500' : ''
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      label: '5.2K',
      onClick: () => onReaction('comment')
    },
    {
      icon: <Share2 className="h-6 w-6" />,
      label: 'Share',
      onClick: () => onReaction('share')
    },
    {
      icon: <BookmarkPlus className="h-6 w-6" />,
      label: 'Save',
      onClick: () => onReaction('share')
    }
  ];

  return (
    <div className="absolute right-3 bottom-24 flex flex-col items-center space-y-4">
      {iconComponents.map((item, i) => (
        <motion.div 
          key={i}
          className="flex flex-col items-center"
          initial="initial"
          animate="animate"
          custom={i}
          variants={buttonVariants}
          whileHover="hover"
        >
          <Button 
            variant="ghost" 
            size="icon" 
            className={`h-12 w-12 rounded-full bg-black/20 backdrop-blur-sm hover:bg-white/20 text-white ${item.customClass}`}
            onClick={item.onClick}
          >
            {item.icon}
          </Button>
          <span className="text-white text-xs mt-1.5 font-medium">{item.label}</span>
        </motion.div>
      ))}
      
      <motion.div 
        className="rounded-full bg-gradient-to-br from-purple-500 to-pink-500 w-12 h-12 flex items-center justify-center mt-4"
        initial="initial"
        animate="animate"
        custom={4}
        variants={buttonVariants}
        whileHover="hover"
      >
        <Music className="h-6 w-6 text-white" />
      </motion.div>
    </div>
  );
};
