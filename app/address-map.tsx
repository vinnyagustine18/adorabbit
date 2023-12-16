import React from 'react';
import {
  Alert,
  PermissionsAndroid,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from 'react-native-google-places-autocomplete';

import * as Yup from 'yup';
import Map from '../components/map';
import { Button } from 'react-native-paper';
import { router } from 'expo-router';
import Container from '../components/container';
import LoadingViewOverlay from '../components/loading-view-overlay';
import Toast from '../components/toast';
import useStateIfMounted from '../hooks/use-state-if-mounted';
import useGetCurrentLocation from '../hooks/use-get-current-location';
import sizeConstant from '../constants/size.constant';
import colorConstant from '../constants/color.constant';

export interface AddressMapFormType {
  label?: string;
}

export interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
  coordinates?: {
    latitude: number;
    longitude: number;
  }[];
}

interface Props {}

navigator.geolocation = require('react-native-geolocation-service');

export default function AddressMapScreen(props: Props) {
  const { location } = useGetCurrentLocation();

  const ref = React.useRef<GooglePlacesAutocompleteRef>(null);

  const [address, setAddress] = useStateIfMounted<{
    name: string;
    vicinity: string;
  }>({ name: '', vicinity: '' });
  const [firstInit, setFirstInit] = useStateIfMounted(true);
  const [loadingNearbyPlace, setLoadingNearbyPlace] = useStateIfMounted(false);
  const [predefinedPlaces, setPredefinedPlaces] = useStateIfMounted<any[]>([]);
  // const [isShowListView, setIsShowListView] = useStateIfMounted(false);

  const [region, setRegion] = useStateIfMounted<Region>({
    latitude: location?.coords.latitude ?? -6.121435,
    longitude: location?.coords.longitude ?? 106.774124,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
    // latitudeDelta: 0.0922,
    // longitudeDelta: 0.0421,
  });

  const initialValues = React.useMemo(() => {
    return {};
  }, []);

  const YupSchema = React.useMemo(
    () =>
      Yup.object().shape({
        label: Yup.string().nullable(),
      }),
    [],
  );

  // const formik = useFormik<AddressMapFormType>({
  //   initialValues,
  //   validateOnMount: true,
  //   validationSchema: YupSchema,
  //   onSubmit: async (values, { setSubmitting }) => {
  //     try {
  //     } catch (e: any) {
  //       e.message && Toast.error(e.message);
  //     } finally {
  //       setSubmitting(false);
  //     }
  //   },
  // });

  const searchNearbyPlaces = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude}%2C${longitude}&rankby=distance&type=establishment&key=AIzaSyCEjmASHmwsueyVcBTftVvErllIA2sllNg`,
      );
      const data = await response.json();
      return data;
    } catch (error: any) {
      error?.message && Toast.error(error?.message);
    }
  };

  React.useEffect(() => {
    const exec = async () => {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === 'granted') {
        Geolocation.getCurrentPosition(
          async (position) => {
            setRegion({
              ...region,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });

            setLoadingNearbyPlace(true);

            const nearbyPlaces = await searchNearbyPlaces(
              position.coords.latitude,
              position.coords.longitude,
            );
            const usedNearby = nearbyPlaces?.results?.[0];
            if (usedNearby) {
              setRegion({
                ...region,
                latitude: usedNearby.geometry.location.lat,
                longitude: usedNearby.geometry.location.lng,
              });
              setAddress({
                name: usedNearby?.name,
                vicinity: usedNearby?.vicinity,
              });
            }
            setLoadingNearbyPlace(false);
          },
          (error) => {
            Alert.alert(error.message.toString());
          },
          {
            showLocationDialog: true,
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 0,
          },
        );
      }
    };
    exec();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    const currentText = ref?.current?.getAddressText();
    if (!currentText && address?.name && firstInit) {
      ref?.current?.setAddressText(address?.name);
      setFirstInit(false);
    }
  }, [address?.name, firstInit, setFirstInit]);

  return (
    <Container>
      <GooglePlacesAutocomplete
        ref={ref}
        placeholder="Search"
        onPress={(data, details: any = null) => {
          // 'details' is provided when fetchDetails = true
          if (details) {
            setRegion({
              ...region,
              latitude: details?.geometry.location.lat,
              longitude: details?.geometry.location.lng,
            });
            setAddress({
              name: details.name,
              vicinity: details.vicinity,
            });
          }
        }}
        debounce={1000}
        styles={{
          container: {
            position: 'absolute',
            zIndex: 1,
            width: '100%',
            padding: 16,
            backgroundColor: colorConstant.white,
          },
          // textInputContainer: {
          //   // height: '100%',
          //   height: sizeConstant.inputHeight,
          //   borderRadius: 10,
          //   backgroundColor: colorConstant.primary,
          //   // position: 'relative',
          //   // alignItems: 'center',
          //   borderColor: colorConstant.platinum,
          //   borderWidth: 2,
          // },
          textInput: {
            borderRadius: 10,
            height: sizeConstant.inputHeight,
            borderColor: colorConstant.platinum,
            borderWidth: 1,
          },
          listView: {
            maxHeight: 300,
            flexGrow: 1,
            position: 'relative',
          },
          row: {
            paddingHorizontal: 0,
          },
        }}
        renderRow={(data, index) => {
          return (
            <View key={data.id} style={styles.resultRow}>
              <View style={styles.innerResultRow}>
                {data?.structured_formatting ? (
                  <>
                    <Text>{data.structured_formatting.main_text}</Text>
                    <Text>{data.structured_formatting.secondary_text}</Text>
                  </>
                ) : (data as any)?.name ? (
                  <>
                    <Text>{(data as any)?.name}</Text>
                    {!!(data as any)?.vicinity && (
                      <Text>{(data as any)?.vicinity}</Text>
                    )}
                  </>
                ) : (
                  <Text>{data.description}</Text>
                )}
              </View>
            </View>
          );
        }}
        minLength={2}
        query={{
          key: 'AIzaSyCEjmASHmwsueyVcBTftVvErllIA2sllNg',
          language: 'id',
          components: 'country:id',
          type: 'establishment',
        }}
        fetchDetails
        GooglePlacesSearchQuery={{
          rankby: 'distance',
        }}
        // listViewDisplayed={true}
        textInputProps={
          {
            // onFocus: () => setIsShowListView(true),
            // onBlur: () => setIsShowListView(false),
            // clearButtonMode: 'always',
            // InputComp: TextInput,
            // defaultValue: address?.name,
            // value: address?.name,
            // leftIcon: {type: 'font-awesome', name: 'chevron-left'},
            // errorStyle: {color: 'red'},
          }
        }
        currentLocation={true}
        currentLocationLabel="Current location"
        enableHighAccuracyLocation
        enablePoweredByContainer={false}
        // nearbyPlacesAPI="GoogleReverseGeocoding"
        predefinedPlaces={predefinedPlaces}
      />
      <Map
        region={region}
        setRegion={setRegion}
        setPredefinedPlaces={setPredefinedPlaces}
        textInputRef={ref}
      />
      <View style={styles.footer}>
        <Button
          onPress={() => {
            console.log({
              longitude: region.longitude,
              latitude: region.latitude,
              address: address
                ? `${address?.name ?? ''}${
                    address?.vicinity ? ', ' + address.vicinity : ''
                  }`
                : '',
            });
            router.back();
          }}
        >
          Confirm Location
        </Button>
      </View>
      <LoadingViewOverlay isLoading={loadingNearbyPlace} />
    </Container>
  );
}

const styles = StyleSheet.create({
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  innerResultRow: {
    marginLeft: 15,
  },
  footer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    padding: sizeConstant.contentPad,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: colorConstant.white,
  },

  textInputContainer: {
    height: sizeConstant.inputHeight,
    borderRadius: 10,
  },
  textInput: {
    color: colorConstant.black,
  },
  searchBarContainer: {
    display: 'flex',
    flexGrow: 1,
    height: sizeConstant.inputHeight,
  },
  bottomContainer: {
    paddingHorizontal: sizeConstant.contentPad,
    display: 'flex',
    marginBottom: 8,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
  },
});