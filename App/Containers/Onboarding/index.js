import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import Video from "react-native-video";
import { SafeAreaView } from "react-native-safe-area-context";

import Button from "../../Components/Button";

import { Colors, Images } from "../../Themes";
import styles from "./styles";
import { vs } from "react-native-size-matters";
import NavigationService from "../../Navigation/NavigationService";
import { useMutation } from "@apollo/client";
import * as aQM from "./gql/onboard_mutations";
import * as storage from "../../Apollo/local-storage";

import { AlertContext } from "../Root/GlobalContext";

function OnboardingScreen(props) {
  const [bIdExists, setBIdExists] = useState(false);
  const { dispatch } = useContext(AlertContext);

  /** this is enough to create a guest buyer
   *
   * TO-DO remove use uniquie id only in local storage
   */
  let BuyerProfileRequestForCreate = {
    // guestBuyer: true,  // removed from backend schema wtf
  };

  let [isPlaying, setIsPlaying] = useState(true);

  // TO-DO remove use uniquie id only in local storage
  // however keep this code as they are just aslikley to roll back
  // and say we will use guest buyer id again
  // useMutation works here, I think when the code becomes to large the useMutation stops working
  // we can only use useMutation with public endpoints
  /**
   * CREATE_GUEST_BUYER is a public endpoint
   * see './gql/onboard_mutations'
   *
   */
  const [guestBuyerId, { data, error }] = useMutation(aQM.CREATE_GUEST_BUYER, {
    onCompleted: (data) => onGetGuestBuyerId(data),
    onError: (error) => console.error("Error creating a guest Id", error),
  });

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
      setBIdExists(true);
    }
  };

  useEffect(() => {
    checkBuyerIdExists();
    return () => {
      // unmount here
    };
  }, [props]);

  /**
   * call back for the onCompleted CREATE_GUEST_BUYER mutation
   * update local storage and navigate
   */
  const onGetGuestBuyerId = async (data) => {
    dispatch({ type: "hideloading" });
    let buyerId = data.createGuestBuyer.buyerId;
    await storage.setLocalStorageValue(storage.GUEST_BUYER_ID_KEY, buyerId);
    global.buyerId = buyerId;
    NavigationService.navigate("MainScreen");
  };

  const togglePlayPauseVideo = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor={"rgba(0,0,0,0.0)"}
      />
      <Video
        ref={(ref) => (player = ref)}
        source={{ uri: "http://www.exit109.com/~dnn/clips/RW20seconds_1.mp4" }}
        style={styles.backgroundVideo}
        resizeMode={"cover"}
        repeat
        paused={!isPlaying}
        muted
      />
      <SafeAreaView
        style={styles.safeArea}
        edges={["top", "right", "left", "bottom"]}
      >
        <View style={styles.bodyContainer}>
          <TouchableOpacity
            onPress={togglePlayPauseVideo}
            style={styles.playButton}
          >
            <Image
              style={styles.icon}
              resizeMode={"contain"}
              source={isPlaying ? Images.pause : Images.play}
            />
          </TouchableOpacity>

          <Button
            text={"SIGN IN"}
            onPress={() => NavigationService.navigate("LoginScreen")}
          />

          <View style={{ height: vs(12) }} />

          <Button
            text={"CONTINUE"}
            backgroundColor={Colors.white}
            textColor={Colors.black}
            onPress={() => {
              // call the CREATE_GUEST_BUYER mutation see onGetGuestBuyerId callback
              if (bIdExists) {
                console.log(
                  "OnboardingScreen CONTINUE found guest bid in local storage"
                );
                NavigationService.navigate("MainScreen");
              } else {
                console.log("OnboardingScreen CONTINUE create  guest bid");
                dispatch({ type: "loading" });
                guestBuyerId({
                  variables: { request: BuyerProfileRequestForCreate },
                });
              }
            }}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

export default OnboardingScreen;
