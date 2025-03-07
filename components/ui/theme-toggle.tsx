import React, { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useTheme } from '@/hooks/utils';

export function ThemeToggle() {
  const { theme, setTheme, toggle } = useTheme();

  useEffect(() => {
    setTheme('dark');
  }, []);

  return (
    <Button onPress={toggle}>
      <Text>Toggle theme (Current: {theme})</Text>
    </Button>
  );
}
