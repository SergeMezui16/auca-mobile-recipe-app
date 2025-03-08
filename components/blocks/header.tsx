import { DrawerActions, useNavigation } from '@react-navigation/native';
import { SunIcon } from 'lucide-react-native';
import React, { useEffect } from 'react';

import { MoonStarIcon } from '@/components/icons';
import { MenuIcon } from '@/components/icons/menu';
import { Text } from '@/components/ui/text';
import { useTheme } from '@/hooks/utils';

export const HeaderTitle = () => {
  return (
    <Text size="xl" className="pt-3">
      My Mobile App
    </Text>
  );
};

export const HeaderLogo = () => {
  const { dispatch } = useNavigation();
  // const {} = Drawer;
  return (
    <MenuIcon
      onPress={() => dispatch(DrawerActions.toggleDrawer())}
      className="ml-2 mr-2 text-foreground"
      size={24}
    />
  );
};

export const HeaderToggleTheme = () => {
  const { theme, setTheme, toggle } = useTheme();

  useEffect(() => {
    setTheme('light');
  }, []);

  const Icon = theme === 'light' ? MoonStarIcon : SunIcon;

  return <Icon onPress={toggle} className="mr-2 stroke-1 text-foreground" size={24} />;
};
