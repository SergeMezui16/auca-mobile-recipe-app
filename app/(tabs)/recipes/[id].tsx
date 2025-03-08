import { FlashList } from '@shopify/flash-list';
import { useLocalSearchParams } from 'expo-router';
import { TimerIcon } from 'lucide-react-native';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';

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

export default function Recipe() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <>
      <ScrollView>
        <SafeAreaView className="mx-4 mt-4 gap-4">
          <View className=" flex-row">
            <Image
              source="https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2023/12/Shakshuka-main-1.jpg"
              contentFit="cover"
              className="h-[199px] flex-1 rounded-xl"
            />
          </View>
          <View className="">
            <Text size="2xl">Recipe #{id}</Text>
            <Text size="md" className="text-muted-foreground">
              Recipe description done with some ingredient, the recipe is easy to do but you might
              have some cocking skills Recipe description done with some ingredient, the recipe is
              easy to do but you might have some cocking skills
            </Text>
          </View>
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
        <AddRate id={id} />
      </View>
    </>
  );
};

export const AddComment = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <CommentIcon className="stroke-1 text-primary-foreground" size={20} />
          <Text>Leave a comment</Text>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            <Text size="xl">Add your comment</Text>
          </DialogTitle>
          <DialogDescription>
            <Text size="sm">Add a comment about this recipe.</Text>
          </DialogDescription>
        </DialogHeader>
        <View className="w-full min-w-[300px]">
          <Label>
            <Text>Message</Text>
          </Label>
          <Textarea placeholder="Write your comment..." aria-labelledby="textareaLabel" />
        </View>
        <DialogFooter>
          <DialogClose asChild>
            <Button>
              <Text>Comment</Text>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
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

      <TabsContent value="ingredients">
        <FlashList
          data={[1, 2, 3, 4, 5, 6, 7]}
          renderItem={({ item }) => (
            <View className="m-4 flex flex-row justify-between gap-2">
              <Text size="lg">Ingredients #{item}</Text>
              <Text font="roboto">{Math.ceil(Math.random() * 20)}</Text>
            </View>
          )}
          estimatedItemSize={7}
        />
      </TabsContent>
      <TabsContent value="steps">
        <FlashList
          data={[1, 2, 3, 4, 5]}
          renderItem={() => (
            <View className="m-4 flex gap-1">
              <Text size="lg">John Doe</Text>
              <Text className="text-muted-foreground">
                Step content, do whatever you want, just do something good and tasty to eat....
              </Text>
            </View>
          )}
          estimatedItemSize={7}
        />
      </TabsContent>
      <TabsContent value="comments">
        <FlashList
          data={[1, 2, 3, 4, 5]}
          renderItem={({ item }) => (
            <View className="m-4 flex-row items-center gap-4">
              <Avatar alt="Zach Nugent's Avatar">
                <AvatarImage
                  source={{
                    uri: 'https://frequencefemme-back.ovh/wp-content/uploads/2023/01/linkedin-sales-solutions-kkjj-K22M-unsplash-5.png',
                  }}
                />
                <AvatarFallback>
                  <Text>JD</Text>
                </AvatarFallback>
              </Avatar>
              <View className="flex flex-col gap-1">
                <Text size="lg">Step #{item}</Text>
                <Text className="text-muted-foreground">
                  Comment content, this recipe is so delicious...
                </Text>
              </View>
            </View>
          )}
          estimatedItemSize={7}
        />
      </TabsContent>
    </Tabs>
  );
};
