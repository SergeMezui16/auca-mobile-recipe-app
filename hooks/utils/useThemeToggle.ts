import { useColorScheme } from 'nativewind';

export const useThemeToggle = () => {
  const { colorScheme, setColorScheme } = useColorScheme();

  return {
    toggle: () => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark'),
  };
};
