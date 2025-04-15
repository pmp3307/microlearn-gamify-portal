
import React from 'react';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface LoadingIndicatorProps {
  message: string;
}

/**
 * Component to display a loading indicator for media
 */
export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ message }) => {
  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center p-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="h-12 w-12 text-blue-400 mb-4 mx-auto" />
        </motion.div>
        <motion.p 
          className="text-lg text-white font-medium"
          initial={{ y: 5, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {message}
        </motion.p>
        <motion.div 
          className="mt-4 w-48 h-1.5 bg-white/20 rounded-full overflow-hidden mx-auto"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 15, ease: "linear" }}
        >
          <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"></div>
        </motion.div>
      </div>
    </motion.div>
  );
};
