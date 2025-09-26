import { useState } from "react";
import { Plus, Target, MapPin, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import { useLocation } from "wouter";

// Form schemas
const questFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  targetValue: z.string().min(1, "Target value is required"),
  targetUnit: z.string().min(1, "Target unit is required"),
  difficulty: z.string().min(1, "Difficulty is required"),
});

const journeyFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
});

export default function CreatePage() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<"quest" | "journey">("quest");
  const { toast } = useToast();
  const [selectedQuestIds, setSelectedQuestIds] = useState<number[]>([]);

  // Quest form
  const questForm = useForm<z.infer<typeof questFormSchema>>({
    resolver: zodResolver(questFormSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      targetValue: "",
      targetUnit: "",
      difficulty: "",
    },
  });

  // Journey form  
  const journeyForm = useForm<z.infer<typeof journeyFormSchema>>({
    resolver: zodResolver(journeyFormSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
    },
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

  const handleCreateQuest = (values: z.infer<typeof questFormSchema>) => {
    console.log("Creating quest:", values);
    questForm.reset();
    toast({
      title: "Quest created successfully!",
      description: `"${values.title}" has been added to your custom quests.`,
    });
  };

  const handleCreateJourney = (values: z.infer<typeof journeyFormSchema>) => {
    if (selectedQuestIds.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one quest for your journey.",
        variant: "destructive",
      });
      return;
    }

    console.log("Creating journey:", { ...values, questIds: selectedQuestIds });
    journeyForm.reset();
    setSelectedQuestIds([]);
    toast({
      title: "Journey created successfully!",
      description: `"${values.title}" has been created with ${selectedQuestIds.length} quests.`,
    });
  };

  const toggleQuestSelection = (questId: number) => {
    setSelectedQuestIds(prev => 
      prev.includes(questId)
        ? prev.filter(id => id !== questId)
        : [...prev, questId]
    );
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
            
            <Form {...questForm}>
              <form onSubmit={questForm.handleSubmit(handleCreateQuest)} className="space-y-4">
                <FormField
                  control={questForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., Take a 10-minute walk"
                          data-testid="input-quest-title"
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={questForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe what this quest involves and its benefits..."
                          rows={3}
                          data-testid="textarea-quest-description"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={questForm.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-quest-category">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={questForm.control}
                    name="difficulty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Difficulty</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-quest-difficulty">
                              <SelectValue placeholder="Select difficulty" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {difficulties.map((difficulty) => (
                              <SelectItem key={difficulty} value={difficulty}>
                                {difficulty}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={questForm.control}
                    name="targetValue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Target Value</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., 10"
                            type="number"
                            data-testid="input-quest-target-value"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={questForm.control}
                    name="targetUnit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Target Unit</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., minutes, glasses, breaths"
                            data-testid="input-quest-target-unit"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full"
                  data-testid="button-create-quest"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Create Quest
                </Button>
              </form>
            </Form>
          </Card>
        )}

        {activeTab === "journey" && (
          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Create New Journey</h2>
            
            <Form {...journeyForm}>
              <form onSubmit={journeyForm.handleSubmit(handleCreateJourney)} className="space-y-4">
                <FormField
                  control={journeyForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Mindfulness Mastery"
                          data-testid="input-journey-title"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={journeyForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe what this journey covers and its goals..."
                          rows={3}
                          data-testid="textarea-journey-description"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={journeyForm.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-journey-category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category.charAt(0).toUpperCase() + category.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <div>
                  <label className="text-sm font-medium text-foreground">
                    Select Quests ({selectedQuestIds.length} selected)
                  </label>
                  <div className="space-y-2 max-h-60 overflow-auto">
                    {availableQuests.map((quest) => (
                      <Card 
                        key={quest.id}
                        className={`p-3 cursor-pointer hover-elevate ${
                          selectedQuestIds.includes(quest.id) ? "border-primary bg-primary/5" : ""
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
                          {selectedQuestIds.includes(quest.id) && (
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
                  type="submit"
                  className="w-full"
                  data-testid="button-create-journey"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Create Journey
                </Button>
              </form>
            </Form>
          </Card>
        )}
      </div>

      <Navigation onNavigate={setLocation} />
    </div>
  );
}