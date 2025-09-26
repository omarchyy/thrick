import { useState } from "react";
import UserHeader from "@/components/UserHeader";
import QuestCard from "@/components/QuestCard";
import AICompanion from "@/components/AICompanion";
import JourneyCard from "@/components/JourneyCard";
import Navigation from "@/components/Navigation";
import { Droplets, TreePine, Wind, Heart, Brain, Zap } from "lucide-react";
import { useLocation } from "wouter";

export default function HomePage() {
  const [, setLocation] = useLocation();
  
  // Mock data - todo: remove mock functionality
  const [quests] = useState([
    {
      id: 1,
      title: "Drink 8 Glasses of Water",
      progress: { current: 2, total: 8, unit: " glasses" },
      icon: <Droplets className="h-6 w-6 text-blue-600" />,
      iconBgColor: "bg-blue-100"
    },
    {
      id: 2,
      title: "Go for a Walk Outside",
      progress: { current: 0, total: 30, unit: " minutes" },
      icon: <TreePine className="h-6 w-6 text-green-600" />,
      iconBgColor: "bg-green-100"
    },
    {
      id: 3,
      title: "Take 5 Deep Breaths",
      progress: { current: 0, total: 5, unit: " breaths" },
      icon: <Wind className="h-6 w-6 text-teal-600" />,
      iconBgColor: "bg-teal-100"
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
            <h2 className="text-2xl font-bold text-foreground mb-4" data-testid="text-todays-quests">
              Today's quests
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