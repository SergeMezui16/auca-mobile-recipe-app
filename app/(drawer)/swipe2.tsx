import React, { useCallback } from 'react';
import { FlatList, ListRenderItem, Text, TouchableOpacity, View } from 'react-native';
import SwipeableItem, { useSwipeableItemParams } from 'react-native-swipeable-item';

const NUM_ITEMS = 10;

export default function Swipe2() {
  const renderItem: ListRenderItem<Item> = useCallback(({ item }) => {
    return (
      <SwipeableItem
        key={item.key}
        item={item}
        renderUnderlayLeft={() => <UnderlayLeft />}
        renderUnderlayRight={() => <UnderlayLeft />}
        snapPointsLeft={[150]}
        snapPointsRight={[150]}>
        <View className="h-10 w-full items-center justify-center bg-red-100 p-4">
          <Text>{`${item.text}`}</Text>
        </View>
      </SwipeableItem>
    );
  }, []);

  return (
    <View className="gap-4">
      <FlatList keyExtractor={(item) => item.key} data={initialData} renderItem={renderItem} />
    </View>
  );
}

const UnderlayLeft = () => {
  const { close } = useSwipeableItemParams<Item>();
  return (
    <View>
      <TouchableOpacity onPress={() => close()}>
        <Text>CLOSE</Text>
      </TouchableOpacity>
    </View>
  );
};

type Item = {
  key: string;
  text: string;
  backgroundColor: string;
};

function getColor(i: number) {
  const multiplier = 255 / (NUM_ITEMS - 1);
  const colorVal = i * multiplier;
  return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`;
}

const initialData: Item[] = [...Array(NUM_ITEMS)].fill(0).map((d, index) => {
  const backgroundColor = getColor(index);
  return {
    text: `${index}`,
    key: `key-${backgroundColor}`,
    backgroundColor,
  };
});
