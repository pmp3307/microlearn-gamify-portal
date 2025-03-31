
import React, { useState } from 'react';
import { MainLayout } from '@/components/layouts/MainLayout';
import { leaderboardData } from '@/data/moduleData';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Users, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

const Leaderboard = () => {
  const [timeRange, setTimeRange] = useState('all-time');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter leaderboard data based on search query
  const filteredData = leaderboardData
    .filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => b.xpPoints - a.xpPoints);
  
  // Find top 3 users
  const topUsers = filteredData.slice(0, 3);
  
  // Find current user position
  const currentUserIndex = filteredData.findIndex(user => user.userId === 'user1');
  const currentUserRank = currentUserIndex + 1;
  
  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl font-bold">Leaderboard</h1>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search users..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full md:w-64"
              />
            </div>
            
            <Select
              value={timeRange}
              onValueChange={setTimeRange}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="all-time">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Top 3 Users */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topUsers.map((user, index) => (
            <Card key={user.userId} className={`relative overflow-hidden ${
              index === 0 ? 'border-yellow-400 bg-yellow-50' : 
              index === 1 ? 'border-gray-400 bg-gray-50' : 
              'border-amber-700 bg-amber-50'
            }`}>
              <div className="absolute top-0 right-0 w-16 h-16">
                <div className={`absolute transform rotate-45 translate-y-2 translate-x-6 w-24 text-center text-white text-xs py-1 ${
                  index === 0 ? 'bg-yellow-500' : 
                  index === 1 ? 'bg-gray-500' : 
                  'bg-amber-700'
                }`}>
                  #{index + 1}
                </div>
              </div>
              
              <CardContent className="p-6 flex flex-col items-center">
                <Avatar className="h-20 w-20 mb-4">
                  <AvatarFallback className={`${
                    index === 0 ? 'bg-yellow-500 text-white' : 
                    index === 1 ? 'bg-gray-500 text-white' : 
                    'bg-amber-700 text-white'
                  }`}>
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <h3 className="font-bold text-lg mb-1">{user.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">Level {user.level}</p>
                
                <div className="flex items-center mb-4">
                  {index === 0 ? (
                    <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
                  ) : index === 1 ? (
                    <Trophy className="h-5 w-5 text-gray-500 mr-2" />
                  ) : (
                    <Trophy className="h-5 w-5 text-amber-700 mr-2" />
                  )}
                  <span className="font-bold">{user.xpPoints} XP</span>
                </div>
                
                {user.recentBadges.length > 0 && (
                  <div className="flex flex-wrap gap-1 justify-center">
                    {user.recentBadges.map(badge => (
                      <Badge key={badge.id} variant="outline" className="flex items-center gap-1">
                        <span>{badge.iconUrl}</span>
                        <span className="text-xs">{badge.name}</span>
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Full Leaderboard Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <Table>
            <TableCaption>
              Full leaderboard ranking based on XP points earned
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Rank</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Level</TableHead>
                <TableHead className="text-right">XP Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((user, index) => (
                <TableRow key={user.userId} className={
                  user.userId === 'user1' ? 'bg-blue-50' : 
                  index < 3 ? `bg-${index === 0 ? 'yellow' : index === 1 ? 'gray' : 'amber'}-50` : ''
                }>
                  <TableCell className="font-medium">
                    {index === 0 ? (
                      <Trophy className="h-5 w-5 text-yellow-500" />
                    ) : index === 1 ? (
                      <Medal className="h-5 w-5 text-gray-500" />
                    ) : index === 2 ? (
                      <Medal className="h-5 w-5 text-amber-700" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-elearn-blue text-white">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span>{user.name}</span>
                      {user.userId === 'user1' && (
                        <Badge variant="outline" className="ml-2">You</Badge>
                      )}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <Badge variant="outline">Level {user.level}</Badge>
                  </TableCell>
                  
                  <TableCell className="text-right font-semibold">
                    {user.xpPoints} XP
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* Your Position Card */}
        <div className="bg-elearn-blue text-white rounded-xl p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 p-3 rounded-full">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p className="text-white/70 text-sm">Your Position</p>
                <h3 className="text-2xl font-bold">#{currentUserRank} of {filteredData.length}</h3>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-white/70 text-sm">Your XP</p>
              <h3 className="text-2xl font-bold">1,250</h3>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="h-2 bg-white/20 rounded-full">
              <div 
                className="h-full bg-white rounded-full" 
                style={{ width: `${(1250 / 2000) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-1 text-sm">
              <span>Current: Level 3</span>
              <span>750 XP to Level 4</span>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Leaderboard;
