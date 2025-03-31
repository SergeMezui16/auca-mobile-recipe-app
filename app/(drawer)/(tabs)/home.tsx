import React from 'react';
import { ScrollView, View } from 'react-native';

import { SafeView } from '@/components/blocks';
import { ArrowRightIcon, PlusIcon, ShuffleIcon } from '@/components/icons';
import { RecipeList } from '@/components/recipes';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

export default function App() {
  return (
    <ScrollView>
      <Welcome />
      <Recipes />
    </ScrollView>
  );
}

const Recipes = () => {
  return (
    <SafeView className="gap-4">
      <View className="flex flex-row items-center justify-between">
        <Text size="lg">Recipes</Text>
        <ArrowRightIcon className="stroke-1 text-foreground" />
      </View>
      <RecipeList />
    </SafeView>
  );
};
const Welcome = () => {
  return (
    <SafeView className="gap-2 rounded border border-primary bg-primary/10">
      <Text size="xl">Mbolwani.</Text>
      <Text size="lg" className="text-muted-foreground">
        Recipe Hub, create and share recipe with everybody around the world.
      </Text>
      <View className="flex flex-row gap-4">
        <Button variant="outline">
          <ShuffleIcon size={14} className="stroke-1 text-foreground" />
          <Text>Shuffle recipe</Text>
        </Button>
        <Button>
          <PlusIcon size={14} className="stroke-1 text-primary-foreground" />
          <Text>Create my recipe</Text>
        </Button>
      </View>
    </SafeView>
  );
};
