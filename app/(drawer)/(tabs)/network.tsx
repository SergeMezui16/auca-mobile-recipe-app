import { getIpAddressAsync, useNetworkState } from 'expo-network';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

import { ListBlock, SafeView } from '@/components/blocks';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

export default function NetworkPage() {
  const [ip, setIp] = useState('');
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
          Network Status
        </Text>
      </View>
      <View className="border-t border-border" />
      <ListBlock title="IP" value={ip} />
      <ListBlock title="Type" value={networkState.type} />
      <ListBlock title="Internet" value={networkState.isInternetReachable ? 'Online' : 'Offline'} />
      <ListBlock title="State" value={networkState.isConnected ? 'Connected' : 'Disconnected'} />
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
