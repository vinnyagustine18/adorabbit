import { StyleSheet } from "react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/themed";
import useGetCurrentLocation from "../../hooks/use-get-current-location";
import MapView, { Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

export default function TabOneScreen() {
  const { location } = useGetCurrentLocation();

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
        }}
        query={{
          key: "AIzaSyCEjmASHmwsueyVcBTftVvErllIA2sllNg",
          language: "id",
        }}
        styles={{
          textInputContainer: {
            width: "100%",
            borderColor: "black",
            borderWidth: 0.5,
          },
        }}
      />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.4226711,
          longitude: -122.0849872,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        provider="google"
        onRegionChange={(region, detail) => {
          console.log(region, detail);
        }}
      >
        <Marker
          draggable
          onDrag={(event) => {
            console.log(event.nativeEvent.coordinate);
          }}
          coordinate={{
            latitude: location?.coords?.latitude ?? 37.4226711,
            longitude: location?.coords?.longitude ?? -122.0849872,
          }}
          title="Your Location"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "95%",
  },
});
