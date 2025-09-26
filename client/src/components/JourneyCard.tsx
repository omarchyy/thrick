import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface JourneyCardProps {
  title: string;
  description: string;
  completedQuests: number;
  totalQuests: number;
  icon: React.ReactNode;
  iconBgColor: string;
  onClick?: () => void;
}

export default function JourneyCard({
  title,
  description,
  completedQuests,
  totalQuests,
  icon,
  iconBgColor,
  onClick
}: JourneyCardProps) {
  const progressPercentage = (completedQuests / totalQuests) * 100;
  
  return (
    <Card 
      className="p-4 cursor-pointer hover-elevate active-elevate-2" 
      onClick={onClick}
      data-testid={`card-journey-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="space-y-3">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${iconBgColor}`}>
          {icon}
        </div>
        
        <div>
          <h3 className="font-medium text-foreground mb-1" data-testid={`text-journey-${title.toLowerCase().replace(/\s+/g, '-')}`}>
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mb-2">
            {description}
          </p>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {completedQuests} of {totalQuests} quests
              </span>
              <span className="text-muted-foreground">
                {Math.round(progressPercentage)}%
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </div>
      </div>
    </Card>
  );
}