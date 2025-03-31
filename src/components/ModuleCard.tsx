
import React from 'react';
import { Clock, BarChart, Trophy } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Module } from '@/types/learning';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface ModuleCardProps {
  module: Module;
  progress?: number;
  completed?: boolean;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ 
  module, 
  progress = 0, 
  completed = false 
}) => {
  // Map difficulty to appropriate badge color
  const difficultyColor = {
    beginner: 'bg-green-100 text-green-800 hover:bg-green-200',
    intermediate: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
    advanced: 'bg-red-100 text-red-800 hover:bg-red-200'
  }[module.difficulty];
  
  return (
    <Link to={`/modules/${module.id}`}>
      <Card className={cn(
        "overflow-hidden transition-all hover:shadow-md cursor-pointer animate-scale-in",
        completed && "border-green-500"
      )}>
        <div className="relative h-48 overflow-hidden">
          <img 
            src={module.imageUrl || '/placeholder.svg'} 
            alt={module.title} 
            className="w-full h-full object-cover"
          />
          
          {completed && (
            <div className="absolute top-0 right-0 m-2">
              <Badge variant="default" className="bg-green-500">
                Completed
              </Badge>
            </div>
          )}
          
          {progress > 0 && progress < 100 && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-4 py-1">
              <div className="flex justify-between items-center text-xs text-white mb-1">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="progress-indicator">
                <div className="progress-bar" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          )}
        </div>
        
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg">{module.title}</h3>
            <Badge variant="outline" className={difficultyColor}>
              {module.difficulty}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {module.description}
          </p>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{module.estimatedMinutes} min</span>
            </div>
            <div className="flex items-center">
              <BarChart className="h-4 w-4 mr-1" />
              <span>{module.sections.length} sections</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="bg-gray-50 px-4 py-3 border-t">
          <div className="flex items-center text-sm">
            <Trophy className="h-4 w-4 mr-1 text-elearn-warning" />
            <span className="font-medium">{module.xpReward} XP</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};
