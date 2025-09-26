import AICompanion from '../AICompanion';

export default function AICompanionExample() {
  return <AICompanion onAskAI={() => console.log('AI companion opened')} />;
}