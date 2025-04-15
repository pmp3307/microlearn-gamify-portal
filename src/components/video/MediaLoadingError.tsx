
import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface MediaLoadingErrorProps {
  onRetry: () => void;
}

/**
 * Component to display when media fails to load
 */
export const MediaLoadingError: React.FC<MediaLoadingErrorProps> = ({ onRetry }) => {
  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 text-white p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="text-center max-w-md"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-100 mb-4">
          <AlertCircle className="h-8 w-8 text-red-600" />
        </div>
        <h3 className="text-xl font-bold mb-2">Media Playback Error</h3>
        <p className="text-slate-300 mb-6">
          There was a problem loading this media file. The file might be corrupted, 
          unavailable, or in an unsupported format.
        </p>
        <div className="flex gap-4 justify-center">
          <Button 
            variant="outline" 
            onClick={onRetry}
            className="bg-transparent border-white text-white hover:bg-white/10 transition-colors duration-200 gap-2"
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            Try Again
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};
