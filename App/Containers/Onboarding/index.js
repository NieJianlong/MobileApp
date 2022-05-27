import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
  Text,
} from "react-native";
import Video from "react-native-video";
import { SafeAreaView } from "react-native-safe-area-context";

import Button from "../../Components/Button";

import { Colors, Fonts, Images } from "../../Themes";
import styles from "./styles";
import { vs } from "react-native-size-matters";
import NavigationService from "../../Navigation/NavigationService";
import { useMutation } from "@apollo/client";
import * as aQM from "./gql/onboard_mutations";
import * as storage from "../../Apollo/local-storage";

import { AlertContext } from "../Root/GlobalContext";
import { t } from "react-native-tailwindcss";
import AppConfig from "../../Config/AppConfig";

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
      NavigationService.navigate("MainScreen", { screen: "ExploreScreen" });
      setBIdExists(true);
    } else {
      guestBuyerId({
        variables: { request: BuyerProfileRequestForCreate },
      });
    }
  };

  useEffect(() => {
    checkBuyerIdExists();
    return () => {
      // unmount here
    };
  }, [props]);
  const { width, height } = useWindowDimensions();

  /**
   * call back for the onCompleted CREATE_GUEST_BUYER mutation
   * update local storage and navigate
   */
  const onGetGuestBuyerId = async (data) => {
    dispatch({ type: "hideloading" });
    let buyerId = data.createGuestBuyer.buyerId;
    await storage.setLocalStorageValue(storage.GUEST_BUYER_ID_KEY, buyerId);
    global.buyerId = buyerId;
  };

  const togglePlayPauseVideo = () => {
    setIsPlaying(!isPlaying);
  };
  return (
    <View style={styles.container}>
      <Video
        ref={(ref) => (player = ref)}
        source={require("../../../assets/video/video.mp4")}
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
          <View style={[t.flexRow, t.wFull, t.justifyCenter]}>
            <Button
              text={"Sign in"}
              onPress={() => NavigationService.navigate("LoginScreen")}
              style={[{ width: width / 2 - 60 }]}
            />
            <Text
              style={[
                t.textWhite,
                t.mL6,
                t.mT4,
                {
                  fontSize: AppConfig.fontSize,
                  fontFamily: Fonts.semibold,
                },
              ]}
            >
              or
            </Text>
            <TouchableOpacity
              onPress={() => {
                NavigationService.navigate("RegisterScreen");
              }}
            >
              <Text
                style={[
                  t.textPrimary,
                  t.mL6,
                  t.mT4,
                  {
                    fontSize: AppConfig.fontSize,
                    fontFamily: Fonts.semibold,
                    textDecorationLine: "underline",
                  },
                ]}
              >
                Register
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: vs(32) }} />
          <Button
            text={"Continue as guest"}
            backgroundColor={"transparent"}
            textColor={Colors.white}
            onPress={async () => {
              // call the CREATE_GUEST_BUYER mutation see onGetGuestBuyerId callback
              let bid = await storage.getLocalStorageValue(
                storage.GUEST_BUYER_ID_KEY
              );
              // if (bid) {
              //   console.log(
              //     `OnboardingScreen checkBuyerIdExists found a bid in local storage ${bid}`
              //   );
              if (bid) {
                global.buyerId = bid;
              }

              NavigationService.navigate("MainScreen", {
                screen: "ExploreScreen",
              });
              // } else {
              //   dispatch({ type: "loading" });
              //   guestBuyerId({
              //     variables: { request: BuyerProfileRequestForCreate },
              //   });
              // }
            }}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

export default OnboardingScreen;
