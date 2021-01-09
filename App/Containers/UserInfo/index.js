/*
 * @Author: Jianlong Nie
 * @Date: 2021-01-08 15:54:53
 * @LastEditTime: 2021-01-09 14:57:59
 * @LastEditors: Please set LastEditors
 * @Description: UserInfo Screen
 * @FilePath: /MobileApp/App/Containers/UserInfo/index.js
 */
import React from 'react';
import {View} from 'react-native';
import UserHeader from '../UserCenter/UserHeader';
import {ScaledSheet, s, vs} from 'react-native-size-matters';
import AppConfig from '../../Config/AppConfig';
import {AppBar} from '../../Components';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../../Themes/Colors';
import HorizontalMenu from './HorizontalMenu';

class index extends React.Component {
  

  /* render function, etc */
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={{maxHeight:64}}>
          <AppBar></AppBar>
          </SafeAreaView>
        <View >
          <UserHeader needEdit></UserHeader>
        </View>
        <HorizontalMenu></HorizontalMenu>
      </View>
    );
  }
}

export default index;
const styles = ScaledSheet.create({
    
  container: {
   
    backgroundColor:colors.background,
    flex:1
  },
});
