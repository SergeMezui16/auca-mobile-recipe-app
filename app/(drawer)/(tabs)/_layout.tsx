import { DrawerToggleButton } from '@react-navigation/drawer';
import { Tabs } from 'expo-router';
import { LucideIcon } from 'lucide-react-native';
import React from 'react';

import { HomeIcon, PlusIcon, ProfileIcon, SearchIcon } from '@/components/icons';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: true, headerLeft: DrawerToggleButton }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Recipes',
          tabBarIcon: (props) => <TabBarIcon {...props} icon={HomeIcon} />,
          tabBarLabel: TabBarLabel,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: (props) => <TabBarIcon {...props} icon={SearchIcon} />,
          tabBarLabel: TabBarLabel,
        }}
      />
      <Tabs.Screen
        name="new"
        options={{
          title: 'New',
          tabBarIcon: (props) => <TabBarIcon {...props} icon={PlusIcon} />,
          tabBarLabel: TabBarLabel,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: (props) => <TabBarIcon {...props} icon={ProfileIcon} />,
          tabBarLabel: TabBarLabel,
        }}
      />
      <Tabs.Screen name="recipes" options={{ href: null }} />
    </Tabs>
  );
}

const TabBarLabel = ({ children, focused }: { children: string; focused: boolean }) => {
  return (
    <Text size="xs" className={cn('text-foreground', focused && 'text-primary')}>
      {children}
    </Text>
  );
};

export const TabBarIcon = ({
  focused,
  size,
  icon: Icon,
}: {
  focused: boolean;
  size: number;
  icon: LucideIcon;
}) => {
  return <Icon size={size} className={cn('stroke-2 text-foreground', focused && 'text-primary')} />;
};
