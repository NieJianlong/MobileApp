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
import { useBuyerProfileByUserIdLazyQuery } from "../../../generated/graphql";
import LottieView from "lottie-react-native";
import { t } from "react-native-tailwindcss";
import { StatusBar } from "expo-status-bar";

export default function LaunchScreen() {
  const [getBuyerId] = useBuyerProfileByUserIdLazyQuery({
    variables: { userProfileId: global.userProfileId },
    context: {
      headers: {
        isPrivate: true,
      },
    },
    onCompleted: (res) => {
      //server often breakon，we should use a constant for testing
      userProfileVar({
        userId: res?.buyerProfileByUserId?.userId ?? "",
        buyerId: res?.buyerProfileByUserId?.buyerId ?? "",
        userName: res?.buyerProfileByUserId?.userName ?? "",
        email: res?.buyerProfileByUserId?.email ?? "",
        phone: res?.buyerProfileByUserId?.phoneNumber ?? "",
        isAuth: true,
        billingDetails: res?.buyerProfileByUserId?.billingDetails,
        billingDetailsId:
          res.buyerProfileByUserId?.billingDetails?.billingDetailsId,
        firstName: res.buyerProfileByUserId?.firstName ?? "",
        lastName: res.buyerProfileByUserId?.lastName ?? "",
      });

      const {
        buyerProfileByUserId: { buyerId },
      } = res;
      global.buyerId = buyerId;
      setTimeout(() => {
        NavigationService.navigate("MainScreen", { screen: "ExploreScreen" });
      }, 3000);
    },
    onError: (res) => {},
  });

  const autoSignIn = useCallback(async () => {
    debugger;
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
        let decoded = jwt_decode(access_token);
        console.log("====================================");
        console.log(decoded.realm_access.roles);
        console.log("====================================");

        global.access_token = access_token;
        global.userProfileId = decoded.sub;
        getBuyerId();

        setLocalStorageValue(LOCAL_STORAGE_TOKEN_KEY, access_token);
      } catch (error) {
        storage.setLocalStorageValue(storage.LOCAL_STORAGE_USER_NAME, "");
        storage.setLocalStorageValue(storage.LOCAL_STORAGE_USER_PASSWORD, "");
        const isLogedOut = await getLocalStorageValue(
          storage.REGISTERED_USER_LOGOUT
        );
        if (isLogedOut) {
          NavigationService.navigate("LoginScreen");
          return;
        }
        const result = await checkBuyerIdExists();
        if (result) {
          setTimeout(() => {
            NavigationService.navigate("MainScreen", {
              screen: "ExploreScreen",
            });
          }, 3000);
        } else {
          setTimeout(() => {
            //this.props.navigation.navigate('OnboardingScreen')
            NavigationService.navigate("OnboardingScreen");
          }, 4000);
        }
      }
    } else {
      const isLogedOut = await getLocalStorageValue(
        storage.REGISTERED_USER_LOGOUT
      );
      if (isLogedOut) {
        NavigationService.navigate("LoginScreen");
        return;
      }
      const result = await checkBuyerIdExists();
      if (result) {
        setTimeout(() => {
          NavigationService.navigate("MainScreen", { screen: "ExploreScreen" });
        }, 3000);
      } else {
        setTimeout(() => {
          //this.props.navigation.navigate('OnboardingScreen')
          NavigationService.navigate("OnboardingScreen");
        }, 4000);
      }
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
