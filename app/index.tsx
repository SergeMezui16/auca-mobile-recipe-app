import { View } from 'react-native';

import { SafeView } from '@/components/blocks';

export default function Index() {
  return (
    <>
      <SafeView className="items-center justify-center">
        <View>Login</View>
      </SafeView>
    </>
  );
}
