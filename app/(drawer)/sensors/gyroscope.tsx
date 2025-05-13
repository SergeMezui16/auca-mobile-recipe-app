import { Link } from 'expo-router';
import { Gyroscope } from 'expo-sensors';
import React, { useEffect, useState } from 'react';
import { Animated, Button, StyleSheet, useWindowDimensions, View } from 'react-native';

import { SafeView } from '@/components/blocks';
import { ListBlock } from '@/components/blocks/list-block';
import { Text } from '@/components/ui/text';

export default function GyroscopeScreen() {
  const { width, height } = useWindowDimensions();
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const isLandscape = width > height;

  const [gyroscopeData, setGyroscopeData] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    const subscription = Gyroscope.addListener((data) => {
      setGyroscopeData(data);
      setRotation({
        x: data.x * 10, // Scale for better visualization
        y: data.y * 10,
        z: data.z * 10,
      });
    });

    Gyroscope.setUpdateInterval(100); // Update every 100ms

    return () => subscription && subscription.remove();
  }, []);

  return (
    <SafeView className="flex-1 gap-4">
      <View className="flex-row items-start justify-between">
        <Text size="2xl" className="pt-4">
          Gyroscope Sensors
        </Text>
      </View>
      <View className="border-t border-border" />
      <ListBlock title="X-axis" value={gyroscopeData.x.toFixed(2)} />
      <ListBlock title="Y-axis" value={gyroscopeData.y.toFixed(2)} />
      <ListBlock title="Z-axis" value={gyroscopeData.z.toFixed(2)} />
      <View style={styles.container}>
        <Animated.View
          className="flex items-center justify-center rounded-lg border border-border  p-4 shadow-lg"
          style={[
            styles.rectangle,
            {
              transform: [
                { rotateX: `${rotation.x}deg` },
                { rotateY: `${rotation.y}deg` },
                { rotateZ: `${rotation.z}deg` },
              ],
            },
          ]}>
          <Text className="text-white">GYRO</Text>
        </Animated.View>
      </View>
      <Link asChild href={{ pathname: '(drawer)/sensors' }}>
        <Button title="Back" />
      </Link>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  rectangle: {
    width: 300,
    height: 200,
    backgroundColor: 'blue',
  },
});
