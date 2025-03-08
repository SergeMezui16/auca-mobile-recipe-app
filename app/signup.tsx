import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View } from 'react-native';

import { LogoHead, SafeView } from '@/components/blocks';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';

export default function Signup() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  return (
    <>
      <SafeView className="flex-1 items-center justify-center gap-10">
        <LogoHead />
        <View className="w-full gap-6 rounded-lg border border-secondary bg-secondary p-4">
          <View>
            <Text size="xl">Mbolani.</Text>
            <Text className="text-muted-foreground">
              Provide your credentials to register and start cooking your favorite food.
            </Text>
          </View>
          <View className="gap-4">
            <View className="w-full">
              <Label>
                <Text size="lg">Username</Text>
              </Label>
              <Input placeholderClassName="font-[rosarivo]" aria-labelledby="textareaLabel" />
            </View>
            <View className="w-full">
              <Label>
                <Text size="lg">Email</Text>
              </Label>
              <Input
                placeholderClassName="font-[rosarivo]"
                aria-labelledby="textareaLabel"
                keyboardType="email-address"
              />
            </View>
            <View className="w-full">
              <Label>
                <Text size="lg">Password</Text>
              </Label>
              <Input
                placeholderClassName="font-[rosarivo]"
                aria-labelledby="textareaLabel"
                textContentType="password"
                secureTextEntry={checked}
              />
            </View>
            <View className="w-full flex-row items-center gap-2">
              <Checkbox checked={checked} onCheckedChange={setChecked} />
              <Label>
                <Text size="lg">Show/Hide password ?</Text>
              </Label>
            </View>
          </View>
          <View className="items-center gap-4">
            <Button onPress={() => router.replace({ pathname: 'index' })} className="w-full">
              <Text>Register</Text>
            </Button>
            <View className="items-center gap-2">
              <Text className="text-muted-foreground">Already have an account ?</Text>
              <Text className="text-primary" onPress={() => router.replace({ pathname: 'index' })}>
                Login
              </Text>
            </View>
          </View>
        </View>
      </SafeView>
    </>
  );
}
