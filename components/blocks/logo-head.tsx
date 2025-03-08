import React from 'react';
import { View } from 'react-native';

import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';

export const LogoHead = () => {
  return (
    <View className="items-center gap-4">
      <Image className="h-[80px] w-[80px]" source={require('@/assets/images/pot-logo.png')} />
      <Text size="2xl" className="h-10 origin-bottom pt-4">
        Recipe Hub Share
      </Text>
    </View>
  );
};
