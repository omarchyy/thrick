import { useState } from "react";
import { Search, Filter, Heart, Brain, Zap, Leaf, Target, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import QuestCard from "@/components/QuestCard";
import JourneyCard from "@/components/JourneyCard";
import Navigation from "@/components/Navigation";
import { useLocation } from "wouter";

export default function BrowsePage() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"quests" | "journeys">("quests");

  // Mock data - todo: remove mock functionality
  const [allQuests] = useState([
    {
      id: 1,
      title: "Morning Meditation",
      progress: { current: 0, total: 15, unit: "m" },
      icon: <Brain className="h-6 w-6 text-purple-600" />,
      iconBgColor: "bg-purple-100",
      category: "mindfulness"
    },
    {
      id: 2,
      title: "Gratitude Journal",
      progress: { current: 0, total: 1, unit: " entry" },
      icon: <Heart className="h-6 w-6 text-pink-600" />,
      iconBgColor: "bg-pink-100",
      category: "kindness"
    },
    {
      id: 3,
      title: "Nature Walk",
      progress: { current: 0, total: 30, unit: "m" },
      icon: <Leaf className="h-6 w-6 text-green-600" />,
      iconBgColor: "bg-green-100",
      category: "movement"
    },
    {
      id: 4,
      title: "Deep Breathing",
      progress: { current: 0, total: 10, unit: "m" },
      icon: <Target className="h-6 w-6 text-blue-600" />,
      iconBgColor: "bg-blue-100",
      category: "mindfulness"
    },
    {
      id: 5,
      title: "Smile at Strangers",
      progress: { current: 0, total: 5, unit: " people" },
      icon: <Smile className="h-6 w-6 text-yellow-600" />,
      iconBgColor: "bg-yellow-100",
      category: "kindness"
    }
  ]);

  const [allJourneys] = useState([
    {
      id: 1,
      title: "Kindness Journey",
      description: "Spread kindness and build meaningful connections through daily acts of compassion",
      completedQuests: 0,
      totalQuests: 7,
      icon: <Heart className="h-6 w-6 text-red-500" />,
      iconBgColor: "bg-red-100"
    },
    {
      id: 2,
      title: "Mindfulness Path",
      description: "Develop awareness and inner peace through meditation and mindful practices",
      completedQuests: 0,
      totalQuests: 10,
      icon: <Brain className="h-6 w-6 text-purple-600" />,
      iconBgColor: "bg-purple-100"
    },
    {
      id: 3,
      title: "Energy Boost",
      description: "Build healthy habits for sustained energy throughout your day",
      completedQuests: 0,
      totalQuests: 6,
      icon: <Zap className="h-6 w-6 text-yellow-600" />,
      iconBgColor: "bg-yellow-100"
    },
    {
      id: 4,
      title: "Nature Connection",
      description: "Reconnect with the natural world and find peace outdoors",
      completedQuests: 0,
      totalQuests: 8,
      icon: <Leaf className="h-6 w-6 text-green-600" />,
      iconBgColor: "bg-green-100"
    }
  ]);

  const filteredQuests = allQuests.filter(quest =>
    quest.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredJourneys = allJourneys.filter(journey =>
    journey.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    journey.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="p-6 space-y-4">
        <h1 className="text-2xl font-bold text-foreground" data-testid="text-browse-title">
          Browse
        </h1>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search quests and journeys..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            data-testid="input-search"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          <Button
            variant={activeTab === "quests" ? "default" : "outline"}
            onClick={() => setActiveTab("quests")}
            data-testid="tab-quests"
          >
            Quests
          </Button>
          <Button
            variant={activeTab === "journeys" ? "default" : "outline"}
            onClick={() => setActiveTab("journeys")}
            data-testid="tab-journeys"
          >
            Journeys
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-6 pb-6">
        {activeTab === "quests" && (
          <div className="space-y-3">
            {filteredQuests.length > 0 ? (
              filteredQuests.map((quest) => (
                <QuestCard
                  key={quest.id}
                  title={quest.title}
                  progress={quest.progress}
                  icon={quest.icon}
                  iconBgColor={quest.iconBgColor}
                  onStart={() => console.log(`Started ${quest.title}`)}
                />
              ))
            ) : (
              <p className="text-center text-muted-foreground py-8" data-testid="text-no-quests">
                No quests found matching your search.
              </p>
            )}
          </div>
        )}

        {activeTab === "journeys" && (
          <div className="grid grid-cols-1 gap-4">
            {filteredJourneys.length > 0 ? (
              filteredJourneys.map((journey) => (
                <JourneyCard
                  key={journey.id}
                  title={journey.title}
                  description={journey.description}
                  completedQuests={journey.completedQuests}
                  totalQuests={journey.totalQuests}
                  icon={journey.icon}
                  iconBgColor={journey.iconBgColor}
                  onClick={() => console.log(`Started ${journey.title} journey`)}
                />
              ))
            ) : (
              <p className="text-center text-muted-foreground py-8" data-testid="text-no-journeys">
                No journeys found matching your search.
              </p>
            )}
          </div>
        )}
      </div>

      <Navigation onNavigate={setLocation} />
    </div>
  );
}