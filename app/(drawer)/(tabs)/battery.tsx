import { usePowerState } from 'expo-battery';
import { getIpAddressAsync, useNetworkState } from 'expo-network';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

import { ListBlock, SafeView } from '@/components/blocks';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

export default function NetworkPage() {
  const [ip, setIp] = useState('');
  const powerState = usePowerState();

  const networkState = useNetworkState();

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
      <ListBlock title="Level" value={Math.round(powerState.batteryLevel * 100).toString() + '%'} />
      <ListBlock title="State" value={getBatteryState(powerState.batteryState)} />
      <ListBlock title="Power mode" value={powerState.lowPowerMode ? 'Low' : 'Normal'} />
      <Button
        onPress={async () => {
          const ip = await getIpAddressAsync();
          console.log('refresh', ip);
          setIp(ip);
        }}>
        <Text>Refresh</Text>
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
