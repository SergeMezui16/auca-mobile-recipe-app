import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useTheme } from '@react-navigation/native';
import { forwardRef, PropsWithChildren, ReactNode, useCallback, useRef } from 'react';
import { View } from 'react-native';

import { SafeView } from '@/components/blocks';
import { Text } from '@/components/ui/text';

export type Ref = BottomSheetModal;

type Props = PropsWithChildren<{
  title: string;
  description: string;
  trigger?: ReactNode;
  onChange?: (index: number) => void;
}>;

const SNAP_POINTS = ['50%', '75%', '100%'];

export const BottomSheet = forwardRef<Ref, Props>(
  ({ title, description, onChange, children, trigger }, ref) => {
    const handleSheetChanges = useCallback((index: number) => {
      if (onChange) {
        onChange(index);
      }
    }, []);

    const theme = useTheme();

    const renderBackdrop = useCallback(
      (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
      []
    );

    const renderBackground = useCallback(
      (props: any) => (
        <View
          className="rounded-lg border border-border bg-background"
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          {...props}
        />
      ),
      []
    );

    return (
      <View>
        {trigger}
        <BottomSheetModal
          handleIndicatorStyle={{ backgroundColor: theme.dark ? '#fff' : '#000' }}
          backdropComponent={renderBackdrop}
          backgroundComponent={renderBackground}
          snapPoints={SNAP_POINTS}
          ref={ref}
          onChange={handleSheetChanges}>
          <BottomSheetView className="flex-1 rounded-t-xl bg-background">
            <SafeView className="items-center justify-center">
              <Text className="text-3xl">{title}</Text>
              <Text className="text-sm text-muted-foreground">{description}</Text>
            </SafeView>
            <View className="flex-1">{children}</View>
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    );
  }
);

export const useBottomSheet = () => {
  const ref = useRef<Ref>(null);
  const open = useCallback(() => {
    ref.current?.present();
  }, []);

  const close = useCallback(() => {
    ref.current?.dismiss();
  }, []);

  return {
    open,
    close,
    ref,
  };
};

BottomSheet.displayName = 'BottomSheet';
