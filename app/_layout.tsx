import '../global.css';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { PropsWithChildren } from 'react';

import { ThemeProvider } from '@/components/providers/ThemeProvider';

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <>
      <ThemeProvider>
        <StatusBar style="auto" />
        {children}

        <Stack />
      </ThemeProvider>
    </>
  );
}
