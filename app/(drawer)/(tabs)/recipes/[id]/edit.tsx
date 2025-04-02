import { FlashList } from '@shopify/flash-list';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import * as ImagePicker from 'expo-image-picker';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';

import { SafeView } from '@/components/blocks';
import { BottomSheet, useBottomSheet } from '@/components/bottom-sheet';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Text } from '@/components/ui/text';
import { Textarea } from '@/components/ui/textarea';
import { useRecipe } from '@/hooks/use-recipe';

export default function EditRecipe() {
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
        <SafeView className="gap-4">
          <Text className="pt-1 text-4xl">Finalize editing your recipe</Text>
          <View className="flex-row gap-4">
            <UpdateRecipe />
            <AddIngredient />
            <AddStep />
          </View>
          <RecipeTabs />
        </SafeView>
        <View className="h-[50px]" />
      </ScrollView>
      {recipe.published === false && <BottomButtons id={id} />}
    </>
  );
}
const BottomButtons = ({ id }: { id: string }) => {
  const { publishRecipe } = useRecipe();
  const handlePublish = async () => {
    try {
      await publishRecipe(Number(id));
      router.push({ pathname: '(tabs)/recipes/[id]', params: { id: Number(id) } });
    } catch (error) {
      alert('Error creating recipe: ' + error);
    }
  };

  return (
    <>
      <View className="absolute bottom-2 right-3 w-full flex-1 flex-row justify-end gap-2">
        <Button onPress={() => handlePublish()}>
          <Text>Publish</Text>
        </Button>
      </View>
    </>
  );
};

type Form = {
  name: string;
  description: string;
  uri: string;
  rate: number;
  duration: number;
};

