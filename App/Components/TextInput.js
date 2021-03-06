import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import PropTypes from 'prop-types';

import { Fonts, Colors, Images } from '../Themes';
import colors from '../Themes/Colors';
import fonts from '../Themes/Fonts';

class CustomTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      placeholder,
      style,
      onFocus,
      onBlur,
      onChangeText,
      showError,
      errorMessage,
      hasTitle,
      title,
      multiline,
      value,
      keyboardType = 'default',
    } = this.props;

    return (
      <View>
        <View
          style={[
            styles.container,
            style,
            showError && styles.errorContainer,
            multiline && styles.multilineContainer,
          ]}
        >
          <View style={{ flex: 1 }}>
            {hasTitle && <Text style={styles.title}>{title}</Text>}
            <TextInput
              placeholder={placeholder}
              style={styles.textInput}
              onFocus={onFocus}
              onBlur={onBlur}
              onChangeText={onChangeText}
              multiline={multiline}
              keyboardType={keyboardType}
              numberOfLines={multiline ? 5 : 1}
              value={value}
            />
          </View>

          {/* {
                        this.state.keyword !== '' &&
                        <TouchableOpacity
                            onPress={() => this.setState({ keyword: '' })}
                            style={styles.btnDelete}>
                            <Image source={Images.crossMedium} style={styles.icDelete} />
                        </TouchableOpacity>
                    } */}
        </View>
        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
      </View>
    );
  }
}

CustomTextInput.propTypes = {};

CustomTextInput.defaultProps = {};

const styles = ScaledSheet.create({
  title: {
    color: colors.grey40,
    paddingHorizontal: '8@s',
    fontFamily: fonts.primary,
    fontSize: '12@s',
    marginTop: -3,
    marginBottom: -3,
  },
  container: {
    height: '48@vs',
    backgroundColor: Colors.white,
    borderRadius: '20@s',
    borderWidth: 1,
    borderColor: Colors.grey20,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: '10@s',
  },
  multilineContainer: {
    height: '150@vs',
    paddingVertical: '5@vs',
  },
  errorContainer: {
    borderColor: Colors.error,
  },
  icSearch: {
    width: '25@s',
    height: '25@s',
    tintColor: Colors.grey60,
  },
  icDelete: {
    width: '13@s',
    height: '13@s',
    tintColor: Colors.grey80,
  },
  btnDelete: {
    width: '18@s',
    height: '18@s',
    backgroundColor: Colors.grey10,
    borderRadius: '10@s',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    paddingLeft: '5@s',
    height: '100%',
    fontSize: '14@s',
    fontFamily: Fonts.primary,
    color: Colors.black,
  },
  errorText: {
    fontFamily: Fonts.primary,
    color: Colors.error,
    fontSize: '14@s',
    marginTop: '3@vs',
    marginLeft: '15@s',
  },
});
export default CustomTextInput;
