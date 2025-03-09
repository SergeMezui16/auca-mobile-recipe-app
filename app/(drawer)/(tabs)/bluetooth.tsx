import { useEffect, useState } from 'react';
import { PermissionsAndroid, Platform, View } from 'react-native';
import RNBluetoothClassic from 'react-native-bluetooth-classic';

import { ListBlock, SafeView } from '@/components/blocks';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

const requestBluetoothPermissions = async () => {
  if (Platform.OS === 'android' && Platform.Version >= 31) {
    const permissions = [
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
    ];

    const granted = await PermissionsAndroid.requestMultiple(permissions);

    return Object.values(granted).every(
      (permission) => permission === PermissionsAndroid.RESULTS.GRANTED
    );
  }
  return true;
};

let intervalId: NodeJS.Timeout;

export default function BluetoothPage() {
  const [state, setState] = useState(false);

  useEffect(() => {
    checkBluetooth().then((r) => {
      if (!r) return;
      intervalId = setInterval(checkBluetoothState, 1000);
    });

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const checkBluetooth = async () => {
    return await requestBluetoothPermissions();
  };

  const checkBluetoothState = async () => {
    try {
      const enabled = await RNBluetoothClassic.isBluetoothEnabled();
      setState(enabled);
      return true;
    } catch (error) {
      console.error('Error checking Bluetooth state:', error);
      return false;
    }
  };

  return (
    <SafeView className="flex-1 gap-4">
      <View className="flex-row items-start justify-between">
        <Text size="2xl" className="pt-4">
          Bluetooth Status
        </Text>
      </View>
      <View className="border-t border-border" />
      <ListBlock title="Status" value={state ? 'On' : 'Off'} />
      <Button onPress={checkBluetoothState}>
        <Text>Refresh</Text>
      </Button>
    </SafeView>
  );
}
