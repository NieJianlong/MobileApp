import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";

const AdditionalInfoModal = ({ location, visible, onClose, onSubmit }) => {
  const [houseNo, setHouseNo] = useState(location.houseNo || "");
  const [street, setStreet] = useState(location.street || "");
  const [city, setCity] = useState(location.city || "");
  const [pincode, setPincode] = useState(location.pincode || "");
  const [state, setState] = useState(location.state || "");

  const _handleSubmit = () => {
    onSubmit({ houseNo, street, city, pincode, state });
    onClose();
  };

  return (
    <Modal
      style={styles.modal}
      isVisible={visible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection={["down"]}
    >
      <View style={styles.container}>
        <View style={styles.topPin} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Add you delivery address</Text>
          <Text>Please separate your address with commas</Text>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            value={houseNo}
            onChangeText={setHouseNo}
            style={styles.input}
            placeholder="Flat / Home No, Apartment / Building Name*"
          />
          <TextInput
            value={street}
            onChangeText={setStreet}
            style={styles.input}
            placeholder="Street / Colony Name*"
          />
          <TextInput
            value={city}
            onChangeText={setCity}
            style={styles.input}
            placeholder="City / Town / Village*"
          />
          <TextInput
            value={pincode}
            onChangeText={setPincode}
            style={styles.input}
            placeholder="Pincode*"
          />
          <TextInput
            value={state}
            onChangeText={setState}
            style={styles.input}
            placeholder="State (Province)*"
          />

          <TouchableOpacity style={styles.button} onPress={_handleSubmit}>
            <Text style={styles.buttonText}>Confirm Address</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: "flex-end",
  },
  container: {
    padding: 20,
    paddingTop: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#f2f2f2",
  },
  topPin: {
    width: 50,
    height: 4,
    marginVertical: 10,
    alignSelf: "center",
    backgroundColor: "#CECECE",
  },
  titleContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
  },
  formContainer: {},
  input: {
    height: 48,
    width: "100%",
    borderWidth: 0.5,
    borderRadius: 50,
    marginVertical: 5,
    paddingHorizontal: 15,
    borderColor: "#CECECE",
    backgroundColor: "#FFF",
  },
  button: {
    height: 48,
    width: "100%",
    borderRadius: 50,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#57b0c2",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default AdditionalInfoModal;
