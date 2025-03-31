import * as SecureStore from 'expo-secure-store';
import { useEffect } from 'react';
import { useDebounceCallback } from 'usehooks-ts';

type Preferences = {
  name: string | null;
  email: string | null;
  phone: string | null;
  profile: string | null;
  addr: string | null;
};

export function setItemValue(key: keyof Preferences, value: string) {
  SecureStore.setItem(key, value);
}

export async function getValueFor(key: string): Promise<string | null> {
  return await SecureStore.getItemAsync(key);
}

export function getItemValue(key: keyof Preferences): string | null {
  return SecureStore.getItem(key);
}

export const usePreferences = () => {
  const setName = useDebounceCallback((v) => setItemValue('name', v), 100);
  useEffect(() => {}, []);
  return {
    get: getValueFor,
    name: SecureStore.getItem('name'),
    email: SecureStore.getItem('email'),
    phone: SecureStore.getItem('phone'),
    profile: SecureStore.getItem('profile'),
    addr: SecureStore.getItem('addr'),
  };
};
