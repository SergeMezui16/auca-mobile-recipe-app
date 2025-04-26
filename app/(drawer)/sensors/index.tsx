import { Link } from 'expo-router';
import { View } from 'react-native';

import { Text } from '@/components/ui/text';

export default function Sensors() {
  return (
    <View>
      <Text>Pedometer</Text>
      <Text>Pedometer</Text>
      <Link href={{ pathname: '(drawer)/sensors/pedometer' }}>
        <Text>Pedometer</Text>
      </Link>
      <Link href={{ pathname: '(drawer)/sensors/shake' }}>
        <Text>Accelerometer</Text>
      </Link>
    </View>
  );
}
