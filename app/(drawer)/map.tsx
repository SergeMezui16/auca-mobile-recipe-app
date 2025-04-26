import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import * as TaskManager from 'expo-task-manager';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import { useLocation } from '@/hooks/utils/use-location';

const GEOFENCING_TASK = 'GEOFENCING_TASK';

const REGIONS = [
  {
    identifier: 'Home',
    latitude: -1.9517107,
    longitude: 30.1042275,
    radius: 10, // in meters
    notifyOnEnter: true,
    notifyOnExit: true,
  },
];

// Define the geofencing task
TaskManager.defineTask(GEOFENCING_TASK, async ({ data, error }) => {
  if (error) {
    console.error('Geofencing error:', error);
    return;
  }

  if (data) {
    const { eventType, region } = data;
    let message = '';
    if (eventType === Location.GeofencingEventType.Enter) {
      message = `You have entered the region: ${region.identifier}`;
    } else if (eventType === Location.GeofencingEventType.Exit) {
      message = `You have exited the region: ${region.identifier}`;
    }

    // Send a notification
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Geofencing Alert',
        body: message,
      },
      trigger: null,
    });

    await fetch('https://test.sergemezui.dev/', {
      body: JSON.stringify({
        identifier: region.identifier,
        longitude: region.longitude,
        latitude: region.latitude,
        description: message,
        date: new Date().toISOString(),
      }),
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    });

    console.log(region);
  }
});

/*
{
  "identifier": "event123",
  "longitude": 12.3456,
  "latitude": 78.9012,
  "description": "Sample event description",
  "date": "2023-10-01T12:00:00+00:00"
}
 */

const INITIAL_REGION = {
  latitude: -1.940278,
  longitude: 30.051528,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const HOME_REGION = {
  title: 'Home',
  description: 'My house location',
  latitude: -1.9517107,
  longitude: 30.1042275,
};

export default function Map() {
  const { location } = useLocation();

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      const backgroundStatus = await Location.requestBackgroundPermissionsAsync();
      if (backgroundStatus.status !== 'granted') {
        console.error('Permission to access background location was denied');
        return;
      }

      await Location.startGeofencingAsync(GEOFENCING_TASK, [
        ...REGIONS,
        {
          identifier: 'Current Location',
          latitude: location?.coords.latitude,
          longitude: location?.coords.longitude,
          radius: 5,
          notifyOnEnter: true,
          notifyOnExit: true,
        },
      ]);
    })();

    return () => {
      Location.stopGeofencingAsync(GEOFENCING_TASK);
    };
  }, [location]);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_REGION}
        showsMyLocationButton
        showsUserLocation>
        <Marker
          key="home"
          coordinate={INITIAL_REGION}
          title={HOME_REGION.title}
          description={HOME_REGION.description}
        />
      </MapView>
    </View>
  );
}
