import { SafeView } from '@/components/blocks';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

export default function BluetoothPage() {
  return (
    <SafeView className="flex-1 gap-4">
      <Button>
        <Text>Refresh {2}</Text>
      </Button>
    </SafeView>
  );
}
