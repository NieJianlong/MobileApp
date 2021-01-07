/*
 * @Author: Jianlong Nie
 * @Date: 2021-01-07 16:12:07
 * @LastEditTime: 2021-01-07 20:40:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MobileApp/App/Containers/UserCenter/index.js
 */
import React from 'react';
import {View, Text} from 'react-native';
import {ScaledSheet, s, vs} from 'react-native-size-matters';
import Colors from '../../Themes/Colors';
import {Button} from '../../Components';
import {SafeAreaView} from 'react-native-safe-area-context';
import Fonts from '../../Themes/Fonts';
import AppConfig from '../../Config/AppConfig';
import ItemBox from './ItemBox';
import DocImage from '../../Images/usercenter/Document.png';
import IconImage from '../../Images/usercenter/Icon.png';
import LogoImage from '../../Images/usercenter/Logo.png';
import MediumImage from '../../Images/usercenter/Medium.png';
import SettingImage from '../../Images/usercenter/setting.png';
import StarImage from '../../Images/usercenter/star.png';
import colors from '../../Themes/Colors';

const textTip = "You haven't add any personal \n details yet";
const items = [
  {
    title: 'Salami Credit',
    icon: LogoImage,
  },
  {
    title: 'Notifications',
    icon: IconImage,
  },
  {
    title: 'Settings',
    icon: SettingImage,
  },
  {
    title: 'Support',
    icon: MediumImage,
  },
  {
    title: 'Feedback',
    icon: StarImage,
  },
  {
    title: 'Legal',
    icon: DocImage,
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

function index(props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SafeAreaView>
          <Text style={styles.nosign}>{textTip}</Text>
        </SafeAreaView>
        <View style={styles.signbtn}>
          <Button text="SIGN IN"></Button>
        </View>
      </View>
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
  buttonContainer:{
    paddingHorizontal: AppConfig.paddingHorizontal,
    height:'100@vs',
    justifyContent:'space-around',
    marginTop:'30@vs'
  },
  itemContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: AppConfig.paddingHorizontal,
    justifyContent: 'space-around',
  },
  signbtn: {marginTop: '20@vs'},
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
