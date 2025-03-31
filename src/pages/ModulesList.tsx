
import React, { useState } from 'react';
import { MainLayout } from '@/components/layouts/MainLayout';
import { ModuleCard } from '@/components/ModuleCard';
import { modules, userProgress } from '@/data/moduleData';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Filter, Search } from 'lucide-react';

const ModulesList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Filter modules based on search query and filters
  const filteredModules = modules.filter(module => {
    // Search filter
    const matchesSearch = module.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         module.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Difficulty filter
    const matchesDifficulty = difficultyFilter === 'all' || module.difficulty === difficultyFilter;
    
    // Status filter
    let matchesStatus = true;
    if (statusFilter === 'completed') {
      matchesStatus = userProgress.completedModules.includes(module.id);
    } else if (statusFilter === 'in-progress') {
      matchesStatus = userProgress.inProgressModules.includes(module.id);
    } else if (statusFilter === 'not-started') {
      matchesStatus = !userProgress.completedModules.includes(module.id) && 
                     !userProgress.inProgressModules.includes(module.id);
    }
    
    return matchesSearch && matchesDifficulty && matchesStatus;
  });
  
  // Function to determine module progress
  const getModuleProgress = (moduleId: string) => {
    if (userProgress.completedModules.includes(moduleId)) {
      return { progress: 100, completed: true };
    } else if (userProgress.inProgressModules.includes(moduleId)) {
      return { progress: 35, completed: false }; // Would come from actual user data
    }
    return { progress: 0, completed: false };
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">All Learning Modules</h1>
        
        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search modules..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Filters:</span>
          </div>
          
          <Select
            value={difficultyFilter}
            onValueChange={setDifficultyFilter}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Difficulties</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
          
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="not-started">Not Started</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Modules Grid */}
        {filteredModules.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredModules.map(module => {
              const { progress, completed } = getModuleProgress(module.id);
              return (
                <ModuleCard 
                  key={module.id} 
                  module={module} 
                  progress={progress}
                  completed={completed}
                />
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No modules match your search criteria.</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ModulesList;
