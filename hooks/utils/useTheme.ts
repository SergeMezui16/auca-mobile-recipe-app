import { useColorScheme } from 'nativewind';

export const useTheme = () => {
  const { colorScheme, setColorScheme } = useColorScheme();

  return {
    setTheme: setColorScheme,
    toggle: () => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark'),
    theme: colorScheme,
  };
};
