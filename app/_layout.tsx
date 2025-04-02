import '../global.css';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { PortalHost } from '@rn-primitives/portal';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { useFonts } from 'expo-font';
import * as Notifications from 'expo-notifications';
import { router, SplashScreen, Stack } from 'expo-router';
import { openDatabaseSync, SQLiteProvider } from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';
import React, { PropsWithChildren, Suspense, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { ThemeProvider } from '@/components/providers/theme-provider';
import { Text } from '@/components/ui/text';
import * as schema from '@/db/schema';
import { DATABASE_NAME } from '@/db/schema';
import migrations from '@/drizzle/migrations';

SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function useNotificationObserver() {
  useEffect(() => {
    let isMounted = true;

    function redirect(notification: Notifications.Notification) {
      const url = notification.request.content.data?.url;
      if (url) {
        router.push(url);
      }
    }

    Notifications.getLastNotificationResponseAsync().then((response) => {
      if (!isMounted || !response?.notification) {
        return;
      }
      redirect(response?.notification);
    });

    const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
      redirect(response.notification);
    });

    return () => {
      isMounted = false;
      subscription.remove();
    };
  }, []);
}

const expoDB = openDatabaseSync(DATABASE_NAME, { enableChangeListener: true });
const db = drizzle(expoDB, { schema });

export default function RootLayout({ children }: PropsWithChildren) {
  const result = useMigrations(db, migrations);
  useNotificationObserver();
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

  if (result.error) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Error: {result.error.message}</Text>
      </View>
    );
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Suspense fallback={<ActivityIndicator size="large" />}>
        <SQLiteProvider databaseName={DATABASE_NAME}>
          <ThemeProvider>
            <BottomSheetModalProvider>
              <StatusBar style="auto" />
              {children}
              <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="signup" options={{ headerShown: false }} />
                <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
              </Stack>
              <PortalHost />
            </BottomSheetModalProvider>
          </ThemeProvider>
        </SQLiteProvider>
      </Suspense>
    </GestureHandlerRootView>
  );
}
