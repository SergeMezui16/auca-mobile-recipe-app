import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, View } from 'react-native';

import { SafeView } from '@/components/blocks';
import { ArrowRightIcon } from '@/components/icons';
import { CalculatorIcon } from '@/components/icons/calculator';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

export default function App() {
  return (
    <ScrollView>
      <Welcome />
      <Tools />
    </ScrollView>
  );
}

const Tools = () => {
  return (
    <SafeView className="gap-4">
      <View className="flex flex-row items-center justify-between">
        <Text size="lg">Tools</Text>
        <ArrowRightIcon className="stroke-1 text-foreground" />
      </View>
      <ToolList />
    </SafeView>
  );
};

const LIST = [
  {
    name: 'Calculator',
    icon: CalculatorIcon,
    route: 'calculator',
  },
  {
    name: 'Bluetooth',
    icon: CalculatorIcon,
    route: 'bluetooth',
  },
];

const ToolList = () => {
  const router = useRouter();
  return (
    <FlashList
      renderItem={({ item }) => (
        <View className="my-2 flex flex-row items-center justify-between gap-2">
          <Text>{item.name}</Text>
          <Button size="sm" variant="outline" onPress={() => router.push(item.route)}>
            <Text>See more</Text>
          </Button>
        </View>
      )}
      data={LIST}
    />
  );
};

const Welcome = () => {
  const router = useRouter();
  return (
    <SafeView className="gap-2 rounded border border-primary bg-primary/10">
      <Text size="xl">Mbolwani.</Text>
      <Text size="lg" className="text-muted-foreground">
        Welcome to my first mobile app.
      </Text>
      <View className="flex flex-row gap-4">
        <Button onPress={() => router.push({ pathname: 'calculator' })}>
          <CalculatorIcon size={14} className="stroke-1 text-primary-foreground" />
          <Text>See my calculator</Text>
        </Button>
      </View>
    </SafeView>
  );
};
