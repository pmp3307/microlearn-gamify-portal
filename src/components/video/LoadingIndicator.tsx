
import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';

interface LoadingIndicatorProps {
  message: string;
}

/**
 * Component to display a loading indicator for media with animated progress
 */
export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ message }) => {
  const [progress, setProgress] = useState(0);
  
  // Simulate progress for better user feedback
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        // Slow down as we get closer to 90%
        const increment = prev < 30 ? 5 : prev < 60 ? 3 : prev < 90 ? 1 : 0.5;
        const newProgress = Math.min(prev + increment, 90);
        return newProgress;
      });
    }, 500);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center p-6 max-w-sm w-full">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="h-12 w-12 text-blue-400 mb-4 mx-auto" />
        </motion.div>
        <motion.p 
          className="text-lg text-white font-medium mb-3"
          initial={{ y: 5, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {message}
        </motion.p>
        
        <div className="w-full space-y-2">
          <Progress value={progress} className="h-1.5 bg-white/20" indicatorClassName="from-blue-500 to-indigo-600" />
          <p className="text-xs text-white/70 text-right">{Math.round(progress)}%</p>
        </div>

        <motion.p 
          className="text-xs text-white/60 mt-4 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          This may take a moment depending on your connection
        </motion.p>
      </div>
    </motion.div>
  );
};
