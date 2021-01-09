/*
 * @Author: Jianlong Nie
 * @Date: 2021-01-09 15:07:39
 * @LastEditTime: 2021-01-09 16:22:04
 * @LastEditors: Please set LastEditors
 * @Description: edit user profile
 * @FilePath: /MobileApp/App/Containers/UserEditProfile/index.js
 */
import React from 'react';
import {View, Text, Image, ScrollView,TouchableOpacity} from 'react-native';
import {ScaledSheet, s, vs} from 'react-native-size-matters';
import {SafeAreaView} from 'react-navigation';
import {AppBar, TextInput} from '../../Components';
import AppConfig from '../../Config/AppConfig';
import Colors from '../../Themes/Colors';
import colors from '../../Themes/Colors';
import fonts from '../../Themes/Fonts';
import UserAvatar from '../UserCenter/UserAvatar';
import NavigationService from '../../Navigation/NavigationService';

const inputs = [
  {title: 'First Name'},
  {title: 'Last Name'},
  {title: 'Email'},
  {title: 'Phone Number'},
];

function index(props) {
  const {title, icon} = props;
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <AppBar rightButton={()=>{
            return (
               <TouchableOpacity onPress={()=>alert('success')}>
                   <Text style={styles.save}>
                       SAVE
                   </Text>
               </TouchableOpacity> 
            );
        }}></AppBar>
      </SafeAreaView>
      <ScrollView>
        <View style={styles.contentContainer}>
          <UserAvatar uri="http://measure.3vyd.com//uPic/JRD5RT.png"></UserAvatar>
        </View>
        <View style={styles.contentContainer}>
          {inputs.map((item) => {
            return (
              <View style={{height:80,justifyContent:'center'}}>
                <TextInput hasTitle {...item}></TextInput>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <SafeAreaView style={styles.bottom}>
      <TouchableOpacity onPress={()=>{NavigationService.navigate('DeleteAccountMessageScreen')}}>
          <Text style={styles.removeText}>
             REMOVE ACCOUNT
          </Text>
      </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

export default index;

const styles = ScaledSheet.create({
    save:{
        color:Colors.primary,
        fontSize:'12@vs',
        fontFamily:fonts.primary
        
    },
    removeText:{
        fontFamily:fonts.primary,
        fontSize:'14@s',
        textAlign:'center',
        color:colors.grey80
    },
    bottom:{
        position:'absolute',
        bottom:0,
        left:0,
        right:0
    },
  contentContainer: {
    paddingHorizontal: AppConfig.paddingHorizontal,
  },
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: colors.background,
  },
  itemText: {
    textAlign: 'center',
    fontFamily: fonts.primary,
  },
});
