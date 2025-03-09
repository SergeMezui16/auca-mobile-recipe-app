import * as ExpoDevice from 'expo-device';
import { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { BleManager } from 'react-native-ble-plx';

let bleManager: BleManager | null = null;

// Check if device supports Bluetooth LE
const isBLESupported = async () => {
  return (await ExpoDevice.getDeviceTypeAsync()) !== ExpoDevice.DeviceType.TV;
};

// Initialize BLE manager safely
const initializeBleManager = async () => {
  try {
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      const supported = await isBLESupported();
      if (supported) {
        bleManager = new BleManager();
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error('Failed to initialize BLE manager:', error);
    return false;
  }
};

export const useBLE = () => {
  const [isBluetoothOn, setIsBluetoothOn] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    const initialize = async () => {
      const initialized = await initializeBleManager();
      setIsInitialized(initialized);

      if (initialized && bleManager) {
        const subscription = bleManager.onStateChange((state) => {
          setIsBluetoothOn(state === 'PoweredOn');
        }, true);

        return () => subscription.remove();
      }
    };

    initialize();
  }, []);

  const checkBluetoothState = useCallback(async () => {
    if (!bleManager) {
      return false;
    }

    try {
      const state = await bleManager.state();
      return state === 'PoweredOn';
    } catch (error) {
      console.error('Error checking Bluetooth state:', error);
      return false;
    }
  }, []);

  return {
    isBluetoothOn,
    isInitialized,
    checkBluetoothState,
  };
};
