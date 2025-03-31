
import React from 'react';
import { SidebarProvider, useSidebar } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Header } from '@/components/Header';
import { UserProgress } from '@/components/UserProgress';

interface MainLayoutProps {
  children: React.ReactNode;
}

// Create a wrapper component to use the sidebar hook
const MainLayoutContent: React.FC<MainLayoutProps> = ({ children }) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  
  return (
    <div className="min-h-screen flex w-full">
      <AppSidebar isCollapsed={isCollapsed} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <UserProgress />
          {children}
        </main>
      </div>
    </div>
  );
};

// Main layout with provider
export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <MainLayoutContent>{children}</MainLayoutContent>
    </SidebarProvider>
  );
};
