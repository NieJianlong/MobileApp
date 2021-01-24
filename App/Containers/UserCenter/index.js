/*
 * @Author: Jianlong Nie
 * @Date: 2021-01-07 16:12:07
 * @LastEditTime: 2021-01-24 14:17:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MobileApp/App/Containers/UserCenter/index.js
 */
import React from 'react';
import { View, Text } from 'react-native';
import { ScaledSheet, s, vs } from 'react-native-size-matters';
import Colors from '../../Themes/Colors';
import { Button } from '../../Components';
import { SafeAreaView } from 'react-native-safe-area-context';
import Fonts from '../../Themes/Fonts';
import AppConfig from '../../Config/AppConfig';
import ItemBox from './ItemBox';
import colors from '../../Themes/Colors';
import UserHeader from './UserHeader';
import images from '../../Themes/Images';

const items = [
  {
    title: 'Salami Credit',
    icon: images.userLogoImage,
  },
  {
    title: 'Notifications',
    icon: images.userIconImage,
  },
  {
    title: 'Settings',
    icon: images.userSettingImage,
  },
  {
    title: 'Support',
    icon: images.userMediumImage,
  },
  {
    title: 'Feedback',
    icon: images.userStarImage,
  },
  {
    title: 'Legal',
    icon: images.userDocImage,
  },
];
const buttons = [
  {
    text: 'SHARE APP',
    backgroundColor: colors.grey80,
    onPress: () => {},
  },
  {
    text: 'CREATE A SELLER PROFILE',
    backgroundColor: colors.grey80,
    onPress: () => {},
  },
];
/**
 * @description: User Center Screen
 * @param {*} props
 * @return {*}
 */
function index(props) {
  return (
    <View style={styles.container}>
      <UserHeader needSafeArea></UserHeader>

      {/* All the items usercenter */}
      <View style={styles.itemContainer}>
        {items.map((item, index) => (
          <ItemBox key={index} {...item}></ItemBox>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        {buttons.map((item, index) => (
          <Button key={`button` + index} {...item}></Button>
        ))}
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  nosign: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: Fonts.primary,
    fontWeight: 'bold',
    marginTop: '20@vs',
  },
  buttonContainer: {
    paddingHorizontal: AppConfig.paddingHorizontal,
    height: '100@vs',
    justifyContent: 'space-around',
    marginTop: '30@vs',
  },
  itemContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: AppConfig.paddingHorizontal,
    justifyContent: 'space-around',
  },
  signbtn: { marginTop: '20@vs' },
  header: {
    backgroundColor: 'white',
    justifyContent: 'space-around',
    paddingHorizontal: AppConfig.paddingHorizontal,
    paddingBottom: '15@vs',
  },
  container: {
    height: '100%',
    backgroundColor: Colors.background,
    marginTop: '10@vs',
  },
});
export default index;
