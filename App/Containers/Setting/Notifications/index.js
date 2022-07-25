import React, { useState } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import AppConfig from "../../../Config/AppConfig";
import { vs, s, ScaledSheet } from "react-native-size-matters";
import fonts from "../../../Themes/Fonts";
import colors from "../../../Themes/Colors";

import NavigationService from "../../../Navigation/NavigationService";
import { Switch } from "../../../Components";

const datas = [
  {
    title: "Allow notifications",
    smsValue: true,
    whatsappValue: true,
    key: "ANotification",
  },
  {
    title: "Orders",
    smsValue: true,
    whatsappValue: true,
    key: "Orders",
  },
  {
    title: "Promotional",
    smsValue: true,
    whatsappValue: true,
    key: "Promotional",
  },
  {
    title: "Listings Status",
    smsValue: true,
    whatsappValue: true,
    key: "LStatus",
  },
];

function index(props) {
  const [isDisableSms, setIsDisableSms] = useState(false);
  const [isDisableWhatsapp, setIsDisableWhatsapp] = useState(false);
  const [dataSwitch, setDataSwitch] = useState(datas);
  // const [isactive,setIsactive] = useState(false)

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
      {dataSwitch.map((item, index) => {
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
                    if (item.key === "ANotification" && value === false) {
                      let tmp = [];
                      dataSwitch.map((val, i) => {
                        let obj = {};
                        obj.title = val.title;
                        obj.key = val.key;
                        obj.smsValue = false;
                        obj.whatsappValue = val.whatsappValue;
                        tmp.push(obj);
                      });
                      setDataSwitch(tmp);
                      setIsDisableSms(true);
                    } else if (item.key === "ANotification" && value === true) {
                      let tmp = [];
                      dataSwitch.map((val, i) => {
                        let obj = {};
                        obj.title = val.title;
                        obj.key = val.key;
                        obj.smsValue = true;
                        obj.whatsappValue = val.whatsappValue;
                        tmp.push(obj);
                      });
                      setDataSwitch(tmp);
                      setIsDisableSms(false);
                    }
                  }}
                  active={item.smsValue}
                  // disabled={item.key == "ANotification" ? false : true}
                />
              </View>

              <View style={{ flex: 1, alignItems: "center" }}>
                <Switch
                  onSwitch={(value) => {
                    if (item.key === "ANotification" && value === false) {
                      let tmp = [];
                      dataSwitch.map((val, i) => {
                        let obj = {};
                        obj.title = val.title;
                        obj.key = val.key;
                        obj.whatsappValue = false;
                        obj.smsValue = val.smsValue;
                        tmp.push(obj);
                      });
                      setDataSwitch(tmp);
                      setIsDisableWhatsapp(true);
                    } else if (item.key === "ANotification" && value === true) {
                      let tmp = [];
                      dataSwitch.map((val, i) => {
                        let obj = {};
                        obj.title = val.title;
                        obj.key = val.key;
                        obj.whatsappValue = true;
                        obj.smsValue = val.smsValue;
                        tmp.push(obj);
                      });
                      setDataSwitch(tmp);
                      setIsDisableWhatsapp(false);
                    }
                  }}
                  active={item.whatsappValue}
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
