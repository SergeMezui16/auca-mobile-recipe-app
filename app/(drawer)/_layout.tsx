import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
import { LucideIcon } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';

import { ContactIcon, HomeIcon } from '@/components/icons';
import { PenIcon } from '@/components/icons/pen';
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { getItemValue } from '@/hooks/utils/use-preferences';
import { cn } from '@/lib/utils';

export default function Layout() {
  return (
    <Drawer
      drawerContent={(props) => (
        <DrawerContentScrollView className="">
          <View className="mb-10 flex items-center justify-center gap-2 border-b border-border pb-4">
            <Image
              source={
                getItemValue('profile') ||
                'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2023/12/Shakshuka-main-1.jpg'
              }
              contentFit="cover"
              className="h-40 w-40 rounded-full"
            />
            <Text size="xl">{getItemValue('name')}</Text>
          </View>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
      )}>
      <Drawer.Screen
        name="(tabs)"
        options={{
          headerTitle: 'Home',
          headerShown: false,
          drawerLabel: ({ focused }) => <DrawerLabel title="Home" focused={focused} />,
          drawerIcon: (props) => <DrawerIcon {...props} icon={HomeIcon} />,
        }}
      />
      <Drawer.Screen
        name="contacts"
        options={{
          headerTitle: 'Contacts',
          headerShown: true,
          drawerLabel: ({ focused }) => <DrawerLabel title="Contacts" focused={focused} />,
          drawerIcon: (props) => <DrawerIcon {...props} icon={ContactIcon} />,
        }}
      />
      <Drawer.Screen
        name="preferences"
        options={{
          headerTitle: 'Preferences',
          headerShown: true,
          drawerLabel: ({ focused }) => <DrawerLabel title="Preferences" focused={focused} />,
          drawerIcon: (props) => <DrawerIcon {...props} icon={PenIcon} />,
        }}
      />
    </Drawer>
  );
}

const DrawerLabel = ({ title, focused }: { title: string; focused: boolean }) => {
  return (
    <Text size="lg" className={cn('text-foreground')}>
      {title}
    </Text>
  );
};

export const DrawerIcon = ({
  focused,
  size,
  icon: Icon,
}: {
  focused: boolean;
  size: number;
  icon: LucideIcon;
}) => {
  return <Icon size={size - 5} className={cn('stroke-2 text-foreground')} />;
};
