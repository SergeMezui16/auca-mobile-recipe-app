import React, { PropsWithChildren, ReactNode, WebViewHTMLAttributes } from 'react';
import { useWindowDimensions, View, ViewComponent } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { cn } from '@/lib/utils';

type SwipeListItemProps = PropsWithChildren & {
  leftButton?: ReactNode;
  rightButton?: ReactNode;
  onLeftSwipe?: () => void;
  onRightSwipe?: () => void;
  className?: WebViewHTMLAttributes<ViewComponent>['className'];
};

const MINIMUM_SWIPE_ACTIVATION_PERCENT = 0.2;

export const SwipeListItem = ({
  children,
  leftButton,
  rightButton,
  onLeftSwipe,
  onRightSwipe,
  className,
}: SwipeListItemProps) => {
  const { width } = useWindowDimensions();
  const SWIPE_THRESHOLD = width * MINIMUM_SWIPE_ACTIVATION_PERCENT;
  const translateX = useSharedValue(0);
  const context = useSharedValue({ x: 0 });

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { x: translateX.value };
    })
    .onUpdate((event) => {
      translateX.value = context.value.x + event.translationX;
    })
    .onEnd(() => {
      if (translateX.value > SWIPE_THRESHOLD) {
        translateX.value = withTiming(SWIPE_THRESHOLD);
        onLeftSwipe?.();
      } else if (translateX.value < -SWIPE_THRESHOLD) {
        translateX.value = withTiming(-SWIPE_THRESHOLD);
        onRightSwipe?.();
      } else {
        translateX.value = withTiming(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const btnClassName = cn(
    'absolute bottom-0 top-0 items-center justify-center w-full',
    `w-[${SWIPE_THRESHOLD}px]`
  );

  return (
    <GestureDetector gesture={gesture}>
      <View style={{ overflow: 'hidden' }} className={cn('')}>
        {leftButton && <View className={cn(btnClassName, 'left-0 bg-red-400')}>{leftButton}</View>}

        {rightButton && (
          <View className={cn(btnClassName, 'right-0 bg-green-400')}>{rightButton}</View>
        )}

        <Animated.View className={cn('w-auto flex-1', className)} style={animatedStyle}>
          {children}
        </Animated.View>
      </View>
    </GestureDetector>
  );
};
