import { Home, Search, BarChart3, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

interface NavigationProps {
  onNavigate?: (path: string) => void;
}

export default function Navigation({ onNavigate }: NavigationProps) {
  const [location] = useLocation();
  
  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Search, label: "Browse", path: "/browse" },
    { icon: BarChart3, label: "Progress", path: "/progress" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <div className="flex justify-around items-center p-4 bg-background border-t border-border">
      {navItems.map((item) => {
        const isActive = location === item.path;
        return (
          <Button
            key={item.path}
            variant="ghost"
            size="icon"
            className={`flex flex-col gap-1 h-auto py-2 px-4 ${
              isActive ? "text-primary" : "text-muted-foreground"
            }`}
            onClick={() => {
              onNavigate?.(item.path);
              console.log(`Navigate to ${item.path}`);
            }}
            data-testid={`nav-${item.label.toLowerCase()}`}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs">{item.label}</span>
          </Button>
        );
      })}
    </div>
  );
}