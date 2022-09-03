import React, { Component, useCallback, useEffect } from "react";
import { View, Image } from "react-native";
import { userProfileVar } from "../../Apollo/cache";
import { runTokenFlow } from "../../Apollo/jwt-request";
import {
  getLocalStorageValue,
  LOCAL_STORAGE_TOKEN_KEY,
  LOCAL_STORAGE_USER_NAME,
  LOCAL_STORAGE_USER_PASSWORD,
  LOCAL_STORAGE_USER_PROFILE,
  setLocalStorageValue,
} from "../../Apollo/local-storage";
import NavigationService from "../../Navigation/NavigationService";

import { Images } from "../../Themes";
import styles from "./styles";
import jwt_decode from "jwt-decode";
import { useLazyQuery, useReactiveVar } from "@apollo/client";
import * as storage from "../../Apollo/local-storage";
import LottieView from "lottie-react-native";
import { t } from "react-native-tailwindcss";
import { StatusBar } from "expo-status-bar";
import { useGetSellerProfileLazyQuery } from "../../../generated/graphql";

export default function LaunchScreen() {
  const [getBuyerId] = useGetSellerProfileLazyQuery({
    variables: { userProfileId: global.userProfileId },
    context: {
      headers: {
        isPrivate: true,
      },
    },
    onCompleted: (res) => {
      //server often breakon，we should use a constant for testing
      // const {
      //   sellerProfileByUserId: { sellerId },
      // } = res;
      alert(JSON.stringify(res));
      // global.buyerId = sellerId;
      // NavigationService.navigate("MainScreen");
    },
    onError: (res) => {
      //server often breakon，we should use a constant for testing
      global.buyerId = "9fcbb7cb-5354-489d-b358-d4e2bf386ff3";
      NavigationService.navigate("MainScreen");
    },
  });

  const autoSignIn = useCallback(async () => {
    //get username and possword from localStorage
    const username = await getLocalStorageValue(LOCAL_STORAGE_USER_NAME);
    const password = await getLocalStorageValue(LOCAL_STORAGE_USER_PASSWORD);
    const userData = await getLocalStorageValue(LOCAL_STORAGE_USER_PROFILE);
    //if username && password exits,we can login auto
    if (username && password) {
      //just for test
      try {
        const { data } = await runTokenFlow({ username, password });
        let access_token = data.access_token;
        if (access_token === "undefined") {
          console.log("no access token");
        }
        userProfileVar({
          ...JSON.parse(userData),
          isAuth: true,
        });
        let decoded = jwt_decode(access_token);
        global.access_token = access_token;
        global.userProfileId = decoded.sub;

        // getBuyerId();
        NavigationService.navigate("MainScreen");
        setLocalStorageValue(LOCAL_STORAGE_TOKEN_KEY, access_token);
      } catch (error) {
        NavigationService.navigate("OnboardingScreen");
      }
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
    <LottieView
      source={require("./animation_icon.json")}
      autoPlay
      loop={false}
      style={[t.bgPrimary]}
    />
  );
}
