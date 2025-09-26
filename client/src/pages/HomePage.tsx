import { useState } from "react";
import UserHeader from "@/components/UserHeader";
import QuestCard from "@/components/QuestCard";
import AICompanion from "@/components/AICompanion";
import JourneyCard from "@/components/JourneyCard";
import Navigation from "@/components/Navigation";
import { Droplets, Dumbbell, Footprints, Heart, Brain, Zap } from "lucide-react";
import { useLocation } from "wouter";

export default function HomePage() {
  const [, setLocation] = useLocation();
  
  // Mock data - todo: remove mock functionality
  const [quests] = useState([
    {
      id: 1,
      title: "Hydration",
      progress: { current: 1, total: 2, unit: "L" },
      icon: <Droplets className="h-6 w-6 text-primary" />,
      iconBgColor: "bg-primary/20"
    },
    {
      id: 2,
      title: "Leg workout",
      progress: { current: 15, total: 25, unit: "m" },
      icon: <Dumbbell className="h-6 w-6 text-orange-600" />,
      iconBgColor: "bg-orange-100"
    },
    {
      id: 3,
      title: "3k Steps to go",
      progress: { current: 0, total: 3000, unit: " steps" },
      icon: <Footprints className="h-6 w-6 text-gray-600" />,
      iconBgColor: "bg-gray-100"
    }
  ]);

  const [journeys] = useState([
    {
      id: 1,
      title: "Kindness Journey",
      description: "Spread kindness daily",
      completedQuests: 3,
      totalQuests: 7,
      icon: <Heart className="h-6 w-6 text-red-500" />,
      iconBgColor: "bg-red-100"
    },
    {
      id: 2,
      title: "Mindfulness Path",
      description: "Build inner peace",
      completedQuests: 5,
      totalQuests: 10,
      icon: <Brain className="h-6 w-6 text-purple-600" />,
      iconBgColor: "bg-purple-100"
    },
    {
      id: 3,
      title: "Energy Boost",
      description: "Sustainable daily energy",
      completedQuests: 1,
      totalQuests: 6,
      icon: <Zap className="h-6 w-6 text-yellow-600" />,
      iconBgColor: "bg-yellow-100"
    }
  ]);

  return (
    <div className="flex flex-col h-screen bg-background">
      <UserHeader userName="James" />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6 space-y-6">
          {/* Today's Plan Section */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4" data-testid="text-todays-plan">
              Today's plan
            </h2>
            <div className="space-y-3">
              {quests.map((quest) => (
                <QuestCard
                  key={quest.id}
                  title={quest.title}
                  progress={quest.progress}
                  icon={quest.icon}
                  iconBgColor={quest.iconBgColor}
                  onStart={() => console.log(`Started ${quest.title}`)}
                  onContinue={() => console.log(`Continued ${quest.title}`)}
                />
              ))}
            </div>
          </section>

          {/* AI Companion */}
          <AICompanion onAskAI={() => console.log('AI companion opened')} />

          {/* Featured Journeys */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-4" data-testid="text-featured-journeys">
              Featured Journeys
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {journeys.map((journey) => (
                <JourneyCard
                  key={journey.id}
                  title={journey.title}
                  description={journey.description}
                  completedQuests={journey.completedQuests}
                  totalQuests={journey.totalQuests}
                  icon={journey.icon}
                  iconBgColor={journey.iconBgColor}
                  onClick={() => console.log(`Opened ${journey.title}`)}
                />
              ))}
            </div>
          </section>
        </div>
      </div>

      <Navigation onNavigate={setLocation} />
    </div>
  );
}