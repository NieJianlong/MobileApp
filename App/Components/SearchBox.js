import React, { useState } from 'react';
import { View, Image, TouchableOpacity, TextInput } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { Fonts, Colors, Images } from '../Themes';

function index({ placeholder }) {
  const [keyword, setKeyword] = useState('');

  return (
    <View>
      <View style={styles.container}>
        <Image source={Images.search} style={styles.icSearch} />
        <TextInput
          placeholder={placeholder}
          value={keyword}
          paddingVertical={0}
          style={styles.textInput}
          onChangeText={(text) => {
            setKeyword(text);
          }}
        />
        {keyword !== '' && (
          <TouchableOpacity
            onPress={() => setKeyword('')}
            style={styles.btnDelete}
          >
            <Image source={Images.crossMedium} style={styles.icDelete} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    height: '36@vs',
    backgroundColor: Colors.white,
    borderRadius: '18@s',
    borderWidth: 1,
    borderColor: Colors.grey20,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: '10@s',
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
    paddingVertical: 0,
  },
  textResult: {
    fontSize: '14@s',
    fontFamily: Fonts.primary,
    color: Colors.black,
  },
  itemResultContainer: {
    paddingVertical: '10@vs',
  },
  listResultContainer: {
    marginTop: '10@vs',
  },
});
export default index;
