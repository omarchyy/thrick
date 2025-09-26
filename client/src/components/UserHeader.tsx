import { Bell, Calendar } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface UserHeaderProps {
  userName: string;
  userAvatar?: string;
}

export default function UserHeader({ userName, userAvatar }: UserHeaderProps) {
  return (
    <div className="flex items-center justify-between p-6 bg-background">
      <div className="flex items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={userAvatar} />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {userName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <h1 className="text-xl font-medium text-foreground">
          Hi, {userName}
        </h1>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          size="icon" 
          variant="ghost" 
          data-testid="button-calendar"
          onClick={() => console.log('Calendar opened')}
        >
          <Calendar className="h-5 w-5" />
        </Button>
        <Button 
          size="icon" 
          variant="ghost" 
          data-testid="button-notifications"
          onClick={() => console.log('Notifications opened')}
        >
          <Bell className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}