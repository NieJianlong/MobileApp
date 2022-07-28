import * as Location from "expo-location";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
  useWindowDimensions,
  Platform,
  AppState,
} from "react-native";
import Geocoder from "react-native-geocoding";
import RNGooglePlaces from "react-native-google-places-api";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import LocationPin from "../../assets/location-pin.png";
import { Button } from "../Components";
import { Modal, Portal } from "react-native-paper";
import { t } from "react-native-tailwindcss";
import { AlertContext } from "./Root/GlobalContext";
import AddLocationSheetContent from "./Explore/Components/AddLocationSheetContent";
import useMapScreen from "../hooks/useMapScreen";
import { ScaledSheet, vs } from "react-native-size-matters";
import colors from "../Themes/Colors";
import { request, PERMISSIONS, openSettings } from "react-native-permissions";
import useActionAlert from "../hooks/useActionAlert";
import useLoading from "../hooks/useLoading";

Geocoder.init("AIzaSyBfDTs1ejBI3MIVhrPeXgpvDNkTovWkIuU");

const MapScreen = (props) => {
  const mapRef = useRef();
  const [location, setLocation] = useState(null);
  const { dispatch } = useContext(AlertContext);
  const { setShowMap } = useMapScreen();
  const { setLoading } = useLoading();
  const [isTapable, setIsTapable] = useState(true);
  const [changeIsPressed, setChangeIsPressed] = useState(false);

  const { setAlert } = useActionAlert();

  const handPermission = () => {
    setAlert({
      visible: true,
      message:
        "Permission to access location was denied.Please enable it in settings.",
      color: colors.secondary00,
      title: "Settings permissions",
      onDismiss: () => {
        setShowMap({ mapVisible: false, stopPermission: true });
        dispatch({
          type: "changSheetState",
          payload: {
            showSheet: true,
            height: 600,
            children: () => (
              <AddLocationSheetContent
                {...location}
                locationDetails={location}
              />
            ),
            sheetTitle: "",
          },
        });
      },
      buttons: [
        {
          text: "Go to Settings",
          style: [t.w32, t.h8],
          onPress: () => {
            openSettings()
              .then(() => {
                handPermission2();
              })
              .catch(() => console.warn("cannot open settings"));
          },
        },
      ],
    });
  };
  const handPermission2 = () => {
    if (Platform.OS === "ios") {
      request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then((result) => {
        if (result !== "granted") {
          handPermission();
        } else {
          setAlert({ visible: false });
          handleCenter();
        }
      });
    }
    if (Platform.OS === "android") {
      request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((result) => {
        if (result !== "granted") {
          console.log("====================================");
          console.log("Permission not granted");
          console.log("====================================");
          handPermission();
        } else {
          console.log("====================================");
          console.log("Permissiongranted");
          console.log("====================================");
          setAlert({ visible: false });
          handleCenter();
        }
      });
    }
  };

  useEffect(() => {
    AppState.addEventListener("focus", (state) => {
      if (state === "active") {
        handPermission2();
      }
    });
  }, []);

  useEffect(() => {
    handPermission2();
  }, []);

  const _openLocationModal = () => {
    RNGooglePlaces.openAutocompleteModal()
      .then((results) => {
        if (results && results) {
          const houseNo = results.addressComponents.find((item) =>
            item.types.includes("premise")
          );
          const street = results.addressComponents.find(
            (item) =>
              item.types.includes("neighborhood") ||
              item.types.includes("route")
          );
          const city = results.addressComponents.find((item) =>
            item.types.includes("locality")
          );
          const state = results.addressComponents.find((item) =>
            item.types.includes("administrative_area_level_1")
          );
          const country = results.addressComponents.find((item) =>
            item.types.includes("country")
          );

          const address = results.address;
          const post_code = results.addressComponents.find((item) =>
            item.types.includes("postal_code")
          );

          const newLocation = {
            address: address || "",
            city: city ? city.name : "",
            state: state ? state.name : "",
            street: street ? street.name : "",
            houseNo: houseNo ? houseNo.name : "",
            country: country ? country.name : "",
            post_code: post_code ? post_code.name : "",
            location: {
              latitude: results?.location?.latitude,
              longitude: results?.location?.longitude,
            },
          };
          setChangeIsPressed(true);
          setIsTapable(false);
          setLocation(newLocation);
        }
        setChangeIsPressed(false);
        // setLocation({ location: place.location, address: place.address });
      })
      .catch((error) => console.log(error.message)); // error is a Javascript Error object
  };

  const _onChangeRegion = async (region) => {
    const { results } = await Geocoder.from({
      latitude: region.latitude,
      longitude: region.longitude,
    });

    if (results && results[0]) {
      const houseNo = results[0].address_components.find((item) =>
        item.types.includes("premise")
      );
      const street = results[0].address_components.find((item) =>
        item.types.includes("neighborhood")
      );
      const city = results[0].address_components.find((item) =>
        item.types.includes("locality")
      );
      const state = results[0].address_components.find((item) =>
        item.types.includes("administrative_area_level_1")
      );
      const country = results[0].address_components.find((item) =>
        item.types.includes("country")
      );

      const address = results[0].formatted_address;
      const post_code = results[0].address_components.find((item) =>
        item.types.includes("postal_code")
      );

      setLocation({
        address: address || "",
        city: city ? city.long_name : "",
        state: state ? state.long_name : "",
        street: street ? street.long_name : "",
        houseNo: houseNo ? houseNo.long_name : "",
        country: country ? country.long_name : "",
        post_code: post_code ? post_code.long_name : "",
        location: { latitude: region.latitude, longitude: region.longitude },
      });
    }

    setChangeIsPressed(false);
    setIsTapable(false);
  };

  const handleCenter = async () => {
    // console.log("seee theee location", location);
    // setLoading({ show: true });
    try {
      let loc = await Location.getCurrentPositionAsync({});
      mapRef.current.animateToRegion({
        latitude: loc.coords.latitude, // + 0.0006351,
        longitude: loc.coords.longitude, // - 0.0002,
        latitudeDelta: 0.01756674919514367,
        longitudeDelta: 0.012099780142307281,
      });
      // setLoading({ show: false });
      console.log("====================================");
      console.log("zheshi 怎么回事");
      console.log("====================================");
    } catch (error) {
      // setLoading({ show: false });
      console.log("====================================");
      console.log("zheshi 怎么回事");
      console.log("====================================");
    }
  };

  const INITIAL_REGION = location && {
    ...location.location,
    latitudeDelta: 0.01756674919514367,
    longitudeDelta: 0.012099780142307281,
  };

  const { width, height } = useWindowDimensions();
  return (
    <Portal>
      <View style={[{ width, height }, t.bgBlue300]}>
        <View style={[styles.container]}>
          <MapView
            key={changeIsPressed ? JSON.stringify(location) : ""}
            ref={mapRef}
            showsUserLocation
            userLocationUpdateInterval={2000}
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={INITIAL_REGION}
            onRegionChangeComplete={_onChangeRegion}
          >
            {/* {location && <Marker coordinate={location.location} draggable />} */}
          </MapView>
          <View style={styles.customMarkerContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.itemText}>
                Your item will be delivered here
              </Text>
            </View>
            <View style={[styles.triangle, styles.arrowDown]}></View>
            <View style={styles.mapCustomMarker}></View>
          </View>

          {/* <View style={styles.centerPin} /> */}
        </View>
        <View style={[{ width, height: 250 }, t.bgWhite, t.p4]}>
          <Text>Select Delivery Location</Text>
          <View style={[styles.locationInputContainer, t.mB6, t.mT6]}>
            <Image source={LocationPin} style={styles.locationPinIcon} />

            <View style={styles.locationInput}>
              <Text numberOfLines={2} style={styles.input}>
                {location && location.address}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.changeButton}
              onPress={_openLocationModal}
            >
              <Text style={styles.changeButtonText}>CHANGE</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[
              t.bgPrimary,
              t.h12,
              { borderRadius: 16 },
              t.itemsCenter,
              t.justifyCenter,
            ]}
            disabled={isTapable}
            onPress={() => {
              setShowMap({ mapVisible: false });
              dispatch({
                type: "changSheetState",
                payload: {
                  showSheet: true,
                  height: 600,
                  children: () => (
                    <AddLocationSheetContent
                      {...location}
                      locationDetails={location}
                    />
                  ),
                  sheetTitle: "",
                },
              });
            }}
          >
            <Text style={[t.textWhite]}>Confirm Location</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Portal>
  );
};

