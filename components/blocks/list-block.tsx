import { View } from 'react-native';

import { Text } from '@/components/ui/text';

export const ListBlock = ({ title, value }: { title: string; value?: string }) => {
  return (
    <View className="mb-2 flex-row items-start justify-between">
      <Text size="xl" className="text-muted-foreground">
        {title}
      </Text>
      <Text size="xl">{value}</Text>
    </View>
  );
};
