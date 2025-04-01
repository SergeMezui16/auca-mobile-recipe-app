import { FlashList } from '@shopify/flash-list';
import { Contact } from 'expo-contacts';
import React from 'react';
import { Linking, Pressable, View } from 'react-native';

import { SafeView } from '@/components/blocks';
import { BottomSheet, useBottomSheet } from '@/components/bottom-sheet';
import { PhoneCallIcon } from '@/components/icons/call';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { useContacts } from '@/hooks/utils/use-contacts';

const call = (contact: Contact) => {
  if (contact.phoneNumbers?.[0]) {
    Linking.openURL(`tel:${contact.phoneNumbers[0].number}`);
  } else {
    alert('No phone number available');
    console.warn('No phone number available');
  }
};

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
  const { ref, open } = useBottomSheet();

  return (
    <Pressable
      onLongPress={() => open()}
      className="flex-row justify-between rounded-lg bg-foreground/10">
      <BottomSheet ref={ref} title={contact.name} description="Details of the contact">
        <SafeView className="gap-4">
          {contact.image && (
            <View className="items-center justify-center">
              <Image source={contact.image} contentFit="cover" className="h-36 w-36 rounded-full" />
            </View>
          )}
          <Info name="ID" value={contact.id} />
          <Info name="Name" value={contact.name} />
          <Info name="Phones" value={contact.phoneNumbers?.map((e) => e.number).join(', ')} />
          <Info
            name="Birthday"
            value={contact.birthday && contact.birthday?.day + '/' + (contact.birthday?.month + 1)}
          />
          <Info name="Emails" value={contact.emails?.map((e) => e.email).join(', ')} />
          <Info name="Company" value={contact.company} />
          <Info name="Job" value={contact.jobTitle} />
          <Button
            onPress={() => {
              call(contact);
            }}
            className="w-full">
            <PhoneCallIcon className="text-primary-foreground" />
          </Button>
        </SafeView>
      </BottomSheet>
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
          call(contact);
        }}
        className="h-full w-24 items-center justify-center rounded-r-lg bg-primary p-4">
        <PhoneCallIcon className="text-primary-foreground" />
      </Pressable>
    </Pressable>
  );
};

export const Info = ({ name, value }: { name: string; value?: string }) => {
  return (
    <View className="gap-2">
      <Text className="text-muted-foreground">{name}</Text>
      {value ? <Text size="lg">{value}</Text> : <Text size="lg">N/A</Text>}
    </View>
  );
};
