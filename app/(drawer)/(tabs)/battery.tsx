import { usePowerState } from 'expo-battery';
import { useNetworkState } from 'expo-network';
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';
import { View } from 'react-native';

import { ListBlock, SafeView } from '@/components/blocks';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

export default function NetworkPage() {
  const powerState = usePowerState();
  const networkState = useNetworkState();
  const batteryLevel = Math.round(powerState.batteryLevel * 100).toString() + '%';

  useEffect(() => {}, [networkState]);

  if (!networkState)
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </View>
    );

  return (
    <SafeView className="flex-1 gap-4">
      <View className="flex-row items-start justify-between">
        <Text size="2xl" className="pt-4">
          Battery Status
        </Text>
      </View>
      <View className="border-t border-border" />
      <ListBlock title="Level" value={batteryLevel} />
      <ListBlock title="State" value={getBatteryState(powerState.batteryState)} />
      <ListBlock title="Power mode" value={powerState.lowPowerMode ? 'Low' : 'Normal'} />
      <Button
        onPress={async () => {
          await Notifications.setNotificationChannelAsync('battery', {
            name: 'Battery',
            importance: Notifications.AndroidImportance.HIGH,
          });
          await Notifications.scheduleNotificationAsync({
            content: {
              title: `Your Battery level is ${batteryLevel}.`,
            },
            trigger: {
              seconds: 0,
              channelId: 'network',
            },
          });
        }}>
        <Text>Notify Battery level</Text>
      </Button>
    </SafeView>
  );
}

const getBatteryState = (state: number) => {
  switch (state) {
    case 0:
      return 'UNKNOWN';
    case 1:
      return 'UNPLUGGED';
    case 2:
      return 'CHARGING';
    case 3:
      return 'FULL';
  }
};
