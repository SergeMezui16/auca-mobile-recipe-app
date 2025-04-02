import { FlashList } from '@shopify/flash-list';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { router, useLocalSearchParams } from 'expo-router';
import { TimerIcon } from 'lucide-react-native';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';

import { SafeView } from '@/components/blocks';
import { BottomSheet, useBottomSheet } from '@/components/bottom-sheet';
import { AuthorIcon, CommentIcon, StarIcon } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Image } from '@/components/ui/image';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Text } from '@/components/ui/text';
import { Textarea } from '@/components/ui/textarea';
import { useRecipe } from '@/hooks/use-recipe';

export default function Recipe() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getRecipeById } = useRecipe();
  const { data: recipe, error } = useLiveQuery(getRecipeById(Number(id)));

  if (error) {
    console.log(id);
    alert(error.message);
  }

  if (!recipe) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text size="lg">Loading...</Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView>
        <SafeAreaView className="mx-4 mt-4 gap-4">
          <View className=" flex-row">
            <Image source={recipe.uri} contentFit="cover" className="h-[199px] flex-1 rounded-xl" />
          </View>
          <View className="">
            <Text size="xl">{recipe.name}</Text>
            <Text size="md" className="text-muted-foreground">
              {recipe.description}
            </Text>
          </View>
          <View className="">
            <View className="flex-row items-center justify-end">
              <View className="flex-row items-center gap-2">
                <AuthorIcon className="stroke-1 text-foreground" size={20} />
                <Text size="lg">by Serge Mezui</Text>
              </View>
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
                {recipe.comments.length} comments
              </Text>
            </View>
          </View>
          <RecipeTabs />
        </SafeAreaView>
        <View className="h-[50px]" />
      </ScrollView>
      <BottomButtons id={id} />
    </>
  );
}

const BottomButtons = ({ id }: { id: string }) => {
  return (
    <>
      <View className="absolute bottom-2 right-3 w-full flex-1 flex-row justify-end gap-2">
        <AddComment />
      </View>
    </>
  );
};

export const AddComment = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { addComment } = useRecipe();
  const { ref, open, close } = useBottomSheet();
  const [comment, setComment] = useState<string>('');

  const handleSubmit = async () => {
    try {
      if (!comment) return;
      await addComment({ content: comment, recipeId: Number(id), author: 'Serge Mezui' });
      router.push({ pathname: '(drawer)/(tabs)/recipes/[id]', params: { id: Number(id) } });
      close();
    } catch (error) {
      alert('Error creating comment: ' + error);
    }
  };

  return (
    <View>
      <Button onPress={() => open()}>
        <CommentIcon className="stroke-1 text-primary-foreground" size={20} />
        <Text>Leave a comment</Text>
      </Button>
      <BottomSheet ref={ref} title="Add comment" description="Add a comment about this recipe.">
        <SafeView className="gap-4">
          <View className="w-full min-w-[300px]">
            <Label>
              <Text>Message</Text>
            </Label>
            <Textarea
              className="font-[rosarivo]"
              placeholderClassName="font-[rosarivo]"
              placeholder="Write your comment..."
              aria-labelledby="textareaLabel"
              defaultValue={comment}
              onChangeText={(v) => setComment(v)}
            />
          </View>
          <Button onPress={() => handleSubmit()}>
            <Text>Comment</Text>
          </Button>
        </SafeView>
      </BottomSheet>
    </View>
  );
};

export const AddRate = ({ id }: { id: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <StarIcon className="stroke-1 text-foreground" size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            <Text size="xl">Rate the recipe #{id}</Text>
          </DialogTitle>
          <DialogDescription>
            <Text size="sm">Add your rate between 1 to 5 to mark this recipe.</Text>
          </DialogDescription>
        </DialogHeader>
        <View className="w-full min-w-[300px]">
          <Label>
            <Text>Your rate</Text>
          </Label>
          <Input
            placeholderClassName="font-[rosarivo]"
            aria-labelledby="textareaLabel"
            keyboardType="number-pad"
          />
        </View>
        <DialogFooter>
          <DialogClose asChild>
            <Button>
              <Text>Rate</Text>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const RecipeTabs = () => {
  const [value, setValue] = useState('ingredients');
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getRecipeSteps, getRecipeIngredients, getRecipeComments } = useRecipe();
  const { data: ingredients } = useLiveQuery(getRecipeIngredients(Number(id)));
  const { data: steps } = useLiveQuery(getRecipeSteps(Number(id)));
  const { data: comments } = useLiveQuery(getRecipeComments(Number(id)));

  return (
    <Tabs
      value={value}
      onValueChange={setValue}
      className="mx-auto w-full max-w-[400px] flex-col gap-1.5">
      <TabsList className="w-full flex-row">
        <TabsTrigger value="ingredients" className="flex-1">
          <Text>Ingredients</Text>
        </TabsTrigger>
        <TabsTrigger value="steps" className="flex-1">
          <Text>Steps</Text>
        </TabsTrigger>
        <TabsTrigger value="comments" className="flex-1">
          <Text>Comments</Text>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="ingredients" className="min-h-[500px]">
        <FlashList
          data={ingredients}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View className="m-4 flex flex-row justify-between gap-2">
              <Text size="lg">
                {item.name} ({item.unit})
              </Text>
              <Text font="roboto">{item.quantity}</Text>
            </View>
          )}
          estimatedItemSize={3}
        />
      </TabsContent>
      <TabsContent value="steps" className="min-h-[500px]">
        <FlashList
          data={steps}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View className="mt-4 flex flex-row items-center gap-2">
              <View className="h-8 w-8 items-center justify-center rounded-full bg-secondary">
                <Text className="">{item.position}</Text>
              </View>
              <Text className="text-muted-foreground">{item.description}</Text>
            </View>
          )}
          estimatedItemSize={1}
        />
      </TabsContent>
      <TabsContent value="comments" className="min-h-[500px]">
        <FlashList
          data={comments}
          renderItem={({ item }) => (
            <View className="m-4 flex-row items-center gap-4">
              <Avatar alt="Zach Nugent's Avatar">
                <AvatarImage />
                <AvatarFallback>
                  <Text>{item.author[0]}</Text>
                </AvatarFallback>
              </Avatar>
              <View className="flex flex-col gap-1">
                <Text size="lg">{item.author}</Text>
                <Text className="text-muted-foreground">{item.content}</Text>
              </View>
            </View>
          )}
          estimatedItemSize={7}
        />
      </TabsContent>
    </Tabs>
  );
};
