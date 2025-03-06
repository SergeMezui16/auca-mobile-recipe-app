import { ScreenContent } from 'components/ScreenContent';

import { Text } from '@/components/ui/Text';
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default function App() {
  return (
    <>
      {/*<ScreenContent title="Home" path="App.tsx" />*/}
      <ThemeToggle />
      <Text className="text-primary-foreground">Label</Text>
    </>
  );
}
