
import React from 'react';
import { Button } from '@/components/ui/button';

interface MediaLoadingErrorProps {
  onRetry: () => void;
}

/**
 * Error state component for media loading failures
 */
export const MediaLoadingError: React.FC<MediaLoadingErrorProps> = ({ onRetry }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center text-white flex-col">
      <p className="text-lg mb-4">Media could not be loaded</p>
      <p className="text-sm text-gray-300 mb-4">Please check the URL or try another file</p>
      <Button 
        variant="outline" 
        onClick={onRetry}
        className="text-white border-white hover:bg-white/20"
      >
        Try Again
      </Button>
    </div>
  );
};
