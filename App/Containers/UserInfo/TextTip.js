/*
 * @Author: JianLong Nie
 * @Date: 2021-01-09 16:30:32
 * @LastEditTime: 2021-01-09 16:30:33
 * @LastEditors: Please set LastEditors
 * @Description: Text tips
 * @FilePath: /MobileApp/App/Containers/UserInfo/TextTip.js
 */
/*
 * @Author: Jianlong Nie
 * @Date: 2021-01-09 13:03:18
 * @LastEditTime: 2021-01-09 14:34:12
 * @LastEditors: Please set LastEditors
 * @Description: User haven't added a default purchase preference yet
 * @FilePath: /MobileApp/App/Containers/UserInfo/NoPurchase.js
 */
import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScaledSheet, s, vs} from 'react-native-size-matters';
import Fonts from '../../Themes/Fonts';
import AppConfig from '../../Config/AppConfig';
import {Button} from '../../Components';
import fonts from '../../Themes/Fonts';
import colors from '../../Themes/Colors';
import NavigationService from '../../Navigation/NavigationService';
import images from '../../Themes/Images';
import ListItem from './ListItem';
import metrics from '../../Themes/Metrics';


function TextTip(props) {
    const {textTip,subTextTip,needButton,btnMsg} = props;
//   const textTip = "You haven't added a default \n purchase preference yet";
//   const subTextTip =
//     'Select a default address and payment method to \n activate 1 click purchasing';
  
  return (
    <View style={{flex:1,width:metrics.screenWidth}}>
      <View style={styles.headerContainer}>
        <Text style={styles.nosign}>{textTip}</Text>
        <Text style={[styles.subTextTip]}>{subTextTip}</Text>
        <View style={styles.signbtn}>
          {
              needButton&&<Button
              onPress={() => {}}
              text={btnMsg}></Button>
          }
        </View>
      </View>
    </View>
  );
}

export default TextTip;
const styles = ScaledSheet.create({
  bottomlist:{
      position:'absolute',
      bottom:0,
      width:metrics.screenWidth
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
  signbtn: {marginTop: '20@vs'},
  headerContainer: {
    backgroundColor: colors.background,
    justifyContent: 'space-around',
    paddingHorizontal: AppConfig.paddingHorizontal,
    paddingBottom: '15@vs',
  },
});
