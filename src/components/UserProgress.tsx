
import { Progress } from '@/components/ui/progress';
import { Trophy } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function UserProgress() {
  const courseProgress = 35;  // Example data - would come from user state
  const pointsEarned = 1250;
  const level = 3;
  const badges = [
    { id: 1, name: 'First Module', icon: '🏆' },
    { id: 2, name: 'Perfect Quiz', icon: '🎯' },
    { id: 3, name: 'Fast Learner', icon: '⚡' },
  ];

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-2">
          <h3 className="text-sm font-semibold text-muted-foreground mb-1">YOUR PROGRESS</h3>
          <div className="mb-2 flex justify-between">
            <span className="text-lg font-bold">{courseProgress}% Complete</span>
            <span className="text-sm text-muted-foreground">3/8 Modules</span>
          </div>
          <Progress value={courseProgress} className="h-2" />
        </div>
        
        <div className="border-l pl-6 hidden md:block">
          <h3 className="text-sm font-semibold text-muted-foreground mb-1">POINTS EARNED</h3>
          <div className="flex items-center">
            <Trophy className="h-5 w-5 text-elearn-warning mr-2" />
            <span className="text-lg font-bold">{pointsEarned} XP</span>
          </div>
          <div className="text-sm text-muted-foreground">Level {level}</div>
        </div>
        
        <div className="border-l pl-6 hidden md:block">
          <h3 className="text-sm font-semibold text-muted-foreground mb-1">BADGES</h3>
          <div className="flex space-x-2">
            {badges.map((badge) => (
              <Badge key={badge.id} variant="outline" className="flex items-center gap-1 py-1">
                <span>{badge.icon}</span>
                <span className="text-xs">{badge.name}</span>
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
