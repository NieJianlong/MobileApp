import React, { Component, useCallback, useEffect } from "react";
import { View, StatusBar, Image } from "react-native";
import { userProfileVar } from "../../Apollo/cache";
import { runTokenFlow } from "../../Apollo/jwt-request";
import {
  getLocalStorageValue,
  LOCAL_STORAGE_TOKEN_KEY,
  LOCAL_STORAGE_USER_NAME,
  LOCAL_STORAGE_USER_PASSWORD,
  setLocalStorageValue,
} from "../../Apollo/local-storage";
import NavigationService from "../../Navigation/NavigationService";

import { Images } from "../../Themes";
import styles from "./styles";
import jwt_decode from "jwt-decode";
import { useLazyQuery } from "@apollo/client";
import { BUYER_PROFILE_BY_USERID } from "../../Apollo/queries/queries_user";
import * as storage from "../../Apollo/local-storage";

export default function LaunchScreen() {
  const [getBuyerId, {data, called, error}] = useLazyQuery(BUYER_PROFILE_BY_USERID, {
    variables: { userProfileId: global.userProfileId },
    context: {
      headers: {
        isPrivate: true,
      },
    },
  });

  useEffect(() => {    
    if (error) {
      global.buyerId = "9fcbb7cb-5354-489d-b358-d4e2bf386ff3";
      NavigationService.navigate("MainScreen");
    }

    if (called && data) {
      const {
        buyerProfileByUserId: { buyerId } = {},
      } = data;

      if (buyerId) {
        global.buyerId = buyerId;
        NavigationService.navigate("MainScreen");

      } else {
        global.buyerId = "9fcbb7cb-5354-489d-b358-d4e2bf386ff3";
        NavigationService.navigate("MainScreen");
      }
    }

  }, [data, called, error])

  const autoSignIn = useCallback(async () => {
    //get username and possword from localStorage
    const username = await getLocalStorageValue(LOCAL_STORAGE_USER_NAME);
    const password = await getLocalStorageValue(LOCAL_STORAGE_USER_PASSWORD);
    //NavigationService.navigate("MainScreen");
    //if username && password exits,we can login auto
    if (username && password) {
      //just for test
      //NavigationService.navigate("MainScreen");
      const { data } = await runTokenFlow({ username, password });
      let access_token = data.access_token;
      if (access_token === "undefined") {
        console.log("no access token");
      }
      userProfileVar({
        email: username,
        isAuth: true,
      });
      let decoded = jwt_decode(access_token);
      global.access_token = access_token;
      global.userProfileId = decoded.sub;
      getBuyerId();

      setLocalStorageValue(LOCAL_STORAGE_TOKEN_KEY, access_token);
    } else {
      const result = await checkBuyerIdExists();
      if (result) {
        NavigationService.navigate("MainScreen");
      } else {
        setTimeout(() => {
          //this.props.navigation.navigate('OnboardingScreen')
          NavigationService.navigate("OnboardingScreen");
        }, 2000);
      }
      // setTimeout(() => {
      //   //this.props.navigation.navigate('OnboardingScreen')
      //   NavigationService.navigate("OnboardingScreen");
      // }, 2000);
    }
  }, [getBuyerId]);
  /** for now only guests end up here */
  const checkBuyerIdExists = async () => {
    // lets check if a buyer id exists
    // first check for an existing buyer id
    let bid = await storage.getLocalStorageValue(storage.GUEST_BUYER_ID_KEY);
    if (bid) {
      console.log(
        `OnboardingScreen checkBuyerIdExists found a bid in local storage ${bid}`
      );
      global.buyerId = bid;
      return true;
    } else {
      return false;
    }
  };
  //when app open,when can do auto login
  useEffect(() => {
    autoSignIn();
  }, [autoSignIn]);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor={"rgba(0,0,0,0.0)"}
      />
      <Image source={Images.logo2} style={styles.logo} resizeMode={"contain"} />
    </View>
  );
}
