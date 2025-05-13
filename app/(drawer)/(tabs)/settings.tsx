import { Link } from 'expo-router';
import {
  CloudyIcon,
  FileUserIcon,
  HeadsetIcon,
  LogOutIcon,
  MoonIcon,
  SquareArrowOutUpRightIcon,
} from 'lucide-react-native';
import React, { useState } from 'react';
import { Pressable, View } from 'react-native';

import { ProfilePicker } from '@/app/(drawer)/preferences';
import { SafeView } from '@/components/blocks';
import { BottomSheet, useBottomSheet } from '@/components/bottom-sheet';
import { ProfileIcon, SunIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { useTheme } from '@/hooks/utils';
import { getItemValue, setItemValue } from '@/hooks/utils/use-preferences';
import { cn } from '@/lib/utils';

const TINT_COLOR = '#f97316';

export default function SettingsTab() {
  return (
    <View>
      <EditProfile />
      <EditUserName />
      <EditTheme />
      <SafeView className="flex-row items-start justify-start gap-4">
        <View className="mt-2">
          <LogOutIcon size={35} color={TINT_COLOR} strokeWidth={1} />
        </View>
        <View className="flex-1">
          <Text size="xl">Logout</Text>
          <Text>logout from your account</Text>
        </View>
        <View className="mt-2">
          <Link asChild href={{ pathname: '/' }}>
            <SquareArrowOutUpRightIcon size={20} color="gray" />
          </Link>
        </View>
      </SafeView>
      <SafeView className="flex-row items-start justify-start gap-4">
        <View className="mt-2">
          <HeadsetIcon size={35} color={TINT_COLOR} strokeWidth={1} />
        </View>
        <View className="flex-1">
          <Text size="xl">Contact</Text>
          <Text>contact our dev team.</Text>
        </View>
        <View className="mt-2">
          <Link asChild href="https://sergemezui.com" target="_blank">
            <SquareArrowOutUpRightIcon size={20} color="gray" />
          </Link>
        </View>
      </SafeView>

      <SafeView className="mt-5 items-center justify-center text-muted-foreground">
        <Text size="xl">Recipe share hub</Text>
        <Text>Made with ♥️ by Serge Mezui.</Text>
        <Text className="text-muted-foreground">All rights reserved.</Text>
        <Text className="text-muted-foreground">2025</Text>
      </SafeView>
    </View>
  );
}

const EditProfile = () => {
  const { ref, open } = useBottomSheet();
  return (
    <>
      <BottomSheet ref={ref} title="Update profile" description="Update your profile here">
        <ProfilePicker />
      </BottomSheet>
      <Pressable onPress={() => open()}>
        <SafeView className="flex-row items-start justify-start gap-4">
          <View className="mt-2">
            <ProfileIcon size={35} strokeWidth={1} color={TINT_COLOR} />
          </View>
          <View className="flex-1">
            <Text size="xl">Profile picture</Text>
            <Text>update your profile picture here</Text>
          </View>
          <View className="mt-2">
            <SquareArrowOutUpRightIcon size={20} color="gray" />
          </View>
        </SafeView>
      </Pressable>
    </>
  );
};

const EditTheme = () => {
  const { ref, open, close } = useBottomSheet();
  const { theme, setTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme);

  const save = () => {
    if (selectedTheme === undefined) {
      return;
    }

    setTheme(selectedTheme);
    close();
  };

  return (
    <>
      <BottomSheet ref={ref} title="Update theme" description="Update your app theme">
        <SafeView className="gap-4">
          <View className="gap-1">
            <Label htmlFor="name">Select your theme</Label>
          </View>

          <View className="flex flex-row items-center justify-between gap-4">
            <Pressable
              onPress={() => setSelectedTheme('light')}
              className={cn(
                'flex-1 flex-row items-center justify-center gap-2 rounded-lg border border-border p-4',
                selectedTheme === 'light' && 'border-2 border-primary bg-primary/10'
              )}>
              <SunIcon
                strokeWidth={selectedTheme === 'light' ? 2 : 1}
                size={30}
                color={selectedTheme === 'light' ? TINT_COLOR : 'gray'}
              />
              <Text size="xl">Light</Text>
            </Pressable>
            <Pressable
              onPress={() => setSelectedTheme('dark')}
              className={cn(
                'flex-1 flex-row items-center justify-center gap-2 rounded-lg border border-border p-4',
                selectedTheme === 'dark' && 'border-2 border-primary bg-primary/10'
              )}>
              <MoonIcon
                strokeWidth={selectedTheme === 'dark' ? 2 : 1}
                size={30}
                color={selectedTheme === 'dark' ? TINT_COLOR : 'gray'}
              />
              <Text size="xl">Dark</Text>
            </Pressable>
          </View>
          <View className="mt-2 flex-row items-center justify-end gap-4">
            <Button onPress={save} className="flex-1">
              <Text>Save</Text>
            </Button>
          </View>
        </SafeView>
      </BottomSheet>
      <Pressable onPress={() => open()}>
        <SafeView className="flex-row items-start justify-start gap-4">
          <View className="mt-2">
            <CloudyIcon size={35} color={TINT_COLOR} strokeWidth={1} />
          </View>
          <View className="flex-1">
            <Text size="xl">Theme</Text>
            <Text>select your favorite theme for your app</Text>
          </View>
          <View className="mt-2">
            <SquareArrowOutUpRightIcon size={20} color="gray" />
          </View>
        </SafeView>
      </Pressable>
    </>
  );
};

const EditUserName = () => {
  const { ref, open, close } = useBottomSheet();
  const [name, setName] = useState(getItemValue('name')!);

  const save = () => {
    setItemValue('name', name);
    close();
  };

  return (
    <>
      <BottomSheet ref={ref} title="Update your name" description="Update your displayed name here">
        <SafeView>
          <View className="gap-1">
            <Label htmlFor="name">Display Name</Label>
            <Input id="name" defaultValue={name} value={name} onChangeText={(v) => setName(v)} />
          </View>

          <View className="mt-2 flex-row items-center justify-end gap-4">
            <Button variant="secondary" onPress={() => close()} className="flex-1">
              <Text>Cancel</Text>
            </Button>
            <Button onPress={save} className="flex-1">
              <Text>Save</Text>
            </Button>
          </View>
        </SafeView>
      </BottomSheet>
      <Pressable onPress={() => open()}>
        <SafeView className="flex-row items-start justify-start gap-4">
          <View className="mt-2">
            <FileUserIcon size={35} color={TINT_COLOR} strokeWidth={1} />
          </View>
          <View className="flex-1">
            <Text size="xl">Username</Text>
            <Text>update your username here</Text>
          </View>
          <View className="mt-2">
            <SquareArrowOutUpRightIcon size={20} color="gray" />
          </View>
        </SafeView>
      </Pressable>
    </>
  );
};
