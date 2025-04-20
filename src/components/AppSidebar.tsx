import { Home, Book, Trophy, BarChart3, Settings, LogOut, Map, User } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from './ui/button';

export function AppSidebar() {
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();
  
  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Book, label: 'Modules', path: '/modules' },
    { icon: Trophy, label: 'Leaderboard', path: '/leaderboard' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: Map, label: 'Roadmap', path: '/roadmap' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitials = (name: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-elearn-blue flex items-center justify-center text-white font-semibold">
            ML
          </div>
          <span className="font-bold text-lg">MicroLearn</span>
        </div>
        <SidebarTrigger />
      </SidebarHeader>
      
      <SidebarContent>
        <div className="py-4">
          {user ? (
            <div className="px-4 mb-4 text-center">
              <Avatar className="h-16 w-16 mx-auto mb-2">
                <AvatarImage src={profile?.avatar_url || ''} />
                <AvatarFallback className="bg-elearn-blue text-white">
                  {getInitials(profile?.full_name)}
                </AvatarFallback>
              </Avatar>
              <div className="font-medium">{profile?.full_name || user.email}</div>
              <div className="text-xs text-muted-foreground">
                Learner
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2 w-full"
                asChild
              >
                <Link to="/profile">
                  <User className="h-4 w-4 mr-2" />
                  View Profile
                </Link>
              </Button>
            </div>
          ) : (
            <div className="px-4 mb-4 text-center">
              <Avatar className="h-16 w-16 mx-auto mb-2">
                <AvatarImage src="" />
                <AvatarFallback className="bg-elearn-blue text-white">GU</AvatarFallback>
              </Avatar>
              <div className="font-medium">Guest User</div>
              <div className="text-xs text-muted-foreground">Not Logged In</div>
              <div className="mt-2 flex gap-2">
                <Button size="sm" className="w-full" asChild>
                  <Link to="/login">Log In</Link>
                </Button>
              </div>
            </div>
          )}
          
          <div className="px-3 py-2">
            <div className="text-xs font-semibold text-muted-foreground mb-2 px-2">
              MAIN MENU
            </div>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <Link to={item.path} className="flex items-center space-x-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </div>
        </div>
      </SidebarContent>
      
      <SidebarFooter>
        <div className="px-3 py-4">
          {user && (
            <button 
              onClick={handleLogout} 
              className="w-full flex items-center space-x-3 text-sm px-4 py-2 rounded-md hover:bg-muted transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
