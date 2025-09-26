import JourneyCard from '../JourneyCard';
import { Heart, Brain, Zap, Leaf } from "lucide-react";

export default function JourneyCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <JourneyCard
        title="Kindness Journey"
        description="Spread kindness and build meaningful connections"
        completedQuests={3}
        totalQuests={7}
        icon={<Heart className="h-6 w-6 text-red-500" />}
        iconBgColor="bg-red-100"
        onClick={() => console.log('Kindness journey opened')}
      />
      
      <JourneyCard
        title="Mindfulness Path"
        description="Develop awareness and inner peace"
        completedQuests={5}
        totalQuests={10}
        icon={<Brain className="h-6 w-6 text-purple-600" />}
        iconBgColor="bg-purple-100"
        onClick={() => console.log('Mindfulness journey opened')}
      />
      
      <JourneyCard
        title="Energy Boost"
        description="Build healthy habits for sustained energy"
        completedQuests={1}
        totalQuests={6}
        icon={<Zap className="h-6 w-6 text-yellow-600" />}
        iconBgColor="bg-yellow-100"
        onClick={() => console.log('Energy boost journey opened')}
      />
      
      <JourneyCard
        title="Nature Connection"
        description="Reconnect with the natural world"
        completedQuests={0}
        totalQuests={8}
        icon={<Leaf className="h-6 w-6 text-green-600" />}
        iconBgColor="bg-green-100"
        onClick={() => console.log('Nature connection journey opened')}
      />
    </div>
  );
}