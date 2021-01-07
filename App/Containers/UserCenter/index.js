/*
 * @Author: Jianlong Nie
 * @Date: 2021-01-07 16:12:07
 * @LastEditTime: 2021-01-07 18:51:42
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
import MediumImage from '../../Images/usercenter/Icon.png';
import SettingImage from '../../Images/usercenter/Logo.png';
import StarImage from '../../Images/usercenter/star.png';

const textTip = "You haven't add any personal \n details yet";
const items = [
  {
    title: 'Salami Credit',
    icon: LogoImage,
  },
  {
    title: 'Notifications',
    icon: MediumImage,
  },
  {
    title: 'Settings',
    icon: SettingImage,
  },
  {
    title: 'Support',
    icon: IconImage,
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
      <View style={styles.itemContainer}>
          {
           items.map((item,index)=><ItemBox key={index} {...item}></ItemBox>)
          }
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
  itemContainer:{
     flexDirection:'row',
     flexWrap:'wrap',
     paddingHorizontal: AppConfig.paddingHorizontal,
     justifyContent:'space-around'
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
    marginTop:'10@vs'
  },
});
export default index;
