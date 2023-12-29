import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GooglePlacesAutocompleteRef } from 'react-native-google-places-autocomplete';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import Toast from './toast';
import { Region } from './address-component';

interface Props {
  region: Region;
  setRegion: (value: Region) => void;
  setPredefinedPlaces: (value: any[]) => void;
  textInputRef?: React.MutableRefObject<GooglePlacesAutocompleteRef | null>;
  isDraggable?: boolean;
}

const API_KEY = 'AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao';

const Map = (props: Props) => {
  const {
    region,
    setPredefinedPlaces,
    textInputRef,
    isDraggable = true,
  } = props;

  // const reverseGeocode = (lat: number, lng: number) => {
  //   Geocoder.from(lat, lng)
  //     .then(json => {
  //       // console.log('JSON', json);
  //       var addressComponent = json.results[0].address_components[0];
  //       console.log('ADDRESS', json?.results[0]);
  //     })
  //     .catch(error => console.warn(error));
  // };

  const reverseGeocode = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        // `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude}%2C${longitude}&location_type=ROOFTOP&key=${Config.googleApiKey}`,
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude}%2C${longitude}&location_type=ROOFTOP%7CRANGE_INTERPOLATED%7CGEOMETRIC_CENTER&key=${API_KEY}`,
        // `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude}%2C${longitude}&rankby=distance&type=establishment&key=${Config.googleApiKey}`,
      );

      const data = await response.json();

      // Filter plus code workaround
      setPredefinedPlaces(
        data.results
          .filter(
            (result) =>
              !result?.address_components?.[0]?.types?.includes('plus_code'),
          )
          .map((result) => ({
            description: result.formatted_address,
            geometry: result.geometry,
            name: result.formatted_address,
          })),
      );

      return data;
    } catch (error: any) {
      error?.message && Toast.error(error?.message);
    }
  };

  console.log(region);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        style={styles.map}
        region={region}
        mapPadding={{
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
        // onRegionChange={region => {
        //   // console.log('ON REGION CHANGE', region);
        //   // setRegion(region);
        // }}
        // onRegionChangeComplete={region => {
        //   console.log('ON REGION CHANGE COMPLETE', region);
        // }}
        //TODO: check for android
        // mapType="mutedStandard"
      >
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
          draggable={isDraggable}
          onDragStart={(e) => {
            textInputRef?.current?.blur();
            // console.log('dragStart', e.nativeEvent.coordinate);
          }}
          onDragEnd={(e) => {
            reverseGeocode(
              e.nativeEvent.coordinate.latitude,
              e.nativeEvent.coordinate.longitude,
            );
            // console.log('dragEnd', e.nativeEvent.coordinate);
            setTimeout(() => {
              textInputRef?.current?.focus();
            }, 100);
          }}
        />
      </MapView>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
  },
});
