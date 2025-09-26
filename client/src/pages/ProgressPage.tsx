import { useState } from "react";
import { Trophy, Star, Calendar, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { useLocation } from "wouter";

export default function ProgressPage() {
  const [, setLocation] = useLocation();
  
  // Mock data - todo: remove mock functionality
  const [userStats] = useState({
    level: 12,
    experiencePoints: 2850,
    experienceToNext: 3200,
    totalQuestsCompleted: 47,
    totalJourneysCompleted: 6,
    currentStreak: 8,
    longestStreak: 23
  });

  const [completedJourneys] = useState([
    {
      id: 1,
      title: "Kindness Journey",
      completedDate: "2025-09-20",
      questsCompleted: 7,
      totalQuests: 7
    },
    {
      id: 2,
      title: "Mindfulness Path", 
      completedDate: "2025-09-15",
      questsCompleted: 10,
      totalQuests: 10
    },
    {
      id: 3,
      title: "Energy Boost",
      completedDate: "2025-09-10",
      questsCompleted: 6,
      totalQuests: 6
    }
  ]);

  const [recentQuests] = useState([
    { id: 1, title: "Morning Meditation", completedDate: "2025-09-26", points: 50 },
    { id: 2, title: "Gratitude Journal", completedDate: "2025-09-25", points: 30 },
    { id: 3, title: "Nature Walk", completedDate: "2025-09-24", points: 40 },
    { id: 4, title: "Deep Breathing", completedDate: "2025-09-23", points: 25 },
    { id: 5, title: "Smile at Strangers", completedDate: "2025-09-22", points: 35 }
  ]);

  const experienceProgress = (userStats.experiencePoints / userStats.experienceToNext) * 100;

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="p-6">
        <h1 className="text-2xl font-bold text-foreground" data-testid="text-progress-title">
          Your Progress
        </h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-6 pb-6 space-y-6">
        {/* Experience Level */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                <Trophy className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground" data-testid="text-level">
                  Level {userStats.level}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {userStats.experiencePoints} / {userStats.experienceToNext} XP
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="text-lg px-3 py-1">
              <Star className="h-4 w-4 mr-1" />
              Wellness Explorer
            </Badge>
          </div>
          <Progress value={experienceProgress} className="h-3" />
          <p className="text-xs text-muted-foreground mt-2">
            {userStats.experienceToNext - userStats.experiencePoints} XP until Level {userStats.level + 1}
          </p>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1" data-testid="text-total-quests">
              {userStats.totalQuestsCompleted}
            </div>
            <p className="text-sm text-muted-foreground">Quests Completed</p>
          </Card>
          
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1" data-testid="text-total-journeys">
              {userStats.totalJourneysCompleted}
            </div>
            <p className="text-sm text-muted-foreground">Journeys Finished</p>
          </Card>
          
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1" data-testid="text-current-streak">
              {userStats.currentStreak}
            </div>
            <p className="text-sm text-muted-foreground">Day Streak</p>
          </Card>
          
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1" data-testid="text-best-streak">
              {userStats.longestStreak}
            </div>
            <p className="text-sm text-muted-foreground">Best Streak</p>
          </Card>
        </div>

        {/* Completed Journeys */}
        <section>
          <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Completed Journeys
          </h3>
          <div className="space-y-3">
            {completedJourneys.map((journey) => (
              <Card key={journey.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-foreground" data-testid={`text-completed-journey-${journey.id}`}>
                      {journey.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Completed on {new Date(journey.completedDate).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    {journey.questsCompleted}/{journey.totalQuests} Complete
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Recent Quest Activity */}
        <section>
          <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Recent Activity
          </h3>
          <div className="space-y-2">
            {recentQuests.map((quest) => (
              <Card key={quest.id} className="p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-medium text-foreground" data-testid={`text-recent-quest-${quest.id}`}>
                      {quest.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {new Date(quest.completedDate).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    +{quest.points} XP
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>

      <Navigation onNavigate={setLocation} />
    </div>
  );
}