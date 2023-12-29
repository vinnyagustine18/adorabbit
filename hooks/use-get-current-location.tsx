import React from 'react';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid } from 'react-native';
import Toast from '../components/toast';

export default function useGetCurrentLocation() {
  const [location, setLocation] =
    React.useState<Geolocation.GeoPosition | null>(null);
  React.useEffect(() => {
    const exec = async () => {
      const status = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (status === 'denied') return;

      Geolocation.getCurrentPosition(
        (location) => {
          console.log(location);
          setLocation(location);
        },
        (error) => {
          Toast.error(error.message);
        },
        {
          enableHighAccuracy: false,
          accuracy: {
            android: 'low',
            ios: 'reduced',
          },
        },
      );
    };

    location === null && exec();
  }, [location]);

  return { location };
}
