import * as Contacts from 'expo-contacts';
import { useEffect, useState } from 'react';

/**
 * A custom React hook for fetching and managing a list of contacts from the user's device.
 *
 * This hook requests the user's permission to access contacts on their device.
 * If permissions are granted, it retrieves the contacts, including their email fields,
 * and stores them in a state variable. The hook returns the list of contacts for
 * further usage within the React component.
 *
 * @returns {Array<Contacts.Contact>} An array of contact objects retrieved from the device.
 */
export const useContacts = (): Contacts.Contact[] => {
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [
            Contacts.Fields.Emails,
            Contacts.Fields.PhoneNumbers,
            Contacts.Fields.Image,
            Contacts.Fields.Name,
            Contacts.Fields.Nickname,
            Contacts.Fields.Birthday,
            Contacts.Fields.JobTitle,
          ],
        });

        if (data.length > 0) {
          setContacts(data);
        }
      }
    })();
  }, []);

  return contacts;
};
