import React, { useCallback } from 'react';
import { FlatList, ListRenderItem, Text, TouchableOpacity, View } from 'react-native';
import SwipeableItem, { useSwipeableItemParams } from 'react-native-swipeable-item';

import { TrashIcon } from '@/components/icons/trash';

const DATA = [
  { key: 'a', text: 'Item A' },
  { key: 'b', text: 'Item B' },
  { key: 'c', text: 'Item C' },
  { key: 'd', text: 'Item D' },
];

export default function Swipe2() {
  const renderItem: ListRenderItem<Item> = useCallback(({ item }) => {
    return (
      <SwipeableItem
        item={item}
        renderUnderlayLeft={() => <UnderlayLeft />}
        renderUnderlayRight={() => <UnderlayRight />}
        snapPointsLeft={[150]}
        snapPointsRight={[150]}>
        <View className="h-24 w-full items-center justify-center bg-red-100 p-4">
          <Text>{`${item.text}`}</Text>
        </View>
      </SwipeableItem>
    );
  }, []);

  const renderSeparator = useCallback(() => {
    return <View className="h-4" />;
  }, []);

  return (
    <View className="gap-4">
      <FlatList
        ItemSeparatorComponent={renderSeparator}
        keyExtractor={(item) => item.key}
        data={DATA}
        renderItem={renderItem}
      />
    </View>
  );
}

const UnderlayLeft = () => {
  const { close } = useSwipeableItemParams<Item>();
  return (
    <View>
      <TouchableOpacity className="z-40 h-24 w-24 bg-red-400" onPress={() => close()}>
        <Text>LEFT</Text>
        <TrashIcon className="text-white" />
      </TouchableOpacity>
    </View>
  );
};

const UnderlayRight = () => {
  const { close } = useSwipeableItemParams<Item>();
  return (
    <View>
      <TouchableOpacity onPress={() => close()}>
        <Text>CLOSER</Text>
      </TouchableOpacity>
    </View>
  );
};

type Item = {
  key: string;
  text: string;
};
