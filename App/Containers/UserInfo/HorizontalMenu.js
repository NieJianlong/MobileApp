/*
 * @Author: Jianlong Nie
 * @Date: 2021-01-08 17:53:05
 * @LastEditTime: 2021-01-08 17:55:07
 * @LastEditors: Please set LastEditors
 * @Description: UserInfo Horizontal Menu
 * @FilePath: /MobileApp/App/Containers/UserInfo/HorizontalMenu.js
 */
import React from 'react';
import {View,ScrollView} from 'react-native';
import UserHeader from '../UserCenter/UserHeader';
import {ScaledSheet, s, vs} from 'react-native-size-matters';
import AppConfig from '../../Config/AppConfig';
import {AppBar} from '../../Components';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../../Themes/Colors';

class HorizontalMenu extends React.Component {
  render() {
    return (
      <View style={styles.container}>
       
      </View>
    );
  }
}

export default HorizontalMenu;
const styles = ScaledSheet.create({
    
  container: {
    height:'100@s',
    backgroundColor:colors.background,
    
  },
});
