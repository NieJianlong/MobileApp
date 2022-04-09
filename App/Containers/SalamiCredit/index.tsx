import React, { useRef, useState, useContext } from "react";
import {
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { vs, s } from "react-native-size-matters";
import { AppBar, BottomSheet, Button } from "../../Components";
import { Colors } from "../../Themes";
import styles from "./styles";
import colors from "../../Themes/Colors";
import images from "../../Themes/Images";
import AppConfig from "../../Config/AppConfig";
import TextTip from "../../Components/EmptyReminder";
import metrics from "../../Themes/Metrics";
import { AlertContext } from "../Root/GlobalContext";
import { useGetBuyerSalamiWalletBalanceQuery } from "../../../generated/graphql";

const shareIcons = [
  { src: images.userShareIcon1Image, onPress: () => {} },
  { src: images.userShareIcon2Image, onPress: () => {} },
  { src: images.userShareIcon3Image, onPress: () => {} },
  { src: images.userShareIcon4Image, onPress: () => {} },
  { src: images.userShareIcon5Image, onPress: () => {} },
  { src: images.userShareIcon6Image, onPress: () => {} },
];
const invitedUsers = [
  {
    email: "usernme.lastname@mail.com",
    msg: "hasn’t registered yet",
    avatar: "https://measure.3vyd.com/uPic/Grey 32.png",
  },
  {
    email: "usernme.lastname@mail.com",
    msg: "hasn’t registered yet",
    avatar: "https://measure.3vyd.com/uPic/Grey 32.png",
  },
];

function SalamiCredit(props) {
  const { dispatch } = useContext(AlertContext);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <SafeAreaView
        style={styles.safeArea}
        edges={["top", "right", "left", "bottom"]}
      >
        <AppBar />
        {listHeader(dispatch)}
      </SafeAreaView>
    </View>
  );
}
function listHeader(dispatch) {
  const { data } = useGetBuyerSalamiWalletBalanceQuery({
    context: {
      headers: {
        isPrivate: true,
      },
    },
  });
  const tips = {
    textTip: "About Salami Credit",
    subTextTip:
      "When a new user applies your unique code, they get a promotion for their first order. After they apply you code and place their first order, you will earn a promotion for future use.",
    needButton: true,
    btnMsg: "OK",
    onPress: () => {
      dispatch({
        type: "changSheetState",
        payload: {
          showSheet: false,
        },
      });
    },
    callback: () => {},
  };

  return (
    <View style={styles.bodyContainer}>
      <Text style={styles.heading2Bold}>Salami Wallet</Text>
      <View style={styles.tipContainer}>
        <View style={styles.balanceContainer}>
          <Text style={[styles.balanceTipTxt, { color: colors.grey60 }]}>
            BALANCE
          </Text>
          <Text style={styles.balanceTxt}>
            ${data?.getBuyerSalamiWalletBalance?.walletBalance}
          </Text>
          <Text style={styles.useBalanceTxt}>USE CREDIT NOW</Text>
        </View>
      </View>
      <View style={styles.tipContainer}>
        <View style={styles.content}>
          <Text style={[styles.balanceTipTxt, { fontSize: s(16) }]}>
            Your Salami Wallet lets you buy items faster!
          </Text>
          <Text
            style={[
              styles.balanceTipTxt,
              {
                fontSize: s(14),
                color: colors.grey60,
                marginTop: vs(30),
              },
            ]}
          >
            {
              "Fill up your wallet using your favourite payment method and keep it safe in your wallet. Then, when you’re ready, pay instantly with your wallet."
            }
          </Text>
          <Text
            style={[
              styles.balanceTipTxt,
              {
                fontSize: s(14),
                color: colors.grey60,
                marginTop: vs(30),
              },
            ]}
          >
            {
              "Your wallet will also store any credit you receive from refunds or as promotional credit. It will always be stored here, ready to be used on future purchases!"
            }
          </Text>

          {/* <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text
              style={[
                styles.balanceTipTxt,
                {
                  fontSize: s(15),
                  color: colors.grey60,
                  textAlign: "center",
                },
              ]}
            >
              order.
            </Text>
            <TouchableOpacity
              onPress={() => {
                dispatch({
                  type: "changSheetState",
                  payload: {
                    showSheet: true,
                    height: 300,
                    children: () => {
                      const data = {
                        textTip: "Paying during delivery",
                        subTextTip:
                          "This is an explanatory text about this feature, lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professo.",
                        needButton: true,
                        btnMsg: "OK",
                        onPress: () => {
                          dispatch({
                            type: "changSheetState",
                            payload: {
                              showSheet: false,
                            },
                          });
                        },
                      };
                      return (
                        <View
                          style={{
                            flex: 2,
                            justifyContent: "flex-end",
                          }}
                        >
                          <View style={{ flex: 1, marginLeft: s(-15) }}>
                            <TextTip {...tips} />
                          </View>
                        </View>
                      );
                    },
                  },
                });
              }}
            >
              <Text
                style={[
                  styles.balanceTipTxt,
                  {
                    fontSize: s(15),
                    color: colors.secondary00,
                    textAlign: "center",
                  },
                ]}
              >
                Details
              </Text>
            </TouchableOpacity>
          </View> */}
        </View>
        {/* <View style={styles.iconsContainer}>
          {shareIcons.map((item, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => item.onPress()}>
                <Image source={item.src} style={styles.shareIcon} />
              </TouchableOpacity>
            );
          })}
        </View> */}
      </View>
      {/* <View style={{ marginTop: vs(50) }}>
        <Text style={[styles.heading2Bold, { fontSize: s(15) }]}>
          Pending invitations
        </Text>
      </View> */}
      {/* <View style={{ marginTop: vs(50) }}>
        <Button
          onPress={() => {
            //  NavigationService.navigate("ReturnProductStep3Screen");
          }}
          color={colors.primary}
          text="ADD MONEY TO MY WALLET"
        />
      </View> */}
    </View>
  );
}
export default SalamiCredit;
