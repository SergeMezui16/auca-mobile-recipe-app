import { Link } from 'expo-router';
import { Button, View } from 'react-native';

import { SafeView } from '@/components/blocks';
import { ListBlock } from '@/components/blocks/list-block';
import { Text } from '@/components/ui/text';
import { usePedometer } from '@/hooks/utils/use-pedometer';

export default function PedometerScreen() {
  const { steps, distance, isPedometerAvailable, speed } = usePedometer();

  return (
    <SafeView className="flex-1 gap-4">
      <View className="flex-row items-start justify-between">
        <Text size="2xl" className="pt-4">
          Battery Status
        </Text>
      </View>
      <View className="border-t border-border" />
      <ListBlock title="Current steps" value={steps.toLocaleString()} />
      <ListBlock title="Distance covered" value={distance.toFixed(2)} />
      <ListBlock title="Speed" value={speed.toFixed(2) + 'm/s'} />
      <ListBlock title="Pedometer" value={isPedometerAvailable ? 'available' : 'none'} />

      <Link asChild href={{ pathname: '(drawer)/sensors' }}>
        <Button title="Back" />
      </Link>
    </SafeView>
  );
}
