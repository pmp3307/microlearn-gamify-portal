
import { Bell, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Header() {
  return (
    <header className="border-b px-6 py-3 bg-white">
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              className="pl-10" 
              placeholder="Search modules, topics, keywords..."
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-elearn-danger text-white">
              3
            </Badge>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="text-right mr-2">
              <div className="text-sm font-medium">John Doe</div>
              <div className="text-xs text-muted-foreground">Team Lead</div>
            </div>
            <div className="h-9 w-9 rounded-full bg-elearn-blue text-white flex items-center justify-center">
              JD
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
