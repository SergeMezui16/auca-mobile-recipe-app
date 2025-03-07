import { SafeAreaView, ScrollView, View } from 'react-native';

import { RecipeList } from '@/components/recipes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';

export default function Search() {
  return (
    <View className="flex-1">
      <SafeAreaView className="m-2 flex-row gap-2">
        <Input
          placeholder="search a recipe..."
          id="search"
          className="flex-1 font-[rosarivo]"
          aria-labelledby="inputLabel"
          aria-errormessage="inputError"
        />
        <Button>
          <Text>Submit</Text>
        </Button>
      </SafeAreaView>
      <ScrollView className="m-2">
        <RecipeList />
      </ScrollView>
    </View>
  );
}
