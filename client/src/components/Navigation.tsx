import { Home, Search, BarChart3, User, MessageCircle, Plus } from "lucide-react";
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
    { icon: Plus, label: "Create", path: "/create" },
    { icon: MessageCircle, label: "Social", path: "/social" },
    { icon: BarChart3, label: "Progress", path: "/progress" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <div className="flex justify-around items-center gap-1 p-2 bg-background border-t border-border overflow-x-auto">
      {navItems.map((item) => {
        const isActive = location === item.path;
        return (
          <Button
            key={item.path}
            variant="ghost"
            size="icon"
            className={`flex flex-col gap-1 h-auto py-2 px-2 min-w-0 flex-shrink-0 ${
              isActive ? "text-primary" : "text-muted-foreground"
            }`}
            onClick={() => {
              onNavigate?.(item.path);
              console.log(`Navigate to ${item.path}`);
            }}
            data-testid={`nav-${item.label.toLowerCase()}`}
          >
            <item.icon className="h-4 w-4" />
            <span className="text-xs whitespace-nowrap">{item.label}</span>
          </Button>
        );
      })}
    </div>
  );
}