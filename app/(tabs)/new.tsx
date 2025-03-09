import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, View } from 'react-native';

import { SafeView } from '@/components/blocks';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { Textarea } from '@/components/ui/textarea';

export default function New() {
  return (
    <SafeView>
      <Text size="xl">Create your own recipe</Text>
      <View className="my-10 gap-4">
        <View className="w-full">
          <Label>
            <Text size="lg">Name</Text>
          </Label>
          <Input placeholderClassName="font-[rosarivo]" aria-labelledby="textareaLabel" />
        </View>
        <View className="w-full">
          <Label>
            <Text size="lg">Image</Text>
          </Label>
          <Input placeholderClassName="font-[rosarivo]" />
        </View>
        <View className="w-full">
          <Label>
            <Text size="lg">Description</Text>
          </Label>
          <Textarea
            placeholderClassName="font-[rosarivo]"
            className="font-[rosarivo]"
            placeholder="Write your comment..."
            aria-labelledby="textareaLabel"
          />
        </View>

        <ImagePickerExample />

        <Button
          onPress={() => router.replace({ pathname: '(tabs)/recipes/[id]', params: { id: 2 } })}
          className="w-full">
          <Text>Save</Text>
        </Button>
      </View>
    </SafeView>
  );
}

function ImagePickerExample() {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View className="flex-col gap-2">
      <Label>
        <Text size="lg">Image</Text>
      </Label>
      <Pressable
        onPress={pickImage}
        className="h-40 w-full items-center justify-center rounded-lg border border-dashed border-border">
        {image ? (
          <Image className="h-36 w-36 rounded-lg border border-border" source={{ uri: image }} />
        ) : (
          <Text>Pick an image</Text>
        )}
      </Pressable>
    </View>
  );
}
