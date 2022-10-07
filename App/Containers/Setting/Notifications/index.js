import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import AppConfig from "../../../Config/AppConfig";
import { vs, s, ScaledSheet } from "react-native-size-matters";
import fonts from "../../../Themes/Fonts";
import colors from "../../../Themes/Colors";

import NavigationService from "../../../Navigation/NavigationService";
import { Switch } from "../../../Components";
import {
  useNotificationPreferencesByBuyerIdQuery,
  useSaveBuyerDeviceMutation,
  useUpdateBuyerNotificationPreferencesMutation,
} from "../../../../generated/graphql";
import Login from "../../Login";

// let datas = [];

// let datas = [
//   {
//     title: "Allow notifications",
//     smsValue: true,
//     whatsappValue: true,
//     key: "ANotification",
//   },
//   {
//     title: "Orders",
//     smsValue: true,
//     whatsappValue: true,
//     key: "Orders",
//   },
//   {
//     title: "Promotional",
//     smsValue: true,
//     whatsappValue: true,
//     key: "Promotional",
//   },
//   {
//     title: "Listings Status",
//     smsValue: true,
//     whatsappValue: true,
//     key: "LStatus",
//   },
// ];

function index(props) {
  const [isDisableSms, setIsDisableSms] = useState(false);
  const [isDisableWhatsapp, setIsDisableWhatsapp] = useState(false);
  const [dataSwitch, setDataSwitch] = useState(null);
  const [resData, setResData] = useState(null);
  const [allowAllSMSNotification, setAllowAllSMSNotification] = useState(true);
  const [allowAllWhatAppNotification, setAllowAllWhatAppNotification] =
    useState(true);

  const { loading, data, error } = useNotificationPreferencesByBuyerIdQuery({
    variables: {
      buyerId: global.buyerId,
    },
    context: {
      headers: {
        isPrivate: true,
      },
    },
    fetchPolicy: "network-only",
    onCompleted: (res) => {
      setResData(res?.notificationPreferencesByBuyerId);
      let datas = [];
      res.notificationPreferencesByBuyerId.map((item) => {
        switch (item.notificationGroupType) {
          case "ORDER": {
            delete item.notificationGroupType;
            delete item.__typename;
            datas.push({
              title: "Orders",
              key: "Orders",
              ...item,
            });
            break;
          }
          case "PROMOTION": {
            delete item.notificationGroupType;
            delete item.__typename;
            datas.push({
              title: "Promotional",
              key: "Promotional",
              ...item,
            });
            break;
          }
          case "LISTING": {
            delete item.notificationGroupType;
            delete item.__typename;
            datas.push({
              title: "Listings Status",
              key: "LStatus",
              ...item,
            });
            break;
          }
        }
      });
      setDataSwitch(datas.reverse());

      // setDataSwitch(res?.notificationPreferencesByBuyerId);
    },
    onError: (err) => {
      console.log("NotificationPreferences error--->", err);
    },
  });

  useEffect(() => {
    setAllowNotification();
  }, [dataSwitch]);

  const [UpdateBuyerNotificationPreferences] =
    useUpdateBuyerNotificationPreferencesMutation();

  const updateNotification = (objArray) => {
    let reqArray = objArray.map((item) => {
      let copyObj = { ...item };
      delete copyObj.title;
      delete copyObj.key;
      return copyObj;
    });


    UpdateBuyerNotificationPreferences({
      variables: {
        preferences: reqArray,
      },
      context: {
        headers: {
          isPrivate: true,
        },
      },
      onCompleted: (res) => {
        console.log("Update Buyer Notification Preferences Response", res);
      },
      onError: (err) => {
        console.log("Update Buyer Notification Preferences error", err);
      },
    });
  };

  const setAllowNotification = () => {
    if (dataSwitch) {
      if (
        dataSwitch[0].smsEnabled === false &&
        dataSwitch[1].smsEnabled === false &&
        dataSwitch[2].smsEnabled === false
      ) {
        setAllowAllSMSNotification(false);
      } else if (
        dataSwitch[0].smsEnabled === true &&
        dataSwitch[1].smsEnabled === true &&
        dataSwitch[2].smsEnabled === true
      ) {
        setAllowAllSMSNotification(true);
      }
      // else{
      //   setAllowAllSMSNotification(true);
      // }

      if (
        dataSwitch[0].whatsappEnabled === false &&
        dataSwitch[1].whatsappEnabled === false &&
        dataSwitch[2].whatsappEnabled === false
      ) {
        setAllowAllWhatAppNotification(false);
      } else if (
        dataSwitch[0].whatsappEnabled === true &&
        dataSwitch[1].whatsappEnabled === true &&
        dataSwitch[2].whatsappEnabled === true
      ) {
        setAllowAllWhatAppNotification(true);
      }
      // else{
      //   setAllowAllWhatAppNotification(true);
      // }
    }
  };
  return (
    <ScrollView>
      <View style={{ padding: AppConfig.paddingHorizontal }}>
        <Text
          style={{
            fontFamily: fonts.primary,
            color: colors.grey80,
            fontWeight: "600",
            fontSize: s(16),
          }}
        >
          Control how you get notifications
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          backgroundColor: "white",
          height: vs(46),
        }}
      >
        <View style={{ flex: 2 }} />
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text
            style={[styles.title, { fontSize: s(14), fontWeight: "normal" }]}
          >
            SMS
          </Text>
        </View>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text
            style={[styles.title, { fontSize: s(14), fontWeight: "normal" }]}
          >
            WhatsApp
          </Text>
        </View>
      </View>
      <TouchableOpacity
        key={index}
        onPress={() => {
          // NavigationService.navigate("SelectCountryOrLanguageScreen", {
          //   ...item,
          // });
        }}
        activeOpacity={0.99}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "white",
            height: vs(46),
            alignItems: "center",
          }}
        >
          <View style={{ flex: 2 }}>
            <Text
              style={[
                styles.title,
                {
                  fontSize: s(14),
                  fontWeight: "normal",
                  paddingHorizontal: AppConfig.paddingHorizontal,
                },
              ]}
            >
              Allow notification
            </Text>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Switch
              onSwitch={(value) => {
                setAllowAllSMSNotification(value);
                let tmp = dataSwitch.map((val, i) => {
                  let obj = { ...val };
                  obj.smsEnabled = value;
                  return obj;
                });
                setDataSwitch(tmp);
                updateNotification(tmp);
              }}
              active={allowAllSMSNotification}
            />
          </View>

          <View style={{ flex: 1, alignItems: "center" }}>
            <Switch
              onSwitch={(value) => {
                setAllowAllWhatAppNotification(value);

                let tmp = dataSwitch.map((val, i) => {
                  let obj = { ...val };
                  obj.whatsappEnabled = value;
                  return obj;
                  // setIsDisableWhatsap
                });
                setDataSwitch(tmp);
                updateNotification(tmp);
                // setIsDisableWhatsapp(true)
              }}
              active={allowAllWhatAppNotification}
              // disabled={
              //   item.key == "ANotification" ? false : true
              // }
            />
          </View>
        </View>
      </TouchableOpacity>
      {dataSwitch?.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() => {
              // NavigationService.navigate("SelectCountryOrLanguageScreen", {
              //   ...item,
              // });
            }}
            activeOpacity={0.99}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: "white",
                height: vs(46),
                alignItems: "center",
              }}
            >
              <View style={{ flex: 2 }}>
                <Text
                  style={[
                    styles.title,
                    {
                      fontSize: s(14),
                      fontWeight: "normal",
                      paddingHorizontal: AppConfig.paddingHorizontal,
                    },
                  ]}
                >
                  {item.title}
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Switch
                  onSwitch={(value) => {
                    if (item.key === "Orders") {
                      dataSwitch[index].smsEnabled = value;
                      updateNotification([dataSwitch[index]]);
                    } else if (item.key === "Promotional") {
                      dataSwitch[index].smsEnabled = value;
                      updateNotification([dataSwitch[index]]);
                    } else if (item.key === "LStatus") {
                      dataSwitch[index].smsEnabled = value;
                      updateNotification([dataSwitch[index]]);
                    }

                    setAllowNotification();
                  }}
                  active={item.smsEnabled}
                />
              </View>

              <View style={{ flex: 1, alignItems: "center" }}>
                <Switch
                  onSwitch={(value) => {
                    if (item.key === "Orders") {
                      dataSwitch[index].whatsappEnabled = value;
                      updateNotification([dataSwitch[index]]);
                    } else if (item.key === "Promotional") {
                      dataSwitch[index].whatsappEnabled = value;
                      updateNotification([dataSwitch[index]]);
                    } else if (item.key === "LStatus") {
                      dataSwitch[index].whatsappEnabled = value;
                      updateNotification([dataSwitch[index]]);
                    }

                    setAllowNotification();
                  }}
                  active={item.whatsappEnabled}
                  // disabled={
                  //   item.key == "ANotification" ? false : true
                  // }
                />
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

export default index;
const styles = ScaledSheet.create({
  title: {
    fontFamily: fonts.primary,
    fontSize: "16@s",
    color: colors.black,
    fontWeight: "600",
  },
});
