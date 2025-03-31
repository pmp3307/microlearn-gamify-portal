
import React from 'react';
import { MainLayout } from '@/components/layouts/MainLayout';
import { ModuleCard } from '@/components/ModuleCard';
import { modules, userProgress } from '@/data/moduleData';
import { Clock, BookOpen, Trophy } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Dashboard = () => {
  // Find in-progress and completed modules
  const completedModules = modules.filter(module => 
    userProgress.completedModules.includes(module.id)
  );
  
  const inProgressModules = modules.filter(module => 
    userProgress.inProgressModules.includes(module.id)
  );
  
  const recommendedModules = modules.filter(module => 
    !userProgress.completedModules.includes(module.id) && 
    !userProgress.inProgressModules.includes(module.id)
  ).slice(0, 2);
  
  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="rounded-full bg-blue-100 p-3">
                <Clock className="h-6 w-6 text-elearn-blue" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Learning Time</p>
                <h3 className="text-2xl font-bold">4.5 hours</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="rounded-full bg-green-100 p-3">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Modules Completed</p>
                <h3 className="text-2xl font-bold">{completedModules.length}/{modules.length}</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="rounded-full bg-amber-100 p-3">
                <Trophy className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Points Earned</p>
                <h3 className="text-2xl font-bold">{userProgress.xpPoints}</h3>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Continue Learning Section */}
        {inProgressModules.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Continue Learning</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inProgressModules.map(module => (
                <ModuleCard 
                  key={module.id} 
                  module={module} 
                  progress={35} // Would come from user data
                />
              ))}
            </div>
          </div>
        )}
        
        {/* Recommended Modules */}
        {recommendedModules.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Recommended For You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedModules.map(module => (
                <ModuleCard 
                  key={module.id} 
                  module={module}
                />
              ))}
            </div>
          </div>
        )}
        
        {/* Completed Modules */}
        {completedModules.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Completed</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedModules.map(module => (
                <ModuleCard 
                  key={module.id} 
                  module={module}
                  completed={true}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Dashboard;
