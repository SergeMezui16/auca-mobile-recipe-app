import { SunIcon } from 'lucide-react-native';
import React, { useEffect } from 'react';

import { CookingPotIcon, MoonStarIcon } from '@/components/icons';
import { Text } from '@/components/ui/text';
import { useTheme } from '@/hooks/utils';

export const HeaderTitle = () => {
  return (
    <Text size="xl" className="pt-3">
      Recipe Hub Share
    </Text>
  );
};

export const HeaderLogo = () => {
  return <CookingPotIcon className="ml-2 mr-2 stroke-1 text-primary" size={24} />;
};

export const HeaderToggleTheme = () => {
  const { theme, setTheme, toggle } = useTheme();

  useEffect(() => {
    setTheme('light');
  }, []);

  const Icon = theme === 'light' ? MoonStarIcon : SunIcon;

  return <Icon onPress={toggle} className="mr-2 stroke-1 text-foreground" size={24} />;
};
