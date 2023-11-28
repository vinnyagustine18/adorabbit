import React from "react";
import * as Location from "expo-location";
import Geolocation from "react-native-geolocation-service";
import { PermissionsAndroid } from "react-native";

export default function useGetCurrentLocation() {
  const [location, setLocation] =
    React.useState<Geolocation.GeoPosition | null>(null);
  React.useEffect(() => {
    const exec = async () => {
      const status = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Geolocation Permission",
          message: "Can we access your location?",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );

      // const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "denied") return;
      // switch (status) {
      //   case Location.PermissionStatus.DENIED:
      //     return;ackage
      // }
      // const { coords, timestamp, mocked } =
      //   await Location.getCurrentPositionAsync({
      //     accuracy: Location.Accuracy.Highest,
      //   });

      Geolocation.getCurrentPosition((location) => {
        setLocation(location);
      });
    };

    location === null && exec();
  }, [location, setLocation]);

  return { location };
}
