
import React from 'react';
import { MainLayout } from '@/components/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Check, Clock, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type FeatureStatus = 'completed' | 'in-progress' | 'planned';

interface RoadmapItem {
  title: string;
  description: string;
  status: FeatureStatus;
  eta?: string;
}

const roadmapItems: RoadmapItem[] = [
  {
    title: 'Core Learning Platform',
    description: 'Basic learning modules with content and quizzes',
    status: 'completed'
  },
  {
    title: 'Interactive Quizzes',
    description: 'Multiple choice, true/false, and drag-drop question types',
    status: 'completed'
  },
  {
    title: 'User Dashboard',
    description: 'Personal dashboard with progress tracking',
    status: 'completed'
  },
  {
    title: 'Leaderboard',
    description: 'Competitive leaderboard showing top performers',
    status: 'in-progress',
    eta: 'Q3 2023'
  },
  {
    title: 'Analytics Dashboard',
    description: 'Detailed analytics on learning progress and achievements',
    status: 'in-progress',
    eta: 'Q4 2023'
  },
  {
    title: 'Mobile Optimization',
    description: 'Full responsive design and PWA capabilities',
    status: 'planned',
    eta: 'Q1 2024'
  },
  {
    title: 'Live Q&A Sessions',
    description: 'Real-time question and answer sessions with instructors',
    status: 'planned',
    eta: 'Q1 2024'
  },
  {
    title: 'Advanced Interactive Content',
    description: 'Interactive simulations and coding challenges',
    status: 'planned',
    eta: 'Q2 2024'
  },
  {
    title: 'AI-Generated Quizzes',
    description: 'Dynamically generated quizzes based on learning materials',
    status: 'planned',
    eta: 'Q2 2024'
  },
  {
    title: 'Admin Dashboard',
    description: 'Content management and user administration tools',
    status: 'planned',
    eta: 'Q3 2024'
  },
  {
    title: 'Subscription and Monetization',
    description: 'Premium content and subscription management',
    status: 'planned',
    eta: 'Q4 2024'
  }
];

const Roadmap = () => {
  // Calculate overall progress
  const totalItems = roadmapItems.length;
  const completedItems = roadmapItems.filter(item => item.status === 'completed').length;
  const inProgressItems = roadmapItems.filter(item => item.status === 'in-progress').length;
  
  const progressPercentage = Math.round((completedItems + inProgressItems * 0.5) / totalItems * 100);
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Product Roadmap</h1>
          <p className="text-muted-foreground">
            Our planned features and development timeline
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Overall Progress</CardTitle>
            <CardDescription>
              {completedItems} completed, {inProgressItems} in progress, {totalItems - completedItems - inProgressItems} planned
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={progressPercentage} className="h-2" />
            <p className="text-sm text-muted-foreground mt-2">{progressPercentage}% towards completion</p>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roadmapItems.map((item, index) => (
            <Card key={index} className={cn(
              "transition-all duration-200",
              item.status === 'completed' && "border-green-200",
              item.status === 'in-progress' && "border-blue-200",
              item.status === 'planned' && "border-gray-200"
            )}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  {item.status === 'completed' && <Check className="h-5 w-5 text-green-500" />}
                  {item.status === 'in-progress' && <Clock className="h-5 w-5 text-blue-500" />}
                  {item.status === 'planned' && <AlertCircle className="h-5 w-5 text-gray-400" />}
                </div>
                <CardDescription className="flex items-center space-x-2">
                  <span className={cn(
                    "inline-block px-2 py-1 text-xs rounded-full",
                    item.status === 'completed' && "bg-green-100 text-green-800",
                    item.status === 'in-progress' && "bg-blue-100 text-blue-800",
                    item.status === 'planned' && "bg-gray-100 text-gray-800"
                  )}>
                    {item.status === 'completed' && "Completed"}
                    {item.status === 'in-progress' && "In Progress"}
                    {item.status === 'planned' && "Planned"}
                  </span>
                  {item.eta && <span className="text-xs text-muted-foreground">ETA: {item.eta}</span>}
                </CardDescription>
              </CardHeader>
              <Separator />
              <CardContent className="pt-4">
                <p className="text-sm">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Roadmap;
