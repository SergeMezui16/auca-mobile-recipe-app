import { Link } from 'expo-router';
import { LightSensor } from 'expo-sensors';
import { useEffect, useState } from 'react';
import { Animated, Button, Platform, StyleSheet, View } from 'react-native';

import { SafeView } from '@/components/blocks';
import { ListBlock } from '@/components/blocks/list-block';
import { Text } from '@/components/ui/text';

export default function LightScreen() {
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
            setData(sensorData);
          })
        );
        LightSensor.setUpdateInterval(100);
      }
    });
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
      <Animated.View style={styles.circleContainer}>
        <Animated.View
          style={[
            styles.circle,
            {
              transform: [
                {
                  scale: illuminance / 100,
                },
              ],
            },
          ]}
        />
      </Animated.View>
      <Link asChild href={{ pathname: '(drawer)/sensors' }}>
        <Button title="Back" />
      </Link>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  circleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    backgroundColor: 'blue',
    width: 100,
    height: 100,
    borderRadius: '100%',
  },
});