const UpdateRecipe = () => {
  const { ref, open, close } = useBottomSheet();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getRecipeById, updateRecipe } = useRecipe();
  const { data: recipe, error } = useLiveQuery(getRecipeById(Number(id)));
  const [updatedRecipe, setUpdatedRecipe] = useState<Form>({
    name: recipe?.name || '',
    description: recipe?.description || '',
    uri: recipe?.uri || '',
    rate: recipe?.rate || 0,
    duration: recipe?.duration || 0,
  });

  useEffect(() => {
    setUpdatedRecipe({
      name: recipe?.name || '',
      description: recipe?.description || '',
      uri: recipe?.uri || '',
      rate: recipe?.rate || 0,
      duration: recipe?.duration || 0,
    });
  }, [recipe]);

  if (error) {
    console.log(id);
    alert(error.message);
  }

  const handleSubmit = async () => {
    try {
      if (!recipe) return;
      await updateRecipe(recipe.id, updatedRecipe);
      close();
    } catch (error) {
      alert('Error creating recipe: ' + error);
    }
  };
  const handleChange = (key: keyof Form, value: string | number) => {
    setUpdatedRecipe((prev) => ({ ...prev, [key]: value }));
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [2, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setUpdatedRecipe((prev) => ({ ...prev, uri: result.assets[0].uri }));
    }
  };

  return (
    <View>
      <Button onPress={() => open()} variant="secondary">
        <Text>Edit</Text>
      </Button>
      <BottomSheet ref={ref} title="Edit recipe" description="Fill the form to update the recipe">
        <SafeView className="gap-4">
          <View className="flex-col gap-2">
            <Pressable
              onPress={pickImage}
              className="h-48 w-full items-center justify-center rounded-lg border border-dashed border-border">
              {updatedRecipe.uri ? (
                <Image
                  className="h-48 w-full rounded-lg border border-border"
                  source={{ uri: updatedRecipe.uri }}
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
              defaultValue={updatedRecipe.name}
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
                defaultValue={updatedRecipe.rate.toString()}
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
                defaultValue={updatedRecipe.duration.toString()}
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
              defaultValue={updatedRecipe.description}
            />
          </View>

          <Button onPress={() => handleSubmit()} className="w-full">
            <Text>Save</Text>
          </Button>
        </SafeView>
      </BottomSheet>
    </View>
  );
};

type IngredientForm = {
  name: string;
  quantity: number;
  unit: string;
};
const AddIngredient = () => {
  const { ref, open, close } = useBottomSheet();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { addIngredient } = useRecipe();
  const [ingredient, setIngredient] = useState<IngredientForm>({
    name: '',
    quantity: 1,
    unit: 'cup',
  });

  const handleSubmit = async () => {
    try {
      await addIngredient({
        ...ingredient,
        recipeId: Number(id),
      });
      close();
      router.push({ pathname: '(tabs)/recipes/[id]/edit', params: { id: Number(id) } });
    } catch (error) {
      alert('Error creating recipe: ' + error);
    }
  };

  const handleChange = (key: keyof IngredientForm, value: string | number) => {
    setIngredient((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <View>
      <Button onPress={() => open()} variant="secondary">
        <Text>Add Ingredient</Text>
      </Button>
      <BottomSheet
        ref={ref}
        title="Add ingredient"
        description="Fill the form to add the ingredient">
        <SafeView className="gap-4">
          <View className="w-full">
            <Label>
              <Text size="lg">Ingredient</Text>
            </Label>
            <Input
              onChangeText={(v) => handleChange('name', v)}
              placeholderClassName="font-[rosarivo]"
              aria-labelledby="textareaLabel"
            />
          </View>
          <View className="w-full">
            <Label>
              <Text size="lg">Quantity</Text>
            </Label>
            <Input
              onChangeText={(v) => handleChange('quantity', v)}
              placeholderClassName="font-[rosarivo]"
              aria-labelledby="textareaLabel"
              keyboardType="numeric"
            />
          </View>
          <View className="w-full">
            <Label>
              <Text size="lg">Unit</Text>
            </Label>
            <Input
              onChangeText={(v) => handleChange('unit', v)}
              placeholderClassName="font-[rosarivo]"
              aria-labelledby="textareaLabel"
            />
          </View>

          <Button onPress={() => handleSubmit()} className="w-full">
            <Text>Save</Text>
          </Button>
        </SafeView>
      </BottomSheet>
    </View>
  );
};

type StepForm = {
  position: number;
  description: string;
};

const AddStep = () => {
  const { ref, open, close } = useBottomSheet();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { addStep } = useRecipe();
  const [step, setStep] = useState<StepForm>({
    position: 1,
    description: '',
  });

  const handleSubmit = async () => {
    try {
      await addStep({
        ...step,
        recipeId: Number(id),
      });
      close();
      router.push({ pathname: '(tabs)/recipes/[id]/edit', params: { id: Number(id) } });
    } catch (error) {
      alert('Error creating recipe: ' + error);
    }
  };

  const handleChange = (key: keyof StepForm, value: string | number) => {
    setStep((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <View>
      <Button onPress={() => open()} variant="secondary">
        <Text>Add Step</Text>
      </Button>
      <BottomSheet ref={ref} title="Add step" description="Fill the form to add a step">
        <SafeView className="gap-4">
          <View className="w-full">
            <Label>
              <Text size="lg">Position</Text>
            </Label>
            <Input
              onChangeText={(v) => handleChange('position', v)}
              placeholderClassName="font-[rosarivo]"
              aria-labelledby="textareaLabel"
              keyboardType="numeric"
              defaultValue={step.position.toString()}
            />
          </View>
          <View className="w-full">
            <Label>
              <Text size="lg">Instruction</Text>
            </Label>
            <Textarea
              className="font-[rosarivo]"
              placeholder="your step instructions"
              onChangeText={(v) => handleChange('description', v)}
              placeholderClassName="font-[rosarivo]"
              aria-labelledby="textareaLabel"
            />
          </View>

          <Button onPress={() => handleSubmit()} className="w-full">
            <Text>Save</Text>
          </Button>
        </SafeView>
      </BottomSheet>
    </View>
  );
};

const RecipeTabs = () => {
  const [value, setValue] = useState('ingredients');
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getRecipeSteps, getRecipeIngredients } = useRecipe();
  const { data: ingredients } = useLiveQuery(getRecipeIngredients(Number(id)));
  const { data: steps } = useLiveQuery(getRecipeSteps(Number(id)));

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
      </TabsList>

      <TabsContent value="ingredients" className="h-[500px]">
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
      <TabsContent value="steps" className="h-[500px]">
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
    </Tabs>
  );
};
