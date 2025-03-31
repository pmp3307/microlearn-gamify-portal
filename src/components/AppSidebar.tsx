import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, Book, BarChart, Trophy, 
  Settings, LogOut, Map,
  Users, HelpCircle, GraduationCap
} from 'lucide-react';

interface AppSidebarProps {
  isCollapsed: boolean;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ isCollapsed }) => {
  const location = useLocation();
  
  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />
    },
    {
      title: "Learning Modules",
      href: "/modules",
      icon: <Book className="h-5 w-5" />
    },
    {
      title: "Analytics",
      href: "/analytics",
      icon: <BarChart className="h-5 w-5" />
    },
    {
      title: "Leaderboard",
      href: "/leaderboard",
      icon: <Trophy className="h-5 w-5" />
    },
    {
      title: "Roadmap",
      href: "/roadmap",
      icon: <Map className="h-5 w-5" />
    }
  ];
  
  return (
    <div 
      className={cn(
        "flex flex-col h-full bg-gray-50 border-r py-4",
        isCollapsed ? "w-20" : "w-60"
      )}
    >
      <div className="space-y-3">
        <div className="px-3 py-2">
          <Link to="/" className="font-bold text-sm group flex items-center text-muted-foreground">
            <GraduationCap className="h-5 w-5 mr-2" />
            <span className={cn("truncate", isCollapsed && "hidden")}>
              E-Learning Platform
            </span>
          </Link>
        </div>
        <div className="space-y-1">
          {navItems.map((item) => (
            <Link 
              key={item.href} 
              to={item.href}
              className={cn(
                "group flex items-center px-3 py-2 text-sm font-medium hover:bg-gray-100 rounded-md transition-all text-muted-foreground",
                location.pathname === item.href && "bg-gray-100 text-secondary"
              )}
            >
              <div className="mr-2 shrink-0">{item.icon}</div>
              <span className={cn("truncate", isCollapsed && "hidden")}>
                {item.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-auto px-3 py-2">
        <div className="text-sm text-muted-foreground">
          Need help?
          <Link to="/help" className="block hover:underline">
            <HelpCircle className="h-4 w-4 inline mr-1" />
            <span className={cn("truncate", isCollapsed && "hidden")}>
              Help & Support
            </span>
          </Link>
          <Link to="/settings" className="block hover:underline">
            <Settings className="h-4 w-4 inline mr-1" />
            <span className={cn("truncate", isCollapsed && "hidden")}>
              Settings
            </span>
          </Link>
          <Link to="/logout" className="block hover:underline">
            <LogOut className="h-4 w-4 inline mr-1" />
            <span className={cn("truncate", isCollapsed && "hidden")}>
              Logout
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
