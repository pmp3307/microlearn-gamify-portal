
import React from 'react';
import { Music } from 'lucide-react';

/**
 * A component that visualizes audio playback with an animated icon
 */
export const AudioVisualizer: React.FC = () => (
  <div className="flex items-center justify-center h-full w-full bg-gradient-to-r from-blue-900 to-purple-900">
    <div className="p-8 rounded-full bg-black/30 flex items-center justify-center">
      <Music className="h-24 w-24 text-white" />
    </div>
  </div>
);
