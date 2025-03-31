
import { Home, Book, Trophy, BarChart3, Settings, LogOut } from 'lucide-react';
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
import { Link } from 'react-router-dom';

export function AppSidebar() {
  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Book, label: 'Modules', path: '/modules' },
    { icon: Trophy, label: 'Leaderboard', path: '/leaderboard' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

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
          <div className="px-4 mb-4 text-center">
            <Avatar className="h-16 w-16 mx-auto mb-2">
              <AvatarImage src="" />
              <AvatarFallback className="bg-elearn-blue text-white">JD</AvatarFallback>
            </Avatar>
            <div className="font-medium">John Doe</div>
            <div className="text-xs text-muted-foreground">Team Lead</div>
          </div>
          
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
          <button className="w-full flex items-center space-x-3 text-sm px-4 py-2 rounded-md hover:bg-muted transition-colors">
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
