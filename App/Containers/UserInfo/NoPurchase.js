/*
 * @Author: Jianlong Nie
 * @Date: 2021-01-09 13:03:18
 * @LastEditTime: 2021-01-24 14:10:52
 * @LastEditors: Please set LastEditors
 * @Description: User haven't added a default purchase preference yet
 * @FilePath: /MobileApp/App/Containers/UserInfo/NoPurchase.js
 */
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScaledSheet, s, vs } from 'react-native-size-matters';
import Fonts from '../../Themes/Fonts';
import AppConfig from '../../Config/AppConfig';
import { Button } from '../../Components';
import fonts from '../../Themes/Fonts';
import colors from '../../Themes/Colors';
import NavigationService from '../../Navigation/NavigationService';
import images from '../../Themes/Images';
import ListItem from './ListItem';
import metrics from '../../Themes/Metrics';
import TextTip from '../../Components/EmptyReminder';
/**
 * @description:This component is displayed when the user does not purchase it
 * @param {*} props
 * @return {*}
 */
function NoPurchase(props) {
  const items = [
    {
      lefticon: images.userChangePwdImage,
      text: 'Change Password',
      righticon: images.userRightBtnImage,
      onPress: () => {
        NavigationService.navigate('ChangePasswordScreen');
      },
      hasline: true,
    },
    {
      lefticon: images.userLogoutImage,
      text: 'Logout',
      righticon: images.userRightBtnImage,
      onPress: () => {},
      hasline: false,
    },
  ];
  return (
    <View style={{ flex: 1, width: metrics.screenWidth }}>
      <TextTip {...props}></TextTip>
      <SafeAreaView style={styles.bottomlist}>
        {items.map((item, index) => {
          return <ListItem key={`listitem` + index} {...item}></ListItem>;
        })}
      </SafeAreaView>
    </View>
  );
}

export default NoPurchase;
const styles = ScaledSheet.create({
  bottomlist: {
    position: 'absolute',
    bottom: 0,
    width: metrics.screenWidth,
  },
  nosign: {
    fontSize: '22@s',
    textAlign: 'center',
    fontFamily: Fonts.primary,
    fontWeight: 'bold',
    marginTop: '25@vs',
  },
  subTextTip: {
    fontSize: '14@vs',
    textAlign: 'center',
    fontFamily: Fonts.primary,
    marginTop: '5@vs',
    color: colors.grey80,
    marginBottom: '10@vs',
  },
  signbtn: { marginTop: '20@vs' },
  headerContainer: {
    backgroundColor: colors.background,
    justifyContent: 'space-around',
    paddingHorizontal: AppConfig.paddingHorizontal,
    paddingBottom: '15@vs',
  },
});
