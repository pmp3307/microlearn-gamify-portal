
import React from 'react';

interface LoadingIndicatorProps {
  message: string;
}

/**
 * Loading spinner with customizable message
 */
export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ message }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-white text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
        <p>{message}</p>
      </div>
    </div>
  );
};
