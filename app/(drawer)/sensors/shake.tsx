import * as Notifications from 'expo-notifications';
import { Accelerometer } from 'expo-sensors';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ShakeNotificationScreen() {
  const [shakeDetected, setShakeDetected] = useState(false);

  const THRESHOLD = 1.5; // Adjust this value to control shake sensitivity

  const handleShake = (data: { x: number; y: number; z: number }) => {
    const magnitude = Math.sqrt(data.x * data.x + data.y * data.y + data.z * data.z);
    if (magnitude > THRESHOLD) {
      if (!shakeDetected) {
        setShakeDetected(true);
        sendNotification();
        setTimeout(() => setShakeDetected(false), 1000); // Prevent multiple notifications
      }
    }
  };

  const sendNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Shake Detected!',
        body: 'Your device was shaken.',
      },
      trigger: null,
    });
  };

  useEffect(() => {
    Accelerometer.setUpdateInterval(100); // Update every 100ms
    const subscription = Accelerometer.addListener(handleShake);

    return () => {
      subscription && subscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>Shake your device to trigger a notification!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});
