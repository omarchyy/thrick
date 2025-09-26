import { ChevronRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface QuestCardProps {
  title: string;
  progress?: {
    current: number;
    total: number;
    unit?: string;
  };
  icon: React.ReactNode;
  iconBgColor: string;
  completed?: boolean;
  onStart?: () => void;
  onContinue?: () => void;
}

export default function QuestCard({ 
  title, 
  progress, 
  icon, 
  iconBgColor,
  completed = false,
  onStart,
  onContinue 
}: QuestCardProps) {
  const progressPercentage = progress ? (progress.current / progress.total) * 100 : 0;
  
  return (
    <Card className="p-4 hover-elevate">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div 
            className={`w-12 h-12 rounded-full flex items-center justify-center ${iconBgColor}`}
          >
            {icon}
          </div>
          
          <div className="flex-1">
            <h3 className="font-medium text-foreground" data-testid={`text-quest-${title.toLowerCase().replace(/\s+/g, '-')}`}>
              {title}
            </h3>
            
            {progress && (
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{progress.current}{progress.unit} / {progress.total}{progress.unit}</span>
                  <span>{Math.round(progressPercentage)}%</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {!completed && progressPercentage === 0 && (
            <Button 
              size="sm" 
              className="bg-foreground text-background hover:bg-foreground/90"
              onClick={onStart}
              data-testid={`button-start-${title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              Start
            </Button>
          )}
          
          {!completed && progressPercentage > 0 && progressPercentage < 100 && (
            <Button 
              size="icon" 
              variant="ghost"
              onClick={onContinue}
              data-testid={`button-continue-${title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}