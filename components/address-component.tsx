import { StyleSheet } from "react-native";

import MapView, { Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import React from "react";
import { add, debounce } from "lodash";
import useGetCurrentLocation from "../hooks/use-get-current-location";
import { View } from "./themed";

interface Props {
  onChange?: (values: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
    address: string;
  }) => void;
  value?: {
    latitude: number;
    longitude: number;
    address: string;
  };
}

export default function AddressComponent(props: Props) {
  const { location } = useGetCurrentLocation();

  const [region, setRegion] = React.useState({
    latitude: props.value?.latitude ?? location?.coords?.latitude ?? 37.4226711,
    longitude:
      props.value?.longitude ?? location?.coords?.longitude ?? -122.0849872,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });
  const [isBuffer, setIsBuffer] = React.useState(false);
  const [address, setAddress] = React.useState(props.value?.address ?? "");

  const onGenerateAddress = React.useCallback(
    async ({
      latitude,
      longitude,
    }: {
      latitude: number;
      longitude: number;
    }) => {
      try {
        const request = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude}%2C${longitude}&location_type=ROOFTOP%7CRANGE_INTERPOLATED%7CGEOMETRIC_CENTER&key=${"AIzaSyCEjmASHmwsueyVcBTftVvErllIA2sllNg"}`
        );

        const response = await request.json();

        const address = response?.results?.[0]?.formatted_address;
        setAddress(address);
      } catch (e) {
        console.log(e);
      }
    },
    [setAddress]
  );

  React.useEffect(() => {
    props.onChange?.({
      ...region,
      address,
    });
  }, [region, address]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider="google"
        initialRegion={region}
        onRegionChange={(region, detail) => {
          setRegion((prev) => ({
            ...prev,
            latitude: region.latitude,
            longitude: region.longitude,
          }));
        }}
        onRegionChangeComplete={(region) => {
          onGenerateAddress({
            latitude: region.latitude,
            longitude: region.longitude,
          });
        }}
        {...(isBuffer ? { region } : { initialRegion: region })}
      >
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
          title={address}
        />
      </MapView>
      <View
        style={{
          backgroundColor: "rgba(0,0,0,0)",
          position: "absolute",
          top: 16,
          left: 5,
          right: 5,
        }}
      >
        <GooglePlacesAutocomplete
          currentLocationLabel={address}
          placeholder={"Search"}
          fetchDetails={true}
          GooglePlacesDetailsQuery={{ fields: "geometry" }}
          onPress={(data, details = null) => {
            const { lat, lng } = details!.geometry.location;
            setRegion((prev) => ({ ...prev, latitude: lat, longitude: lng }));
            onGenerateAddress({ latitude: lat, longitude: lng });
            setIsBuffer(true);

            debounce(() => setIsBuffer(false), 200)();
          }}
          query={{
            key: "AIzaSyCEjmASHmwsueyVcBTftVvErllIA2sllNg",
            language: "id",
          }}
          styles={{
            textInputContainer: {
              width: "100%",
              backgroundColor: "rgba(0,0,0,0)",
              borderTopWidth: 0,
              borderBottomWidth: 0,
            },
            textInput: {
              marginLeft: 0,
              marginRight: 0,
              height: 38,
              color: "#5d5d5d",
              fontSize: 16,
            },
            description: {
              fontWeight: "bold",
            },
            predefinedPlacesDescription: {
              color: "#1faadb",
            },
            listView: {
              backgroundColor: "rgba(255,255,255,1)",
            },
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  map: {
    width: "100%",
    flex: 1,
  },
});
