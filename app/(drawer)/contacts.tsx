import { FlashList } from '@shopify/flash-list';
import { Contact } from 'expo-contacts';
import React from 'react';
import { Linking, Pressable, View } from 'react-native';

import { SafeView } from '@/components/blocks';
import { PhoneCallIcon } from '@/components/icons/call';
import { Text } from '@/components/ui/text';
import { useContacts } from '@/hooks/utils/use-contacts';

export default function Contacts() {
  const contacts = useContacts();

  if (contacts.length === 0) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeView className="flex-1 gap-4">
      <View className="flex-row items-start justify-between">
        <Text size="2xl" className="pt-4">
          My Contacts ({contacts.length})
        </Text>
      </View>
      <View className="border-t border-border" />
      <FlashList
        estimatedItemSize={100}
        data={contacts.filter((c) => c.phoneNumbers?.[0])}
        renderItem={({ item }) => <ContactItem contact={item} />}
        ItemSeparatorComponent={() => <View className="h-6" />}
      />
    </SafeView>
  );
}

const ContactItem = ({ contact }: { contact: Contact }) => {
  return (
    <View className="flex-row justify-between rounded-lg bg-foreground/10">
      <View className="flex-1 p-4">
        <Text size="xl" className="">
          {contact.name}
        </Text>
        <Text className="text-muted-foreground">
          {contact.phoneNumbers?.map((e) => e.number).join(', ')}
        </Text>
      </View>
      <Pressable
        onPress={() => {
          if (contact.phoneNumbers?.[0]) {
            Linking.openURL(`tel:${contact.phoneNumbers[0].number}`);
          } else {
            alert('No phone number available');
            console.warn('No phone number available');
          }
        }}
        className="h-full w-24 items-center justify-center rounded-r-lg bg-primary p-4">
        <PhoneCallIcon className="text-primary-foreground" />
      </Pressable>
    </View>
  );
};
