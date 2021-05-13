import React, { useContext, useCallback, useState } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { vs, s } from 'react-native-size-matters';
import { Button, ProductSearchBox } from '../../../Components';
import { Colors, Images } from '../../../Themes';
import styles from '../styles';
import NavigationService from '../../../Navigation/NavigationService';

export default function ExploreHeader() {
  const [keyword, setKeyword] = useState('');
  const onSearch = (keyword) => {
    setKeyword(keyword);
  };

  if (keyword === '') {
    return (
      <View style={[styles.header]}>
        <View style={styles.icSearch} />
        <Image
          source={Images.logo3}
          style={styles.logo}
          resizeMode={'contain'}
        />
        <TouchableOpacity
          onPress={() => {
            NavigationService.navigate('ProductSearchScreen', {
              onSearch: onSearch,
            });
          }}
        >
          <Image source={Images.search} style={styles.icSearch} />
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={[styles.header, { paddingVertical: vs(10) }]}>
        <ProductSearchBox
          disabled={true}
          keyword={keyword}
          onPressDelete={() => {
            setKeyword('');
            NavigationService.navigate('ProductSearchScreen', {
              onSearch: onSearch,
            });
          }}
          onPressBack={() => setKeyword('')}
        />
      </View>
    );
  }
}
