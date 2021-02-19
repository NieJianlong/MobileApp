import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { s, ScaledSheet } from 'react-native-size-matters';
import { Fonts, Colors, Images, ApplicationStyles } from '../../../Themes';
import AppConfig from '../../../Config/AppConfig';
import NavigationService from '../../../Navigation/NavigationService';

function index(props) {
  const { showLogo, rightButton, onPressBack, title } = props;
  return (
    <View style={{ overflow: 'hidden', paddingBottom: 5 }}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#fff',
          height: 50,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 3,
          elevation: 5,
          justifyContent: 'space-between',
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => {
              if (onPressBack) {
                onPressBack();
              } else {
                NavigationService.goBack();
              }
            }}
          >
            <Image style={styles.icBack} source={Images.arrow_left} />
          </TouchableOpacity>
          <View
            style={{
              marginLeft: 15,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Image
              style={{ width: 40, height: 40 }}
              source={{ uri: 'https://measure.3vyd.com/uPic/EStavP.png' }}
            />
            <Text style={styles.title}>Product Title</Text>
          </View>
        </View>

        {showLogo && (
          <Image
            source={Images.logo3}
            style={styles.logo}
            resizeMode={'contain'}
          />
        )}
        <TouchableOpacity style={{ marginRight: s(15) }}>
          <Image style={styles.icBack} source={Images.dotsImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default index;

const styles = ScaledSheet.create({
  container: {
    height: '40@vs',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: AppConfig.paddingHorizontal,
  },
  txt: {
    color: 'rgb(24,24,101)',
    fontSize: AppConfig.fontSize,
    fontFamily: Fonts.semibold,
  },
  icon: {
    width: '20@s',
    height: '20@s',
    marginRight: '5@s',
  },
  icBack: {
    width: '30@s',
    height: '30@s',
    tintColor: Colors.grey60,
  },
  logo: {
    height: '40@s',
    width: '140@s',
    tintColor: Colors.primary,
  },
  title: {
    ...ApplicationStyles.screen.heading4Bold,
    marginLeft: 15,
  },
});
