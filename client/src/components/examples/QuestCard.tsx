import QuestCard from '../QuestCard';
import { Droplets, Dumbbell, Footprints } from "lucide-react";

export default function QuestCardExample() {
  return (
    <div className="space-y-4 p-4">
      <QuestCard
        title="Hydration"
        progress={{ current: 1, total: 2, unit: "L" }}
        icon={<Droplets className="h-6 w-6 text-primary" />}
        iconBgColor="bg-primary/20"
        onContinue={() => console.log('Continue hydration quest')}
      />
      
      <QuestCard
        title="Leg workout"
        progress={{ current: 15, total: 25, unit: "m" }}
        icon={<Dumbbell className="h-6 w-6 text-orange-600" />}
        iconBgColor="bg-orange-100"
        onContinue={() => console.log('Continue leg workout')}
      />
      
      <QuestCard
        title="3k Steps to go"
        progress={{ current: 15, total: 25, unit: "m" }}
        icon={<Footprints className="h-6 w-6 text-gray-600" />}
        iconBgColor="bg-gray-100"
        onStart={() => console.log('Start steps quest')}
      />
    </div>
  );
}