const styles = ScaledSheet.create({
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
  },
  arrowDown: {
    borderTopWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 0,
    borderLeftWidth: 10,
    borderTopColor: colors.primary01,
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: "transparent",
  },
  itemText: {
    color: "white",
  },
  textContainer: {
    borderRadius: "20@s",
    height: "30@s",
    width: "220@s",
    backgroundColor: colors.primary01,
    justifyContent: "center",
    alignItems: "center",
  },
  customMarkerContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    paddingBottom: "45@s",
  },
  mapCustomMarker: {
    marginTop: "5@vs",
    height: "8@s",
    width: "8@s",
    backgroundColor: colors.whatsapp,
    borderRadius: "20@s",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 200,
  },
  locationInfoContainer: {
    padding: 20,
    height: 200,
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    width: Dimensions.get("window").width,
  },
  locationInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  locationPinIcon: {
    width: 15,
    height: 20,
  },
  locationInput: {
    flex: 1,
    marginHorizontal: 10,
  },
  input: {
    fontSize: 16,
  },
  changeButtonText: {
    color: "#57b0c2",
    fontWeight: "bold",
  },
  button: {
    marginVertical: 20,
    padding: 15,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#57b0c2",
  },
  buttonText: {
    fontWeight: "bold",
    color: "#FFF",
  },
  centerPin: {
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: "red",
    position: "absolute",
    top: (Dimensions.get("window").height - 200 - 5) / 2,
    left: (Dimensions.get("window").width - 8) / 2,
    zIndex: 1,
  },
});

export default MapScreen;
