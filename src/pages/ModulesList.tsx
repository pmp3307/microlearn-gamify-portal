
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
import { Filter, Search, BookOpen, Award, Clock, SlidersHorizontal, CheckCheck } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ModulesList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('all');
  
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
    
    // Tab filter
    let matchesTab = activeTab === 'all';
    if (activeTab === 'completed') {
      matchesTab = userProgress.completedModules.includes(module.id);
    } else if (activeTab === 'in-progress') {
      matchesTab = userProgress.inProgressModules.includes(module.id);
    } else if (activeTab === 'new') {
      matchesTab = !userProgress.completedModules.includes(module.id) && 
                  !userProgress.inProgressModules.includes(module.id);
    }
    
    return matchesSearch && matchesDifficulty && matchesStatus && matchesTab;
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
  
  // Count modules by status
  const completedCount = modules.filter(m => userProgress.completedModules.includes(m.id)).length;
  const inProgressCount = modules.filter(m => userProgress.inProgressModules.includes(m.id)).length;
  const newModulesCount = modules.filter(m => 
    !userProgress.completedModules.includes(m.id) && !userProgress.inProgressModules.includes(m.id)
  ).length;
  
  return (
    <MainLayout>
      <div className="space-y-6 max-w-6xl mx-auto pb-12">
        {/* Hero section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl p-8 shadow-lg mb-8">
          <h1 className="text-3xl font-bold mb-2">Learning Modules</h1>
          <p className="text-blue-100 max-w-2xl">
            Explore our collection of interactive learning modules designed to help you master new skills and knowledge. Track your progress, earn rewards, and level up your expertise.
          </p>
          
          <div className="flex flex-wrap gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg">
              <div className="text-2xl font-bold">{modules.length}</div>
              <div className="text-xs text-blue-100">Total Modules</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg">
              <div className="text-2xl font-bold">{completedCount}</div>
              <div className="text-xs text-blue-100">Completed</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg">
              <div className="text-2xl font-bold">{inProgressCount}</div>
              <div className="text-xs text-blue-100">In Progress</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg ml-auto">
              <div className="text-2xl font-bold">{userProgress.totalXp || 0}</div>
              <div className="text-xs text-blue-100">Total XP Earned</div>
            </div>
          </div>
        </div>
        
        {/* Tab navigation */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="all" className="flex items-center gap-1.5">
              <BookOpen className="h-4 w-4" />
              <span>All Modules</span>
            </TabsTrigger>
            <TabsTrigger value="in-progress" className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span>In Progress ({inProgressCount})</span>
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center gap-1.5">
              <CheckCheck className="h-4 w-4" />
              <span>Completed ({completedCount})</span>
            </TabsTrigger>
            <TabsTrigger value="new" className="flex items-center gap-1.5">
              <Award className="h-4 w-4" />
              <span>New ({newModulesCount})</span>
            </TabsTrigger>
          </TabsList>
        
          {/* Search and Filter Bar */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  placeholder="Search modules by title or description..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-slate-200"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-slate-500" />
                <span className="text-sm text-slate-500">Filters:</span>
              </div>
              
              <Select
                value={difficultyFilter}
                onValueChange={setDifficultyFilter}
              >
                <SelectTrigger className="w-[180px] border-slate-200">
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
                <SelectTrigger className="w-[180px] border-slate-200">
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
          </div>
          
          {/* Modules Grid */}
          <TabsContent value={activeTab} className="mt-0">
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
              <div className="text-center py-16 bg-slate-50 rounded-xl border border-slate-200">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 mb-4">
                  <Search className="h-6 w-6 text-slate-500" />
                </div>
                <p className="text-lg font-medium text-slate-800 mb-2">No modules found</p>
                <p className="text-slate-500 max-w-md mx-auto">
                  We couldn't find any modules that match your search criteria. Try adjusting your filters or search terms.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ModulesList;
