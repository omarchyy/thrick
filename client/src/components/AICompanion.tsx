import { ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import aiCompanionImage from "@assets/generated_images/AI_wellness_companion_character_d00f719d.png";

interface AICompanionProps {
  onAskAI?: () => void;
}

export default function AICompanion({ onAskAI }: AICompanionProps) {
  return (
    <Card className="p-6 bg-primary/10 border-primary/20 hover-elevate">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-primary/20">
            <img 
              src={aiCompanionImage} 
              alt="AI Wellness Companion" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-medium text-foreground mb-1">
              Ask AI
            </h3>
            <p className="text-sm text-muted-foreground mb-1 font-medium">
              Monika AI
            </p>
            <p className="text-sm text-muted-foreground">
              Your personal health trainer will help you grow.
            </p>
          </div>
        </div>
        
        <Button 
          size="icon" 
          variant="ghost"
          onClick={onAskAI}
          data-testid="button-ask-ai"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </Card>
  );
}