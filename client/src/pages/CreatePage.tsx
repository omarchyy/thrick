import { useState } from "react";
import { Plus, Target, MapPin, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import { useLocation } from "wouter";

export default function CreatePage() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<"quest" | "journey">("quest");
  
  // Quest form state
  const [questForm, setQuestForm] = useState({
    title: "",
    description: "",
    category: "",
    targetValue: "",
    targetUnit: "",
    difficulty: ""
  });

  // Journey form state
  const [journeyForm, setJourneyForm] = useState({
    title: "",
    description: "",
    category: "",
    questIds: [] as number[]
  });

  // Mock available quests for journey creation - todo: remove mock functionality
  const [availableQuests] = useState([
    { id: 1, title: "Morning Meditation", category: "mindfulness" },
    { id: 2, title: "Gratitude Journal", category: "kindness" },
    { id: 3, title: "Nature Walk", category: "movement" },
    { id: 4, title: "Deep Breathing", category: "mindfulness" },
    { id: 5, title: "Smile at Strangers", category: "kindness" },
    { id: 6, title: "Drink Water", category: "health" },
    { id: 7, title: "Stretch Break", category: "movement" }
  ]);

  const categories = [
    "mindfulness",
    "kindness", 
    "movement",
    "health",
    "creativity",
    "social",
    "learning"
  ];

  const difficulties = ["Easy", "Medium", "Hard"];

  const handleCreateQuest = () => {
    if (questForm.title.trim() && questForm.description.trim()) {
      console.log("Creating quest:", questForm);
      // Reset form
      setQuestForm({
        title: "",
        description: "",
        category: "",
        targetValue: "",
        targetUnit: "",
        difficulty: ""
      });
      alert("Quest created successfully!");
    } else {
      alert("Please fill in all required fields");
    }
  };

  const handleCreateJourney = () => {
    if (journeyForm.title.trim() && journeyForm.description.trim() && journeyForm.questIds.length > 0) {
      console.log("Creating journey:", journeyForm);
      // Reset form  
      setJourneyForm({
        title: "",
        description: "",
        category: "",
        questIds: []
      });
      alert("Journey created successfully!");
    } else {
      alert("Please fill in all required fields and select at least one quest");
    }
  };

  const toggleQuestSelection = (questId: number) => {
    setJourneyForm(prev => ({
      ...prev,
      questIds: prev.questIds.includes(questId)
        ? prev.questIds.filter(id => id !== questId)
        : [...prev.questIds, questId]
    }));
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="p-6 space-y-4">
        <h1 className="text-2xl font-bold text-foreground" data-testid="text-create-title">
          Create
        </h1>

        {/* Tabs */}
        <div className="flex gap-2">
          <Button
            variant={activeTab === "quest" ? "default" : "outline"}
            onClick={() => setActiveTab("quest")}
            data-testid="tab-create-quest"
          >
            <Target className="h-4 w-4 mr-2" />
            Quest
          </Button>
          <Button
            variant={activeTab === "journey" ? "default" : "outline"}
            onClick={() => setActiveTab("journey")}
            data-testid="tab-create-journey"
          >
            <MapPin className="h-4 w-4 mr-2" />
            Journey
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-6 pb-6">
        {activeTab === "quest" && (
          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Create New Quest</h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Title *</label>
                <Input
                  placeholder="e.g., Take a 10-minute walk"
                  value={questForm.title}
                  onChange={(e) => setQuestForm(prev => ({ ...prev, title: e.target.value }))}
                  data-testid="input-quest-title"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Description *</label>
                <Textarea
                  placeholder="Describe what this quest involves and its benefits..."
                  value={questForm.description}
                  onChange={(e) => setQuestForm(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  data-testid="textarea-quest-description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Category</label>
                  <Select 
                    value={questForm.category} 
                    onValueChange={(value) => setQuestForm(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger data-testid="select-quest-category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Difficulty</label>
                  <Select 
                    value={questForm.difficulty} 
                    onValueChange={(value) => setQuestForm(prev => ({ ...prev, difficulty: value }))}
                  >
                    <SelectTrigger data-testid="select-quest-difficulty">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      {difficulties.map((difficulty) => (
                        <SelectItem key={difficulty} value={difficulty}>
                          {difficulty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Target Value</label>
                  <Input
                    placeholder="e.g., 10"
                    type="number"
                    value={questForm.targetValue}
                    onChange={(e) => setQuestForm(prev => ({ ...prev, targetValue: e.target.value }))}
                    data-testid="input-quest-target-value"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground">Target Unit</label>
                  <Input
                    placeholder="e.g., minutes, glasses, breaths"
                    value={questForm.targetUnit}
                    onChange={(e) => setQuestForm(prev => ({ ...prev, targetUnit: e.target.value }))}
                    data-testid="input-quest-target-unit"
                  />
                </div>
              </div>

              <Button 
                onClick={handleCreateQuest} 
                className="w-full"
                data-testid="button-create-quest"
              >
                <Save className="h-4 w-4 mr-2" />
                Create Quest
              </Button>
            </div>
          </Card>
        )}

        {activeTab === "journey" && (
          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Create New Journey</h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Title *</label>
                <Input
                  placeholder="e.g., Mindfulness Mastery"
                  value={journeyForm.title}
                  onChange={(e) => setJourneyForm(prev => ({ ...prev, title: e.target.value }))}
                  data-testid="input-journey-title"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Description *</label>
                <Textarea
                  placeholder="Describe what this journey covers and its goals..."
                  value={journeyForm.description}
                  onChange={(e) => setJourneyForm(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  data-testid="textarea-journey-description"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Category</label>
                <Select 
                  value={journeyForm.category} 
                  onValueChange={(value) => setJourneyForm(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger data-testid="select-journey-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">
                  Select Quests ({journeyForm.questIds.length} selected)
                </label>
                <div className="space-y-2 max-h-60 overflow-auto">
                  {availableQuests.map((quest) => (
                    <Card 
                      key={quest.id}
                      className={`p-3 cursor-pointer hover-elevate ${
                        journeyForm.questIds.includes(quest.id) ? "border-primary bg-primary/5" : ""
                      }`}
                      onClick={() => toggleQuestSelection(quest.id)}
                      data-testid={`quest-option-${quest.id}`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-foreground">{quest.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            {quest.category}
                          </Badge>
                        </div>
                        {journeyForm.questIds.includes(quest.id) && (
                          <Badge variant="default" className="text-xs">
                            Selected
                          </Badge>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <Button 
                onClick={handleCreateJourney} 
                className="w-full"
                data-testid="button-create-journey"
              >
                <Save className="h-4 w-4 mr-2" />
                Create Journey
              </Button>
            </div>
          </Card>
        )}
      </div>

      <Navigation onNavigate={setLocation} />
    </div>
  );
}