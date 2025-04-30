import { Link } from 'expo-router';
import { Button } from 'react-native';

import { SafeView } from '@/components/blocks';

export default function Sensors() {
  return (
    <SafeView className="flex-1 justify-center gap-4">
      <Link asChild href={{ pathname: '(drawer)/sensors/pedometer' }}>
        <Button title="Pedometer" />
      </Link>
      <Link asChild href={{ pathname: '(drawer)/sensors/shake' }}>
        <Button title="Accelerometer" />
      </Link>
      <Link asChild href={{ pathname: '(drawer)/sensors/light' }}>
        <Button title="Light Sensor" />
      </Link>
      <Link asChild href={{ pathname: '(drawer)/sensors/gyroscope' }}>
        <Button title="Gyroscope" />
      </Link>
    </SafeView>
  );
}
