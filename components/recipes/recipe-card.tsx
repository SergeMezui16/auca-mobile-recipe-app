import { useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { StarIcon, TimerIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';

type RecipeCardProps = {
  id: number;
};

export const RecipeCard = ({ id }: RecipeCardProps) => {
  const router = useRouter();
  return (
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
          <Text size="md">Recipe #{id}</Text>
          <Text size="xs" className="text-muted-foreground">
            Recipe description done with some ingredient, the recipe is easy to do but you might..
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
          <Button
            onPress={() => router.push({ pathname: '(tabs)/recipes/[id]', params: { id } })}
            className="flex-1"
            size="sm">
            <Text>Cook Now</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};
