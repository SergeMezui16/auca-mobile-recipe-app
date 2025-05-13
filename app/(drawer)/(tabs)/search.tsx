import { FlashList } from '@shopify/flash-list';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';

import { RecipeCard } from '@/components/recipes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { useRecipe } from '@/hooks/use-recipe';

export default function Search() {
  const [search, setSearch] = useState('');
  const now = new Date();
  const { getAllRecipePublished } = useRecipe();
  const { data: recipes } = useLiveQuery(getAllRecipePublished(), [now]);
  const filteredRecipes = recipes?.filter((recipe) =>
    recipe.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View className="flex-1">
      <SafeAreaView className="m-2 flex-row gap-2">
        <Input
          placeholder="search a recipe..."
          id="search"
          value={search}
          onChangeText={(v) => setSearch(v)}
          className="flex-1 font-[rosarivo]"
          aria-labelledby="inputLabel"
          aria-errormessage="inputError"
        />
        <Button>
          <Text>Submit</Text>
        </Button>
      </SafeAreaView>
      <ScrollView className="m-2">
        <FlashList
          data={filteredRecipes}
          ItemSeparatorComponent={() => <View className="h-6" />}
          renderItem={({ item }) => <RecipeCard recipe={item} />}
          estimatedItemSize={153}
        />
      </ScrollView>
    </View>
  );
}
