/*
 * @Author: Jianlong Nie
 * @Date: 2021-01-07 20:46:07
 * @LastEditTime: 2021-01-09 15:22:28
 * @LastEditors: Please set LastEditors
 * @Description: User center header layout
 * @FilePath: /MobileApp/App/Containers/UserCenter/UserHeader.js
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
import UserAvatar from "./UserAvatar";

function UserHeader(props) {
  const {needSafeArea, needEdit} = props;
  const textTip = "You haven't add any personal \n details yet";
  const [islogin, setIslogin] = useState(true);
  return (
    <View style={styles.headerContainer}>
      {islogin ? (
        needSafeArea ? (
          <SafeAreaView style={styles.toppart}>
            {userInfo(needEdit)}
          </SafeAreaView>
        ) : (
          userInfo(needEdit)
        )
      ) : (
        <View>
          <SafeAreaView>
            <Text style={styles.nosign}>{textTip}</Text>
          </SafeAreaView>
          <View style={styles.signbtn}>
            <Button onPress={() => setIslogin(true)} text="SIGN IN"></Button>
          </View>
        </View>
      )}
    </View>
  );
}

function userInfo(needEdit) {
  return (
    <TouchableOpacity
      onPress={() => {
        NavigationService.navigate('UserInfoScreen', {});
      }}>
      <View style={styles.userinfo}>
        <UserAvatar uri='http://measure.3vyd.com//uPic/oplutv.png'></UserAvatar>
        <View style={styles.textinfo}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.myaccount}>My Account</Text>
            {needEdit && (
              <TouchableOpacity onPress={()=>{NavigationService.navigate('UserEditProfileScreen')}}>
                <Image
                  style={styles.editImage}
                  source={images.userEditBtnImage}></Image>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.emailContainer}>
            <Image
              style={styles.email}
              source={require('../../Images/usercenter/email.png')}></Image>
            <Text style={styles.emailtext}>1317272927@qq.com</Text>
          </View>
          <View style={styles.emailContainer}>
            <Image
              style={styles.email}
              source={require('../../Images/usercenter/phone.png')}></Image>
            <Text style={styles.emailtext}>17706398976</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default UserHeader;
const styles = ScaledSheet.create({
  editImage: {
    width: '20@s',
    height: '20@s',
  },
  toppart: {
    backgroundColor: colors.background,
    height: '140@vs',
  },
  emailContainer: {
    flexDirection: 'row',
    marginTop: '3@vs',
  },
  emailtext: {
    color: colors.grey80,
    fontSize: '12@s',
    fontFamily: fonts.primary,
  },
  myaccount: {
    fontSize: '16@s',
    fontFamily: fonts.primary,
  },
  email: {
    width: '20@s',
    height: '20@s',
    resizeMode: 'contain',
  },
  textinfo: {
    paddingHorizontal: AppConfig.paddingHorizontal,
    flex: 1,
  },
  userinfo: {
    paddingHorizontal: AppConfig.paddingHorizontal,
    paddingVertical: AppConfig.paddingHorizontal,
    borderRadius: '18@s',
    marginTop: '15@s',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  avatar: {
    width: '56@s',
    height: '56@s',
    borderRadius: '28@s',
  },
  nosign: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: Fonts.primary,
    fontWeight: 'bold',
    marginTop: '20@vs',
  },
  signbtn: {marginTop: '20@vs'},
  headerContainer: {
    backgroundColor: colors.background,
    justifyContent: 'space-around',
    paddingHorizontal: AppConfig.paddingHorizontal,
    paddingBottom: '15@vs',
  },
});
