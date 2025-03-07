import { SafeAreaView, ScrollView } from 'react-native';
import { SafeAreaViewProps } from 'react-native-safe-area-context';

import { cn } from '@/lib/utils';

export const SafeView = ({ className, ...rest }: SafeAreaViewProps) => {
  return <SafeAreaView className={cn('m-3 p-4', className)} {...rest} />;
};

export const SafeScrollView = ({ className, ...rest }: SafeAreaViewProps) => {
  return <ScrollView className={cn('m-3 p-4', className)} {...rest} />;
};
