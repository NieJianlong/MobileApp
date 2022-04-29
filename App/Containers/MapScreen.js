import * as Location from "expo-location";
import React, { useEffect, useRef, useState } from "react";
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
} from "react-native";
import Geocoder from "react-native-geocoding";
import RNGooglePlaces from "react-native-google-places-api";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

import AdditionalInfoModal from "./AdditionalInfoModal";
import LocationPin from "../../assets/location-pin.png";
import { Button } from "../Components";
import { Modal } from "react-native-paper";
import { t } from "react-native-tailwindcss";
import useLoading from "../hooks/useLoading";

Geocoder.init("AIzaSyBfDTs1ejBI3MIVhrPeXgpvDNkTovWkIuU");

const MapScreen = () => {
  const mapRef = useRef();
  const [location, setLocation] = useState(null);
  const [additionalInfoModal, setAdditionalInfoModal] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [additionalInfo, setAdditionalInfo] = useState({});
  const { setLoading } = useLoading();

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }

      _getCurrentLocation();
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _getCurrentLocation = () => {
    setLoading({ show: true });
    RNGooglePlaces.getCurrentPlace(["placeID", "location", "name", "address"])
      .then((results) => {
        console.log("getCurrentPlace", results[0]);
        setLoading({ show: false });
        // setLocation(
        //   results && results[0] && { location: results[0].location, address: results[0].address }
        // );

        _onChangeRegion(results[0] && results[0].location);
      })
      .catch((error) => {
        setLoading({ show: false });
        console.log("Error", error.message);
      });
  };

  const _openLocationModal = () => {
    RNGooglePlaces.openAutocompleteModal()
      .then((place) => {
        setLocation({ location: place.location, address: place.address });
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

      setLocation({
        address: address || "",
        city: city ? city.long_name : "",
        state: state ? state.long_name : "",
        street: street ? street.long_name : "",
        houseNo: houseNo ? houseNo.long_name : "",
        country: country ? country.long_name : "",
        location: { latitude: region.latitude, longitude: region.longitude },
      });
    }
  };

  const INITIAL_REGION = location && {
    ...location.location,
    latitudeDelta: 0.01756674919514367,
    longitudeDelta: 0.012099780142307281,
  };

  const { width, height } = useWindowDimensions();
  return (
    <View style={[{ width, height }, t.bgBlue300]}>
      <View style={[styles.container]}>
        <MapView
          ref={mapRef}
          showsUserLocation
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={INITIAL_REGION}
          onRegionChangeComplete={_onChangeRegion}
        >
          {location && <Marker coordinate={location.location} draggable />}
        </MapView>

        {/* <View style={styles.centerPin} /> */}

        {additionalInfoModal && location && (
          <AdditionalInfoModal
            location={location}
            visible={additionalInfoModal}
            onSubmit={setAdditionalInfo}
            onClose={() => setAdditionalInfoModal(false)}
          />
        )}
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

        <Button
          onPress={() => setAdditionalInfoModal(true)}
          text={"Confirm Location"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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