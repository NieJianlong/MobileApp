/*
 * @Author: Jianlong Nie
 * @Date: 2021-01-09 15:07:39
 * @LastEditTime: 2021-01-24 13:58:54
 * @LastEditors: Please set LastEditors
 * @Description: edit user profile
 * @FilePath: /MobileApp/App/Containers/UserEditProfile/index.js
 */
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, Text, Image, Keyboard, TouchableOpacity } from 'react-native';
import { ScaledSheet, s } from 'react-native-size-matters';
import { SafeAreaView } from 'react-navigation';
import { AppBar, MaterialTextInput, RightButton } from '../../Components';
import AppConfig from '../../Config/AppConfig';
import Colors from '../../Themes/Colors';
import colors from '../../Themes/Colors';
import fonts from '../../Themes/Fonts';
import UserAvatar from '../UserCenter/UserAvatar';
import NavigationService from '../../Navigation/NavigationService';
import images from '../../Themes/Images';
import { ApplicationStyles } from '../../Themes';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet';

const inputs = [
  { placeholder: 'First Name', value: 'John' },
  { placeholder: 'Last Name', value: 'John' },
  { placeholder: 'Email', value: '1317272927@qq.com' },
  { placeholder: 'Phone Number', value: '56565' },
];
/**
 * @description:User edit page
 * @param {*} props
 * @return {*}
 */
function UserEditProfile(props) {
  const [showBottom, setShowBottom] = useState(true);
  const [newAvatar, setNewAvatar] = useState(null);
  const sheetRef = useRef();
  useEffect(() => {
    const keyboardShow = (e) => {
      setShowBottom(false);
    };
    const keyboardHide = (e) => {
      setShowBottom(true);
    };
    Keyboard.addListener('keyboardDidShow', keyboardShow);
    Keyboard.addListener('keyboardDidHide', keyboardHide);
    return () => {
      Keyboard.removeListener('keyboardDisShow', keyboardShow);
      Keyboard.removeListener('keyboardDidHide', keyboardHide);
    };
  }, []);
  const showSheet = useCallback(() => {
    sheetRef.current.show();
  }, []);
  const onPressGallery = useCallback(() => {
    ImagePicker.openPicker({
      //cropping: true,
      includeBase64: true,
      multiple: true,
    }).then((image) => {
      setNewAvatar(image[0]);
    });
  }, []);
  const onPressCamera = useCallback(() => {
    ImagePicker.openCamera({
      cropping: true,
      includeBase64: true,
    }).then((image) => {
      setNewAvatar(image[0]);
    });
  }, []);
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <AppBar
          rightButton={() => (
            <RightButton
              title="SAVE"
              onPress={() => {
                NavigationService.goBack();
              }}
            />
          )}
        />
      </SafeAreaView>
      <KeyboardAwareScrollView>
        <View style={styles.contentContainer}>
          <UserAvatar
            uri={newAvatar ? { uri: newAvatar.path } : images.userDefaultAvatar}
          />
          <TouchableOpacity onPress={showSheet}>
            <Image
              style={{
                width: s(30),
                height: s(30),
                marginTop: s(-20),
                marginLeft: s(30),
              }}
              source={images.userUploadImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.contentContainer}>
          {inputs.map((item, index) => {
            return (
              <View
                key={index}
                style={{ height: 80, justifyContent: 'center' }}
              >
                <MaterialTextInput {...item}></MaterialTextInput>
              </View>
            );
          })}
        </View>
      </KeyboardAwareScrollView>
      {showBottom && (
        <SafeAreaView style={styles.bottom}>
          <TouchableOpacity
            onPress={() => {
              NavigationService.navigate('DeleteAccountMessageScreen');
            }}
          >
            <Text
              style={[
                ApplicationStyles.screen.heading5Bold,
                { color: colors.grey80, textAlign: 'center' },
              ]}
            >
              REMOVE ACCOUNT
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      )}
      <ActionSheet
        ref={sheetRef}
        title={'Select a new picture'}
        options={['Camera', 'Photo Gallery', 'Cancel']}
        cancelButtonIndex={2}
        //destructiveButtonIndex={1}
        onPress={(index) => {
          if (index === 0) {
            onPressCamera();
          } else if (index === 1) {
            onPressGallery();
          }
        }}
      />
    </View>
  );
}

export default UserEditProfile;

const styles = ScaledSheet.create({
  save: {
    color: Colors.primary,
    fontSize: '12@vs',
    fontFamily: fonts.primary,
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: '15@vs',
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
