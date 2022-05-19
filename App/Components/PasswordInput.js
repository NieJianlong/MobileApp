import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity, TextInput } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

import { Fonts, Colors, Images } from "../Themes";

//component for password input
class PasswordInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
    };
  }

  getInnerRef = () => this.ref;

  render() {
    const {
      placeholder,
      style,
      showError,
      errorMessage,
      onChangeText,
      onSubmitEditing,
      returnKeyType,
    } = this.props;

    return (
      <View>
        <View
          style={[styles.container, style, showError && styles.errorContainer]}
        >
          <TextInput
            ref={(r) => (this.ref = r)}
            placeholder={placeholder}
            style={styles.textInput}
            placeholderTextColor="gray"
            secureTextEntry={!this.state.showPassword}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
            returnKeyType={returnKeyType}
          />
          <TouchableOpacity
            style={styles.btnView}
            onPress={() =>
              this.setState({ showPassword: !this.state.showPassword })
            }
          >
            <Image
              source={Images.view}
              style={[
                styles.icView,
                this.state.showPassword && { tintColor: Colors.grey80 },
              ]}
            />
          </TouchableOpacity>
        </View>
        {errorMessage && showError && (
          <Text style={styles.errorText}>{errorMessage}</Text>
        )}
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    height: "48@vs",
    backgroundColor: Colors.white,
    borderRadius: "20@s",
    borderWidth: 1,
    borderColor: Colors.grey20,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: "10@s",
  },
  errorContainer: {
    borderColor: Colors.error,
  },
  icSearch: {
    width: "25@s",
    height: "25@s",
    tintColor: Colors.grey60,
  },
  icView: {
    width: "23@s",
    height: "23@s",
    tintColor: Colors.grey20,
  },
  btnView: {
    width: "30@s",
    height: "30@s",
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    paddingLeft: "5@s",
    height: "100%",
    fontSize: "14@s",
    fontFamily: Fonts.primary,
    color: Colors.black,
  },
  errorText: {
    fontFamily: Fonts.primary,
    color: Colors.error,
    fontSize: "14@s",
    marginTop: "3@vs",
    marginLeft: "15@s",
  },
});
export default PasswordInput;
