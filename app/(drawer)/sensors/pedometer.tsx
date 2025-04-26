import { StyleSheet, Text, View } from 'react-native';

import { usePedometer } from '@/hooks/utils/use-pedometer';

export default function PedometerScreen() {
  const { steps, distance, isPedometerAvailable, speed } = usePedometer();

  return (
    <View style={styles.container}>
      <Text>Pedometer.isAvailableAsync(): {isPedometerAvailable}</Text>
      <Text>Current steps: {steps}</Text>
      <Text>Distance covered: {distance.toFixed(2)} meters</Text>
      <Text>Speed: {speed.toFixed(2)} m/s</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
