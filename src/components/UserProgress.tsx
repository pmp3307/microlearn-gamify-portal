
import { Progress } from '@/components/ui/progress';
import { Trophy, Award, Book, CheckCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';

interface UserAchievement {
  id: string;
  achievement_name: string;
  achievement_type: string;
  awarded_at: string;
  description: string;
}

interface ProgressStats {
  completedCount: number;
  inProgressCount: number;
  totalModules: number;
  completionPercentage: number;
  totalXp: number;
  level: number;
  achievements: UserAchievement[];
}

export function UserProgress() {
  const { user } = useAuth();
  const [stats, setStats] = useState<ProgressStats>({
    completedCount: 0,
    inProgressCount: 0,
    totalModules: 0,
    completionPercentage: 0,
    totalXp: 0,
    level: 1,
    achievements: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUserProgress() {
      if (!user) return;
      
      setIsLoading(true);
      try {
        // Get total modules count
        const { count: totalModules } = await supabase
          .from('modules')
          .select('*', { count: 'exact', head: true });
        
        // Get completed modules
        const { data: completedData } = await supabase
          .from('user_progress')
          .select('*')
          .eq('user_id', user.id)
          .eq('is_completed', true);
          
        // Get in-progress modules
        const { data: inProgressData } = await supabase
          .from('user_progress')
          .select('*')
          .eq('user_id', user.id)
          .eq('is_completed', false)
          .gt('completion_percentage', 0);
        
        // Get user achievements
        const { data: achievements } = await supabase
          .from('user_achievements')
          .select('*')
          .eq('user_id', user.id);
        
        const completedCount = completedData?.length || 0;
        const inProgressCount = inProgressData?.length || 0;
        const totalCount = totalModules || 0;
        
        // Calculate overall completion percentage
        const completionPercentage = totalCount > 0 
          ? Math.round((completedCount / totalCount) * 100) 
          : 0;
        
        // Calculate XP and level (sample calculation)
        const totalXp = completedCount * 100 + inProgressCount * 25;
        const level = Math.floor(totalXp / 200) + 1; // Simple level calculation
        
        setStats({
          completedCount,
          inProgressCount,
          totalModules: totalCount,
          completionPercentage,
          totalXp,
          level,
          achievements: achievements || []
        });
      } catch (error) {
        console.error('Error fetching user progress:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchUserProgress();
  }, [user]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl p-5 shadow-sm mb-6 animate-pulse">
        <div className="h-24"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-2">
          <h3 className="text-sm font-semibold text-muted-foreground mb-1">YOUR PROGRESS</h3>
          <div className="mb-2 flex justify-between">
            <span className="text-lg font-bold">{stats.completionPercentage}% Complete</span>
            <span className="text-sm text-muted-foreground">
              {stats.completedCount}/{stats.totalModules} Modules
            </span>
          </div>
          <Progress value={stats.completionPercentage} className="h-2" />
          
          <div className="mt-4 flex gap-3">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <CheckCheck className="h-4 w-4 text-green-500" />
              <span>{stats.completedCount} completed</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Book className="h-4 w-4 text-blue-500" />
              <span>{stats.inProgressCount} in progress</span>
            </div>
          </div>
        </div>
        
        <div className="border-l pl-6 hidden md:block">
          <h3 className="text-sm font-semibold text-muted-foreground mb-1">POINTS EARNED</h3>
          <div className="flex items-center">
            <Trophy className="h-5 w-5 text-elearn-warning mr-2" />
            <span className="text-lg font-bold">{stats.totalXp} XP</span>
          </div>
          <div className="text-sm text-muted-foreground">Level {stats.level}</div>
        </div>
        
        <div className="border-l pl-6 hidden md:block">
          <h3 className="text-sm font-semibold text-muted-foreground mb-1">ACHIEVEMENTS</h3>
          {stats.achievements.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {stats.achievements.slice(0, 3).map((badge) => (
                <Badge key={badge.id} variant="outline" className="flex items-center gap-1 py-1">
                  <Award className="h-3 w-3" />
                  <span className="text-xs">{badge.achievement_name}</span>
                </Badge>
              ))}
              {stats.achievements.length > 3 && (
                <Badge variant="outline" className="py-1">
                  <span className="text-xs">+{stats.achievements.length - 3} more</span>
                </Badge>
              )}
            </div>
          ) : (
            <div className="text-xs text-muted-foreground">Complete modules to earn badges</div>
          )}
        </div>
      </div>
    </div>
  );
}
