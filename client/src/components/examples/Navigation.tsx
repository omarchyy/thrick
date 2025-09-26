import Navigation from '../Navigation';

export default function NavigationExample() {
  return <Navigation onNavigate={(path) => console.log(`Navigate to ${path}`)} />;
}