import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View } from 'react-native';

import { LogoHead, SafeView } from '@/components/blocks';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { getItemValue } from '@/hooks/utils/use-preferences';

export default function Index() {
  const router = useRouter();
  const [checked, setChecked] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    console.log('Email:', email + '->' + getItemValue('email'));
    console.log('Password:', password + '->' + getItemValue('password'));

    if (!email || !password) {
      setError('Please fill all the required fields. Email and Password are required.');
      return;
    }

    // Simulate a login process
    if (getItemValue('email') !== email || getItemValue('password') !== password) {
      setError('Invalid email or password');
      return;
    }

    router.replace({ pathname: '/home' });
  };

  return (
    <>
      <SafeView className="flex-1 items-center justify-center gap-10">
        <LogoHead />
        <View className="w-full gap-6 rounded-lg border border-secondary bg-secondary p-4">
          <View>
            <Text size="xl">Welcome back.</Text>
            <Text className="text-muted-foreground">
              Provide your credentials to login and start cooking your favorite food.
            </Text>
          </View>
          <View className="gap-4">
            <View className="w-full">
              <Label>
                <Text size="lg">Email</Text>
              </Label>
              <Input
                value={email}
                onChangeText={(e) => setEmail(e)}
                placeholderClassName="font-[rosarivo]"
                aria-labelledby="textareaLabel"
                keyboardType="email-address"
                className={error ? 'border-red-500' : ''}
              />
              {error && <Text className="text-red-500">{error}</Text>}
            </View>
            <View className="w-full">
              <Label>
                <Text size="lg">Password</Text>
              </Label>
              <Input
                value={password}
                onChangeText={(e) => setPassword(e)}
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
            <Button onPress={() => handleSubmit()} className="w-full">
              <Text>Login</Text>
            </Button>
            <View className="items-center gap-2">
              <Text className="text-muted-foreground"> Don't have an account?</Text>
              <Text className="text-primary" onPress={() => router.replace({ pathname: 'signup' })}>
                Sign up
              </Text>
            </View>
          </View>
        </View>
      </SafeView>
    </>
  );
}
