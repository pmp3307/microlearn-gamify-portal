
import React from 'react';
import { MainLayout } from '@/components/layouts/MainLayout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

const Analytics = () => {
  // Mock data for charts
  const learningTimeData = [
    { name: 'Mon', time: 25 },
    { name: 'Tue', time: 45 },
    { name: 'Wed', time: 30 },
    { name: 'Thu', time: 60 },
    { name: 'Fri', time: 15 },
    { name: 'Sat', time: 90 },
    { name: 'Sun', time: 30 },
  ];
  
  const moduleCompletionData = [
    { name: 'Conflict Resolution', completion: 100 },
    { name: 'Disciplinary Meetings', completion: 35 },
    { name: 'Data Security', completion: 0 },
    { name: 'Fraud Prevention', completion: 0 },
    { name: 'Task Prioritization', completion: 0 },
  ];
  
  const quizPerformanceData = [
    { category: 'Team Management', score: 85 },
    { category: 'Communication', score: 92 },
    { category: 'Compliance', score: 78 },
    { category: 'Security', score: 65 },
    { category: 'Ethical Decisions', score: 89 },
  ];
  
  const strongestSkillsData = [
    { name: 'Communication', value: 92 },
    { name: 'Team Management', value: 85 },
    { name: 'Ethical Decisions', value: 89 },
    { name: 'Compliance', value: 78 },
    { name: 'Security', value: 65 },
  ];
  
  const colors = ['#4169E1', '#6A8BFF', '#4ECDC4', '#1A237E', '#FFC107'];
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">My Learning Analytics</h1>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="time">Learning Time</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Learning Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">4.5 hrs</div>
                  <p className="text-xs text-muted-foreground mt-1">+1.2 hrs from last week</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Average Quiz Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">82%</div>
                  <p className="text-xs text-muted-foreground mt-1">+5% from last module</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Modules Completed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">1/5</div>
                  <div className="mt-2">
                    <Progress value={20} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Module Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Module Completion</CardTitle>
                <CardDescription>Your progress across all available modules</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={moduleCompletionData}
                      layout="vertical"
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis dataKey="name" type="category" width={150} />
                      <Tooltip formatter={(value) => [`${value}%`, 'Completion']} />
                      <Legend />
                      <Bar dataKey="completion" name="Completion %" fill="#4169E1">
                        {moduleCompletionData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.completion === 100 ? '#4CAF50' : entry.completion > 0 ? '#FFC107' : '#E0E0E0'} 
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Skills Radar */}
            <Card>
              <CardHeader>
                <CardTitle>Strongest Skills</CardTitle>
                <CardDescription>Areas where you excel based on quiz performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={strongestSkillsData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {strongestSkillsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, 'Score']} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quiz Performance by Category</CardTitle>
                <CardDescription>Your scores across different knowledge areas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={quizPerformanceData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip formatter={(value) => [`${value}%`, 'Score']} />
                      <Legend />
                      <Bar dataKey="score" name="Score %" fill="#4ECDC4" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Skill Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Areas of Strength</CardTitle>
                  <CardDescription>Topics where you scored highest</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {quizPerformanceData
                    .sort((a, b) => b.score - a.score)
                    .slice(0, 3)
                    .map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">{item.category}</span>
                          <span className="text-sm font-bold">{item.score}%</span>
                        </div>
                        <Progress value={item.score} className="h-2" />
                      </div>
                    ))}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Areas for Improvement</CardTitle>
                  <CardDescription>Topics where you could use more practice</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {quizPerformanceData
                    .sort((a, b) => a.score - b.score)
                    .slice(0, 3)
                    .map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">{item.category}</span>
                          <span className="text-sm font-bold">{item.score}%</span>
                        </div>
                        <Progress value={item.score} className="h-2" />
                      </div>
                    ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Time Tab */}
          <TabsContent value="time" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Learning Time Distribution</CardTitle>
                <CardDescription>Minutes spent learning per day this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={learningTimeData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value} mins`, 'Learning Time']} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="time" 
                        name="Learning Time (mins)" 
                        stroke="#4169E1" 
                        activeDot={{ r: 8 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Time Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Average Daily Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">42 mins</div>
                  <p className="text-xs text-muted-foreground mt-1">Weekday average</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Most Active Day
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">Saturday</div>
                  <p className="text-xs text-muted-foreground mt-1">90 minutes spent learning</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Weekly Target
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">295/300</div>
                  <div className="mt-2">
                    <Progress value={98} className="h-2" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Minutes/week (98%)</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Analytics;
