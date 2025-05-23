import { FlashList } from '@shopify/flash-list';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import React from 'react';
import { View } from 'react-native';

import { RecipeCard } from './recipe-card';

import { useRecipe } from '@/hooks/use-recipe';

export const RecipeList = () => {
  const now = new Date();
  const { getAllRecipePublished } = useRecipe();
  const { data: recipes } = useLiveQuery(getAllRecipePublished(), [now]);

  return (
    <FlashList
      data={recipes}
      ItemSeparatorComponent={() => <View className="h-6" />}
      renderItem={({ item }) => <RecipeCard recipe={item} />}
      estimatedItemSize={153}
    />
  );
};
