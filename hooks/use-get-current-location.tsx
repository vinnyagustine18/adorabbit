import React from "react";
import * as Location from "expo-location";

export default function useGetCurrentLocation() {
  const [location, setLocation] =
    React.useState<Location.LocationObject | null>(null);
  React.useEffect(() => {
    const exec = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      console.log("test", status);

      switch (status) {
        case Location.PermissionStatus.DENIED:
          return;
      }
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    };
    location === null && exec();
  }, [location]);

  return { location };
}
