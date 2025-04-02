import { router } from 'expo-router';
import React from 'react';
import { Pressable, View } from 'react-native';

import { SafeView } from '@/components/blocks';
import { BottomSheet, useBottomSheet } from '@/components/bottom-sheet';
import { AuthorIcon, CommentIcon, StarIcon, TimerIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { Recipe } from '@/db/schema';

type RecipeCardProps = {
  recipe: Recipe;
};

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const { ref, open, close } = useBottomSheet();
  return (
    <View className="h-[153px] w-full flex-row justify-between gap-1">
      <BottomSheet
        ref={ref}
        title={recipe.name}
        description={`Details of the recipe N°${recipe.id}`}>
        <RecipeSheet close={close} recipe={recipe} />
      </BottomSheet>
      <Pressable onLongPress={() => open()} className="h-[153px] w-1/2">
        <Image source={recipe.uri} contentFit="cover" className="h-full w-full rounded-xl" />
      </Pressable>
      <View className="h-[153px] w-1/2 justify-between px-2">
        <View>
          <Text size="md">{recipe.name}</Text>
          <Text size="xs" className="text-muted-foreground">
            {recipe.description}
          </Text>
          <View className="mt-2 flex flex-row gap-3">
            <View className="flex-row items-center gap-1">
              <TimerIcon className="stroke-1 text-foreground" size={12} />
              <Text size="sm" font="roboto">
                {recipe.duration}
              </Text>
            </View>
            <View className="flex-row items-center gap-1">
              <StarIcon className="stroke-1 text-foreground" size={12} />
              <Text size="sm" font="roboto">
                {recipe.rate}
              </Text>
            </View>
          </View>
        </View>
        <View className="mt-2 flex flex-row gap-2">
          <Button size="sm" variant="outline">
            <StarIcon className="stroke-1 text-foreground" size={14} />
          </Button>
          <Button
            onPress={() =>
              router.push({ pathname: '(tabs)/recipes/[id]', params: { id: recipe.id } })
            }
            className="flex-1"
            size="sm">
            <Text>Cook Now</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export const RecipeSheet = ({ recipe, close }: RecipeCardProps & { close: () => void }) => {
  return (
    <SafeView className="flex-1 gap-4">
      <View className="h-[253px] w-full flex-row justify-between gap-1">
        <Image source={recipe.uri} contentFit="cover" className="h-full w-full rounded-xl" />
      </View>
      <Text size="lg" className="text-muted-foreground">
        {recipe.description}
      </Text>

      <View className="">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <AuthorIcon className="stroke-1 text-foreground" size={20} />
            <Text size="lg">by unknown</Text>
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
            {recipe.duration} minutes
          </Text>
        </View>
        <View className="flex-row items-center justify-between gap-2">
          <StarIcon className="stroke-1 text-primary" size={20} />
          <Text font="roboto" size="lg" className="lg text-muted-foreground">
            {recipe.rate} stars
          </Text>
        </View>
        <View className="flex-row items-center justify-between gap-2">
          <CommentIcon className="stroke-1 text-primary" size={20} />
          <Text font="roboto" size="lg" className="lg text-muted-foreground">
            {0} comments
          </Text>
        </View>
      </View>
      <Button
        onPress={() => {
          close();
          router.push({ pathname: '(tabs)/recipes/[id]', params: { id: recipe.id } });
        }}
        className="mt-2 w-full">
        <Text>Cook Now</Text>
      </Button>
      <Button
        variant="secondary"
        onPress={() => {
          close();
          router.push({ pathname: '(tabs)/recipes/[id]/edit', params: { id: recipe.id } });
        }}
        className="mt-2 w-full">
        <Text>Edit</Text>
      </Button>
    </SafeView>
  );
};
