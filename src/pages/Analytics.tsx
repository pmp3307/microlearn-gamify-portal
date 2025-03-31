
import React from 'react';
import { MainLayout } from '@/components/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { userProgress } from '@/data/moduleData';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart, BarChart, LineChart, PieChart, Area, Bar, Line, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Button } from '@/components/ui/button';
import { Download, Calendar, Clock, BookOpen } from 'lucide-react';

const learningTimeData = [
  { name: 'Week 1', value: 2.5 },
  { name: 'Week 2', value: 3.8 },
  { name: 'Week 3', value: 2.1 },
  { name: 'Week 4', value: 4.5 },
  { name: 'Week 5', value: 5.2 },
  { name: 'Week 6', value: 3.9 },
  { name: 'Week 7', value: 4.8 },
];

const modulesCompletionData = [
  { name: 'Introduction to ML', completed: 100 },
  { name: 'Data Structures', completed: 85 },
  { name: 'Algorithms', completed: 65 },
  { name: 'Front-end Basics', completed: 40 },
  { name: 'Backend Development', completed: 20 },
  { name: 'DevOps', completed: 0 },
];

const quizAccuracyData = [
  { name: 'Multiple Choice', correct: 85, incorrect: 15 },
  { name: 'True/False', correct: 92, incorrect: 8 },
  { name: 'Drag & Drop', correct: 70, incorrect: 30 },
  { name: 'Checkbox', correct: 78, incorrect: 22 },
];

const studyScheduleData = [
  { name: 'Monday', hours: 1.5 },
  { name: 'Tuesday', hours: 2.0 },
  { name: 'Wednesday', hours: 0.5 },
  { name: 'Thursday', hours: 1.8 },
  { name: 'Friday', hours: 1.2 },
  { name: 'Saturday', hours: 2.5 },
  { name: 'Sunday', hours: 3.0 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const Analytics = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Learning Analytics</h1>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
        
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Learning Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23.8 hrs</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Modules Completed</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3/8</div>
              <p className="text-xs text-muted-foreground">
                +1 this month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Quiz Accuracy</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">81.2%</div>
              <p className="text-xs text-muted-foreground">
                +5.1% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="modules">Modules</TabsTrigger>
            <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Learning Time</CardTitle>
                <CardDescription>
                  Hours spent learning over the past 7 weeks
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ChartContainer config={{}} className="h-80">
                  <AreaChart
                    data={learningTimeData}
                    margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <ChartTooltipContent>
                              <div className="grid grid-cols-2 gap-2">
                                <div className="font-medium">{payload[0].payload.name}</div>
                                <div className="font-medium text-right">{payload[0].value} hours</div>
                              </div>
                            </ChartTooltipContent>
                          );
                        }
                        return null;
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#8884d8" 
                      fill="#8884d8" 
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="modules" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Module Completion</CardTitle>
                <CardDescription>
                  Progress across all modules
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ChartContainer config={{}} className="h-80">
                  <BarChart
                    data={modulesCompletionData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis type="category" dataKey="name" width={150} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Completed']} />
                    <Bar dataKey="completed" fill="#8884d8">
                      {modulesCompletionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="quizzes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Quiz Performance</CardTitle>
                <CardDescription>
                  Accuracy by question type
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <ChartContainer config={{}} className="h-72">
                    <PieChart>
                      <Pie
                        data={quizAccuracyData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="correct"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {quizAccuracyData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, 'Correct']} />
                    </PieChart>
                  </ChartContainer>
                  
                  <ChartContainer config={{}} className="h-72">
                    <BarChart
                      data={quizAccuracyData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                      <Legend />
                      <Bar dataKey="correct" name="Correct" stackId="a" fill="#82ca9d" />
                      <Bar dataKey="incorrect" name="Incorrect" stackId="a" fill="#ff8042" />
                    </BarChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="schedule" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Study Schedule</CardTitle>
                <CardDescription>
                  Hours spent each day of the week
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ChartContainer config={{}} className="h-80">
                  <LineChart
                    data={studyScheduleData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} hrs`, 'Study Time']} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="hours" 
                      stroke="#8884d8" 
                      activeDot={{ r: 8 }} 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Analytics;
