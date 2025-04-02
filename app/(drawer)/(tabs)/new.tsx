import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';

import { SafeView } from '@/components/blocks';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { Textarea } from '@/components/ui/textarea';
import { useRecipe } from '@/hooks/use-recipe';

type RProps = {
  name: string;
  description: string;
  rate: number;
  uri: string | null;
  duration: number;
};

export default function New() {
  const { createRecipe } = useRecipe();
  const [recipe, setRecipe] = useState<RProps>({
    name: '',
    description: '',
    rate: 0,
    uri: null,
    duration: 0,
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [2, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setRecipe((prev) => ({ ...prev, uri: result.assets[0].uri }));
    }
  };

  const handleSubmit = async () => {
    try {
      if (!recipe.name || !recipe.description || !recipe.rate || !recipe.uri || !recipe.duration)
        throw new Error(
          'Please fill all the required fields. Name, Description, Rate, Image and Duration are required.'
        );

      const result = await createRecipe({
        name: recipe.name,
        description: recipe.description,
        rate: recipe.rate,
        uri: recipe.uri,
        duration: recipe.duration,
      });

      console.log(result);
      router.replace({ pathname: '(tabs)/recipes/[id]', params: { id: result[0].id } });
    } catch (error) {
      alert('Error creating recipe: ' + error);
    }
  };

  const handleChange = (key: keyof RProps, value: string | number) => {
    setRecipe((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <ScrollView>
      <SafeView>
        <Text size="xl">Create your own recipe</Text>

        <View className="my-10 gap-4">
          <View className="flex-col gap-2">
            <Pressable
              onPress={pickImage}
              className="h-48 w-full items-center justify-center rounded-lg border border-dashed border-border">
              {recipe.uri ? (
                <Image
                  className="h-48 w-full rounded-lg border border-border"
                  source={{ uri: recipe.uri }}
                />
              ) : (
                <Text>Pick an image</Text>
              )}
            </Pressable>
          </View>
          <View className="w-full">
            <Label>
              <Text size="lg">Name</Text>
            </Label>
            <Input
              onChangeText={(v) => handleChange('name', v)}
              placeholderClassName="font-[rosarivo]"
              aria-labelledby="textareaLabel"
            />
          </View>
          <View className="flex-row gap-4">
            <View className="flex-1">
              <Label>
                <Text size="lg">Rate</Text>
              </Label>
              <Input
                onChangeText={(v) => handleChange('rate', v)}
                placeholderClassName="font-[rosarivo]"
                keyboardType="numeric"
              />
            </View>
            <View className="flex-1">
              <Label>
                <Text size="lg">Duration</Text>
              </Label>
              <Input
                onChangeText={(v) => handleChange('duration', v)}
                placeholderClassName="font-[rosarivo]"
                keyboardType="numeric"
              />
            </View>
          </View>
          <View className="w-full">
            <Label>
              <Text size="lg">Description</Text>
            </Label>
            <Textarea
              onChangeText={(v) => handleChange('description', v)}
              placeholderClassName="font-[rosarivo]"
              className="font-[rosarivo]"
              placeholder="your recipe description"
              aria-labelledby="textareaLabel"
            />
          </View>

          <Button onPress={() => handleSubmit()} className="w-full">
            <Text>Save</Text>
          </Button>
        </View>
      </SafeView>
    </ScrollView>
  );
}
