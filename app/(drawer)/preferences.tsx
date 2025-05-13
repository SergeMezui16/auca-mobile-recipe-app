import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Pressable, View } from 'react-native';
import { useDebounceCallback } from 'usehooks-ts';

import { HeaderToggleTheme, SafeView } from '@/components/blocks';
import { PenIcon } from '@/components/icons/pen';
import { Image } from '@/components/ui/image';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { getItemValue, setItemValue } from '@/hooks/utils/use-preferences';

const Preferences = React.memo(() => {
  const setName = useDebounceCallback((v) => setItemValue('name', v), 100);
  const setEmail = useDebounceCallback((v) => setItemValue('email', v), 100);
  const setPhone = useDebounceCallback((v) => setItemValue('phone', v), 100);
  const setAddr = useDebounceCallback((v) => setItemValue('addr', v), 100);

  useEffect(() => {}, []);

  return (
    <SafeView className="flex-1 gap-4">
      <View className="flex-row items-start justify-between">
        <Text size="2xl" className="pt-4">
          My Preferences
        </Text>
        <HeaderToggleTheme />
      </View>

      <View className="mb-10 border-b border-border pb-4">
        <ProfilePicker />
      </View>

      <KeyboardAvoidingView behavior="padding" className="gap-4" enabled>
        <View className="gap-1">
          <Label htmlFor="name">Display Name</Label>
          <Input id="name" defaultValue={getItemValue('name')!} onChangeText={(v) => setName(v)} />
        </View>

        <View className="gap-1">
          <Label htmlFor="email">Shipping Email</Label>
          <Input
            keyboardType="email-address"
            id="email"
            defaultValue={getItemValue('email')!}
            onChangeText={(v) => setEmail(v)}
          />
        </View>

        <View className="gap-1">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            keyboardType="phone-pad"
            id="phone"
            defaultValue={getItemValue('phone')!}
            onChangeText={(v) => setPhone(v)}
          />
        </View>

        <View className="gap-1">
          <Label htmlFor="addr">Shipping Address</Label>
          <Input id="addr" defaultValue={getItemValue('addr')!} onChangeText={(v) => setAddr(v)} />
        </View>
      </KeyboardAvoidingView>
    </SafeView>
  );
});

export function ProfilePicker() {
  const [value, setValue] = useState(getItemValue('profile'));
  const setImage = useDebounceCallback((v) => {
    setValue(v);
    setItemValue('profile', v);
  }, 100);
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  useEffect(() => {}, []);

  return (
    <View className="flex items-center justify-center gap-4">
      <View className="relative mt-4">
        <Image
          source={
            value ||
            'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2023/12/Shakshuka-main-1.jpg'
          }
          contentFit="cover"
          className="h-40 w-40 rounded-full"
        />
        <Pressable
          onPress={pickImage}
          className="absolute bottom-0 right-0 rounded-full bg-primary p-2">
          <PenIcon className="text-foreground" />
        </Pressable>
      </View>
    </View>
  );
}

export default Preferences;
