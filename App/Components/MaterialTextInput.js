import React, { useEffect, useState, useRef } from "react";
import { ScaledSheet, vs } from "react-native-size-matters";
import { TextField, OutlinedTextField } from "react-native-material-textfield";
import PropTypes from "prop-types";

import { Fonts, Colors, Images } from "../Themes";
import colors from "../Themes/Colors";

function MaterialTextInput(props) {
  const inputRef = useRef();
  const {
    placeholder,
    value = "",
    keyboardType,
    onChangeText = () => {},
  } = props;
  const [padding, setPadding] = useState(false);

  return (
    <TextField
      ref={inputRef}
      label={placeholder}
      // labelTextStyle={styles.labelTextStyle}
      // labelFontSize={12}
      keyboardType={keyboardType}
      value={value}
      onFocus={() => {
        setPadding(true);
      }}
      onBlur={() => {
        if (!inputRef.current.state.text) {
          setPadding(false);
        } else {
          setPadding(true);
        }
      }}
      lineType={"none"}
      onChangeText={(text) => {
        onChangeText(text);
      }}
      containerStyle={[
        styles.container,
        { paddingBottom: padding || value ? 0 : vs(10) },
      ]}
      tintColor={colors.grey40}
    />
  );
}

MaterialTextInput.propTypes = {};

MaterialTextInput.defaultProps = {};

const styles = ScaledSheet.create({
  container: {
    height: "46@vs",
    backgroundColor: Colors.white,
    borderRadius: "23@s",
    borderWidth: 1,
    borderColor: Colors.grey20,
    justifyContent: "center",
    paddingHorizontal: "15@s",
  },
  icSearch: {
    width: "25@s",
    height: "25@s",
    tintColor: Colors.grey60,
  },
  icDelete: {
    width: "13@s",
    height: "13@s",
    tintColor: Colors.grey80,
  },
  btnDelete: {
    width: "18@s",
    height: "18@s",
    backgroundColor: Colors.grey10,
    borderRadius: "10@s",
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    paddingLeft: "5@s",
    height: "100%",
    fontSize: "14@s",
    fontFamily: Fonts.primary,
    color: Colors.black,
  },
  labelTextStyle: {
    //fontSize: '15@s',
    fontFamily: Fonts.primary,
    color: Colors.grey40,
  },
});
export default MaterialTextInput;
