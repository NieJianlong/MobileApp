import React, { Component, useCallback, useEffect } from 'react';
import { View, StatusBar, Image } from 'react-native';
import { userProfileVar } from '../../Apollo/cache';
import { runTokenFlow } from '../../Apollo/jwt-request';
import {
  getLocalStorageValue,
  LOCAL_STORAGE_TOKEN_KEY,
  LOCAL_STORAGE_USER_NAME,
  LOCAL_STORAGE_USER_PASSWORD,
  setLocalStorageValue,
} from '../../Apollo/local-storage';
import NavigationService from '../../Navigation/NavigationService';

import { Images } from '../../Themes';
import styles from './styles';

export default function LaunchScreen() {
  const autoSignIn = useCallback(async () => {
    //get username and possword from localStorage
    const username = await getLocalStorageValue(LOCAL_STORAGE_USER_NAME);
    const password = await getLocalStorageValue(LOCAL_STORAGE_USER_PASSWORD);
    //if username && password exits,we can login auto
    if (username && password) {
      const { data } = await runTokenFlow({ username, password });
      let access_token = data.access_token;
      if (access_token === 'undefined') {
        console.log('no access token');
      }
      userProfileVar({
        email: username,
        isAuth: true,
      });
      global.access_token = access_token;
      setLocalStorageValue(LOCAL_STORAGE_TOKEN_KEY, access_token);
      NavigationService.navigate('MainScreen');
    } else {
      setTimeout(() => {
        //this.props.navigation.navigate('OnboardingScreen')
        NavigationService.navigate('OnboardingScreen');
      }, 2000);
    }
  }, []);
  //when app open,when can do auto login
  useEffect(() => {
    autoSignIn();
  }, [autoSignIn]);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor={'rgba(0,0,0,0.0)'}
      />
      <Image source={Images.logo2} style={styles.logo} resizeMode={'contain'} />
    </View>
  );
}
