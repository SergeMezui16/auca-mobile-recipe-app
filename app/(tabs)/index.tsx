import { ScrollView, View } from 'react-native';
import { Text } from '@/components/ui/text';
import { SafeView } from '@/components/blocks';
import { Button } from '@/components/ui/button';

import React from 'react';
import { ArrowRightIcon, PlusIcon, ShuffleIcon, StarIcon, TimerIcon } from '@/components/icons';
import { Image } from '@/components/ui/image';
import { FlashList } from '@shopify/flash-list';

export default function App() {
  return (
    <ScrollView className="">
      <Welcome />
      <RecipeList />
    </ScrollView>
  );
}

export const RecipeList = () => {
  return (
    <SafeView className="gap-4">
      <View className="flex flex-row items-center justify-between">
        <Text size="lg">Recipes</Text>
        <ArrowRightIcon className="stroke-1 text-foreground" />
      </View>
      <FlashList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        ItemSeparatorComponent={() => (
          <View className="h-6" /> // This creates a 16px vertical gap between items
        )}
        renderItem={({ item }) => (
          <View className="h-[153px] w-full flex-row justify-between gap-1">
            <View className="h-[153px] w-1/2">
              <Image
                source="https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2023/12/Shakshuka-main-1.jpg"
                contentFit="cover"
                className="h-full w-full rounded-xl"
              />
            </View>
            <View className="h-[153px] w-1/2 justify-between px-2">
              <View>
                <Text size="md">Recipe #{item}</Text>
                <Text size="xs" className="text-muted-foreground">
                  Recipe description done with some ingredient, the recipe is easy to do but you
                  might..
                </Text>
                <View className="mt-2 flex flex-row gap-3">
                  <View className="flex-row items-center gap-1">
                    <TimerIcon className="stroke-1 text-foreground" size={12} />
                    <Text size="sm" font="roboto">
                      20
                    </Text>
                  </View>
                  <View className="flex-row items-center gap-1">
                    <StarIcon className="stroke-1 text-foreground" size={12} />
                    <Text size="sm" font="roboto">
                      5
                    </Text>
                  </View>
                </View>
              </View>
              <View className="mt-2 flex flex-row gap-2">
                <Button size="sm" variant="outline">
                  <StarIcon className="stroke-1 text-foreground" size={14} />
                </Button>
                <Button className="flex-1" size="sm">
                  <Text>Cook Now</Text>
                </Button>
              </View>
            </View>
          </View>
        )}
        estimatedItemSize={153}
      />
    </SafeView>
  );
};

export const Welcome = () => {
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
