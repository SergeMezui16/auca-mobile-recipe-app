import '../global.css';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { PropsWithChildren, useEffect } from 'react';

import { ThemeProvider } from '@/components/providers/theme-provider';

SplashScreen.preventAutoHideAsync();

export default function RootLayout({ children }: PropsWithChildren) {
  const [loaded, error] = useFonts({
    rosarivo: require('@/assets/fonts/rosarivo/Rosarivo-Regular.ttf'),
    roboto: require('@/assets/fonts/roboto/Roboto.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ThemeProvider>
      <StatusBar style="auto" />
      {children}
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
