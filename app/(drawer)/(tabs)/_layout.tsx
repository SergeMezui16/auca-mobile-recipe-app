import { Tabs } from 'expo-router';
import { LucideIcon } from 'lucide-react-native';
import React from 'react';

import { HeaderLogo, HeaderTitle, HeaderToggleTheme } from '@/components/blocks';
import {
  BatteryIcon,
  BluetoothIcon,
  CalculatorIcon,
  HomeIcon,
  NetworkIcon,
} from '@/components/icons';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerTitle: () => <HeaderTitle />,
        headerLeft: () => <HeaderLogo />,
        headerRight: () => <HeaderToggleTheme />,
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: (props) => <TabBarIcon {...props} icon={HomeIcon} />,
          tabBarLabel: TabBarLabel,
        }}
      />
      <Tabs.Screen
        name="calculator"
        options={{
          title: 'Calculator',
          tabBarIcon: (props) => <TabBarIcon {...props} icon={CalculatorIcon} />,
          tabBarLabel: TabBarLabel,
        }}
      />
      <Tabs.Screen
        name="network"
        options={{
          title: 'Network',
          tabBarIcon: (props) => <TabBarIcon {...props} icon={NetworkIcon} />,
          tabBarLabel: TabBarLabel,
        }}
      />
      <Tabs.Screen
        name="battery"
        options={{
          title: 'Battery',
          tabBarIcon: (props) => <TabBarIcon {...props} icon={BatteryIcon} />,
          tabBarLabel: TabBarLabel,
        }}
      />
      <Tabs.Screen
        name="bluetooth"
        options={{
          title: 'Bluetooth',
          tabBarIcon: (props) => <TabBarIcon {...props} icon={BluetoothIcon} />,
          tabBarLabel: TabBarLabel,
        }}
      />
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
