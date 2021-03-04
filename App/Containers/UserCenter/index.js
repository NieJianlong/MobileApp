/*
 * @Author: Jianlong Nie
 * @Date: 2021-01-07 16:12:07
 * @LastEditTime: 2021-01-24 21:00:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MobileApp/App/Containers/UserCenter/index.js
 */
import React from 'react';
import { View, Text, StatusBar } from 'react-native';
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
import NavigationService from '../../Navigation/NavigationService';

const items = [
  {
    title: 'Salami Credit',
    icon: images.userLogoImage,
    onPress: () => {
      NavigationService.navigate('SalamiCreditScreen');
    },
  },
  {
    title: 'Notifications',
    icon: images.userIconImage,
    onPress: () => {
      NavigationService.navigate('NotificationsScreen');
    },
  },
  {
    title: 'Settings',
    icon: images.userSettingImage,
    onPress: () => {
      NavigationService.navigate('SettingScreen');
    },
  },
  {
    title: 'Support',
    icon: images.userMediumImage,
    onPress: () => {
      NavigationService.navigate('CustomerSupportScreen');
    },
  },
  {
    title: 'Feedback',
    icon: images.userStarImage,
    onPress: () => {
      NavigationService.navigate('FeedbackScreen');
    },
  },
  {
    title: 'Legal',
    icon: images.userDocImage,
    onPress: () => {
      NavigationService.navigate('CustomerSupportScreen');
    },
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
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <View style={{ marginTop: vs(10) }}>
        <UserHeader needSafeArea></UserHeader>
      </View>

      {/* All the items usercenter */}
      <View style={styles.itemContainer}>
        {items.map((item, i) => (
          <View key={i}>
            <ItemBox {...item}></ItemBox>
          </View>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        {buttons.map((item, i) => (
          <View key={`button` + i} style={{ marginTop: 15 }}>
            <Button {...item}></Button>
          </View>
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
    height: '130@vs',
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
  },
});
export default index;
