import { Link } from 'expo-router';
import { LightSensor } from 'expo-sensors';
import { useEffect, useState } from 'react';
import { Button, Platform, View } from 'react-native';

import { SafeView } from '@/components/blocks';
import { ListBlock } from '@/components/blocks/list-block';
import { Text } from '@/components/ui/text';

export default function LishtScreen() {
  const [{ illuminance }, setData] = useState({ illuminance: 0 });
  const [subscription, setSubscription] = useState(null);
  const [isAvailable, setIsAvailable] = useState(false);

  const subscribe = () => {
    LightSensor.requestPermissionsAsync();

    LightSensor.isAvailableAsync().then((available) => {
      setIsAvailable(available);
      if (available) {
        setSubscription(
          LightSensor.addListener((sensorData) => {
            console.log(sensorData, 'dazdazdaz');
            setData(sensorData);
          })
        );
        LightSensor.setUpdateInterval(100);
      }
    });

    setSubscription(
      LightSensor.addListener((sensorData) => {
        console.log(sensorData, 'dazdazdaz');
        setData(sensorData);
      })
    );
  };

  const unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    subscribe();
    return () => unsubscribe();
  }, []);

  return (
    <SafeView className="flex-1 gap-4">
      <View className="flex-row items-start justify-between">
        <Text size="2xl" className="pt-4">
          Light Sensors
        </Text>
      </View>
      <View className="border-t border-border" />
      <ListBlock title="Available" value={isAvailable ? 'yes' : 'no'} />
      <ListBlock
        title="Illuminance"
        value={Platform.OS === 'android' ? `${illuminance} lx` : `Only available on Android`}
      />
      <Link asChild href={{ pathname: '(drawer)/sensors' }}>
        <Button title="Back" />
      </Link>
    </SafeView>
  );
}
