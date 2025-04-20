
import { MainLayout } from '@/components/layouts/MainLayout';
import { UserProgress } from '@/components/UserProgress';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Award, Download, Share2, Trophy, FileText, Clock } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface Certificate {
  id: string;
  moduleName: string;
  achievementName: string;
  awardedAt: string;
  certificateUrl: string | null;
}

interface ModuleProgress {
  id: string;
  title: string;
  completionPercentage: number;
  isCompleted: boolean;
  lastAccessed: string;
}

interface LearningStats {
  totalTimeSpent: number; // in minutes
  weeklyActivity: { day: string; minutes: number }[];
  strongestTopics: string[];
  areasToImprove: string[];
}

const ProgressDashboard = () => {
  const { user } = useAuth();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [moduleProgress, setModuleProgress] = useState<ModuleProgress[]>([]);
  const [learningStats, setLearningStats] = useState<LearningStats>({
    totalTimeSpent: 0,
    weeklyActivity: [],
    strongestTopics: [],
    areasToImprove: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      if (!user) return;
      
      setIsLoading(true);
      try {
        // Fetch certificates
        const { data: achievements } = await supabase
          .from('user_achievements')
          .select(`
            id, 
            achievement_name, 
            awarded_at,
            certificate_url,
            modules!inner(title)
          `)
          .eq('user_id', user.id)
          .eq('achievement_type', 'certificate');

        // Fetch module progress
        const { data: progress } = await supabase
          .from('user_progress')
          .select(`
            id,
            completion_percentage,
            is_completed,
            last_accessed,
            modules!inner(id, title)
          `)
          .eq('user_id', user.id);

        // Transform the data
        const certificatesData = achievements?.map(item => ({
          id: item.id,
          moduleName: item.modules.title,
          achievementName: item.achievement_name,
          awardedAt: item.awarded_at,
          certificateUrl: item.certificate_url
        })) || [];
        
        const progressData = progress?.map(item => ({
          id: item.modules.id,
          title: item.modules.title,
          completionPercentage: item.completion_percentage,
          isCompleted: item.is_completed,
          lastAccessed: item.last_accessed,
        })) || [];

        // For demo, generate some sample learning stats
        const sampleWeeklyActivity = [
          { day: 'Mon', minutes: 35 },
          { day: 'Tue', minutes: 20 },
          { day: 'Wed', minutes: 45 },
          { day: 'Thu', minutes: 30 },
          { day: 'Fri', minutes: 50 },
          { day: 'Sat', minutes: 15 },
          { day: 'Sun', minutes: 25 }
        ];

        const statsData = {
          totalTimeSpent: sampleWeeklyActivity.reduce((acc, day) => acc + day.minutes, 0),
          weeklyActivity: sampleWeeklyActivity,
          strongestTopics: ['Web Development', 'Data Analysis', 'UI Design'],
          areasToImprove: ['Machine Learning', 'DevOps']
        };

        setCertificates(certificatesData);
        setModuleProgress(progressData);
        setLearningStats(statsData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast({
          title: "Error",
          description: "Failed to load dashboard data",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchDashboardData();
  }, [user]);

  const handleDownloadCertificate = (certificate: Certificate) => {
    if (certificate.certificateUrl) {
      // In a real app, this would download the certificate
      toast({
        title: "Certificate Download",
        description: `Downloading certificate for ${certificate.moduleName}`,
      });
    } else {
      toast({
        title: "Certificate Unavailable",
        description: "Certificate file is not available for download",
        variant: "destructive"
      });
    }
  };

  const handleShareCertificate = (certificate: Certificate) => {
    // In a real app, this would open a share dialog
    navigator.clipboard.writeText(
      `I earned a certificate in ${certificate.moduleName} on MicroLearn! ${window.location.origin}/certificates/${certificate.id}`
    );
    toast({
      title: "Link Copied",
      description: "Certificate link copied to clipboard",
    });
  };

  if (!user) {
    return (
      <MainLayout>
        <div className="flex h-[80vh] items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Not Authenticated</CardTitle>
              <CardDescription>
                You need to be logged in to view your dashboard.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button className="w-full" asChild>
                <a href="/login">Go to Login</a>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </MainLayout>
    );
  }

  if (isLoading) {
    return (
      <MainLayout>
        <div className="animate-pulse space-y-6">
          <div className="h-40 bg-slate-100 rounded-xl"></div>
          <div className="h-80 bg-slate-100 rounded-xl"></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Learning Dashboard</h1>
        
        {/* User progress summary */}
        <UserProgress />
        
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="modules">Modules</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Time Spent Learning</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-muted-foreground mr-2" />
                    <span className="text-2xl font-bold">{learningStats.totalTimeSpent} mins</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">This week</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Modules Completed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-muted-foreground mr-2" />
                    <span className="text-2xl font-bold">
                      {moduleProgress.filter(m => m.isCompleted).length}/{moduleProgress.length}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">All modules</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Certificates Earned</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-muted-foreground mr-2" />
                    <span className="text-2xl font-bold">{certificates.length}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Total achievements</p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Weekly Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={learningStats.weeklyActivity}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Bar dataKey="minutes" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Strongest Topics</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {learningStats.strongestTopics.map((topic, index) => (
                      <li key={index} className="flex items-center">
                        <Trophy className="h-4 w-4 text-yellow-500 mr-2" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Areas to Improve</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {learningStats.areasToImprove.map((topic, index) => (
                      <li key={index} className="flex items-center">
                        <Book className="h-4 w-4 text-blue-500 mr-2" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Modules Tab */}
          <TabsContent value="modules" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Module Progress</CardTitle>
                <CardDescription>Track your progress through each learning module</CardDescription>
              </CardHeader>
              <CardContent>
                {moduleProgress.length > 0 ? (
                  <div className="space-y-4">
                    {moduleProgress.map((module) => (
                      <div key={module.id} className="border rounded-md p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium">{module.title}</h3>
                          <span className={`text-sm px-2 py-0.5 rounded-full ${
                            module.isCompleted ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {module.isCompleted ? 'Completed' : 'In progress'}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 mb-1">
                          <Progress value={module.completionPercentage} className="h-2" />
                          <span className="text-sm font-medium">{module.completionPercentage}%</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Last accessed: {new Date(module.lastAccessed).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">You haven't started any modules yet.</p>
                    <Button className="mt-4" asChild>
                      <a href="/modules">Browse Modules</a>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Certificates Tab */}
          <TabsContent value="certificates">
            <Card>
              <CardHeader>
                <CardTitle>Your Certificates</CardTitle>
                <CardDescription>Certificates and achievements you've earned</CardDescription>
              </CardHeader>
              <CardContent>
                {certificates.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {certificates.map((certificate) => (
                      <Card key={certificate.id} className="border">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{certificate.achievementName}</CardTitle>
                          <CardDescription>
                            For completing {certificate.moduleName}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-4">
                            Issued on: {new Date(certificate.awardedAt).toLocaleDateString()}
                          </p>
                          <div className="flex justify-between">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleDownloadCertificate(certificate)}
                              className="flex items-center"
                            >
                              <Download className="h-4 w-4 mr-1" />
                              <span>Download</span>
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleShareCertificate(certificate)}
                              className="flex items-center"
                            >
                              <Share2 className="h-4 w-4 mr-1" />
                              <span>Share</span>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Award className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="mt-4 text-muted-foreground">
                      You haven't earned any certificates yet. Complete modules to earn certificates.
                    </p>
                    <Button className="mt-4" asChild>
                      <a href="/modules">Start Learning</a>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Learning Analytics</CardTitle>
                <CardDescription>In-depth analysis of your learning habits and performance</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-12">
                  Advanced analytics features coming soon.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ProgressDashboard;
