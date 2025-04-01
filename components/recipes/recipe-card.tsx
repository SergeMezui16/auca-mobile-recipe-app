import { router, useRouter } from 'expo-router';
import React from 'react';
import { Pressable, View } from 'react-native';

import { SafeView } from '@/components/blocks';
import { BottomSheet, useBottomSheet } from '@/components/bottom-sheet';
import { AuthorIcon, CommentIcon, StarIcon, TimerIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';

type RecipeCardProps = {
  id: number;
};

export const RecipeCard = ({ id }: RecipeCardProps) => {
  const router = useRouter();
  const { ref, open, close } = useBottomSheet();
  return (
    <View className="h-[153px] w-full flex-row justify-between gap-1">
      <BottomSheet ref={ref} title={`Recipe ${id}`} description="Details of the recipe">
        <RecipeSheet close={close} id={id} />
      </BottomSheet>
      <Pressable onLongPress={() => open()} className="h-[153px] w-1/2">
        <Image
          source="https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2023/12/Shakshuka-main-1.jpg"
          contentFit="cover"
          className="h-full w-full rounded-xl"
        />
      </Pressable>
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

export const RecipeSheet = ({ id, close }: RecipeCardProps & { close: () => void }) => {
  return (
    <SafeView className="flex-1 gap-4">
      <View className="h-[253px] w-full flex-row justify-between gap-1">
        <Image
          source="https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2023/12/Shakshuka-main-1.jpg"
          contentFit="cover"
          className="h-full w-full rounded-xl"
        />
      </View>
      <Text size="lg" className="text-muted-foreground">
        Recipe description done with some ingredient, the recipe is easy to do but you might have
        some cocking skills Recipe description done with some ingredient, the recipe is easy to do
        but you might have some cocking skills
      </Text>

      <View className="">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <AuthorIcon className="stroke-1 text-foreground" size={20} />
            <Text size="lg">by John Doe</Text>
          </View>
          <Button size="sm">
            <Text size="lg">Subscribe</Text>
          </Button>
        </View>
      </View>
      <View className="flex-row justify-between gap-4">
        <View className="flex-row items-center justify-between gap-2">
          <TimerIcon className="stroke-1 text-primary" size={20} />
          <Text font="roboto" size="lg" className="lg text-muted-foreground">
            5 minutes
          </Text>
        </View>
        <View className="flex-row items-center justify-between gap-2">
          <StarIcon className="stroke-1 text-primary" size={20} />
          <Text font="roboto" size="lg" className="lg text-muted-foreground">
            4 stars
          </Text>
        </View>
        <View className="flex-row items-center justify-between gap-2">
          <CommentIcon className="stroke-1 text-primary" size={20} />
          <Text font="roboto" size="lg" className="lg text-muted-foreground">
            3 comments
          </Text>
        </View>
      </View>
      <Button
        onPress={() => {
          close();
          router.push({ pathname: '(tabs)/recipes/[id]', params: { id } });
        }}
        className="mt-2 w-full">
        <Text>Cook Now</Text>
      </Button>
    </SafeView>
  );
};
