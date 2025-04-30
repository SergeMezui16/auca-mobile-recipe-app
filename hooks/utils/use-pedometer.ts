import { PermissionStatus } from 'expo-modules-core';
import { Pedometer } from 'expo-sensors';
import { useEffect, useState } from 'react';

const STEP_LENGTH = 0.78; // Average step length in meters (adjust as needed)
const STEP_TIME = 0.5; // Average time per step in seconds (adjust as needed)

export const usePedometer = () => {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [distance, setDistance] = useState(0); // Distance in meters
  const [speed, setSpeed] = useState(0); // Speed in meters per second

  const subscribe = async () => {
    const { status } = await Pedometer.requestPermissionsAsync();

    if (status !== PermissionStatus.GRANTED) {
      setIsPedometerAvailable('denied');
      return;
    }

    const isAvailable = await Pedometer.isAvailableAsync();
    setIsPedometerAvailable(String(isAvailable));

    if (isAvailable) {
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 1);

      return Pedometer.watchStepCount((result) => {
        setCurrentStepCount(result.steps);
        setDistance(result.steps * STEP_LENGTH);

        // Calculate speed (distance / time)
        setSpeed((result.steps * STEP_LENGTH) / (STEP_TIME * result.steps));
      });
    }
  };

  useEffect(() => {
    subscribe();
  }, []);

  return {
    isPedometerAvailable,
    steps: currentStepCount,
    distance,
    speed,
  };
};
