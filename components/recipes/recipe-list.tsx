import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { View } from 'react-native';

import { RecipeCard } from '@/components/recipes';

export const RecipeList = () => {
  return (
    <FlashList
      data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
      ItemSeparatorComponent={() => <View className="h-6" />}
      renderItem={({ item }) => <RecipeCard id={item} />}
      estimatedItemSize={153}
    />
  );
};
