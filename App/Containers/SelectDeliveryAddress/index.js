import React, { useState, useContext } from "react";
import {
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScaledSheet, s, vs } from "react-native-size-matters";
import { AppBar, Button, RightButton, Switch } from "../../Components";
import styles from "./styles";
import NavigationService from "../../Navigation/NavigationService";
import colors from "../../Themes/Colors";
import images from "../../Themes/Images";
import AppConfig from "../../Config/AppConfig";
import metrics from "../../Themes/Metrics";
import fonts from "../../Themes/Fonts";
import { AddressTestData } from "../UserInfo/Config";
import { AlertContext } from "../Root/GlobalContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackActions } from "@react-navigation/native";
/**
 * @description: The user selects the shipping address page
 * @param {*} props
 * @return {*}
 */
function SelectDeliveryAddress(props) {
  const { params } = useRoute();
  const [selectIndex, setSelectIndex] = useState(999);
  const context = useContext(AlertContext);
  const popAction = StackActions.pop(2);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <SafeAreaView
        style={styles.safeArea}
        edges={["top", "right", "left", "bottom"]}
      >
        <AppBar
          rightButton={() => (
            <RightButton
              title="SAVE"
              onPress={() => {
                navigation.dispatch(popAction);
                context.dispatch({
                  type: "changAlertState",
                  payload: {
                    visible: true,
                    message:
                      "You have successfully activated 1 click purchasing method.",
                    color: colors.success,
                    title: "1 Click Purchasing Activated!",
                  },
                });
                if (typeof params.callback === "function") {
                  params.callback({});
                }
              }}
            />
          )}
        />

        <View style={styles.bodyContainer}>
          <Text style={[styles.heading2Bold, { fontSize: s(22) }]}>
            Select a default delivery address
          </Text>

          <FlatList
            data={AddressTestData}
            style={{ height: metrics.screenHeight - vs(180) }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity onPress={() => setSelectIndex(index)}>
                  <View
                    style={[
                      styles1.item,
                      { borderWidth: selectIndex == index ? 2 : 0 },
                    ]}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text style={styles1.itemTitle}>{item.title}</Text>
                      {item.isDefault && (
                        <Image
                          style={styles1.icon}
                          source={images.check}
                        ></Image>
                      )}
                    </View>
                    <View>
                      <Text style={styles1.itemSubTitle}>{item.subTitle}</Text>
                    </View>
                    <View style={styles1.itemBottom}>
                      {item.isDefault ? (
                        <View style={styles1.itemTipsContainer}>
                          <Text style={styles1.itemTips}>
                            Default payment method
                          </Text>
                        </View>
                      ) : (
                        <TouchableOpacity style={styles1.itemSetDefault}>
                          <Text style={styles1.setDefaultText}>
                            SET AS DEFAULT
                          </Text>
                        </TouchableOpacity>
                      )}

                      <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity onPress={(item) => doEdit(item)}>
                          <Image
                            style={styles1.editImage}
                            source={images.userAddressEditImage}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={(item) => {
                            //();
                          }}
                        >
                          <Image
                            style={styles1.editImage}
                            source={images.userAddressTrashImage}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item, index) => `listItem${index}`}
          />
        </View>
        <SafeAreaView
          style={{
            position: "absolute",
            bottom: 10,
            right: 0,
            left: 0,
            paddingHorizontal: AppConfig.paddingHorizontal,
          }}
        >
          <Button
            onPress={(callback) => {
              NavigationService.navigate("AddNewAddressScreen", {
                callback,
                title: "Add new address",
              });
            }}
            textColor="white"
            text="Add new address"
            backgroundColor={colors.grey80}
          ></Button>
        </SafeAreaView>
      </SafeAreaView>
    </View>
  );
}

export default SelectDeliveryAddress;
const styles1 = ScaledSheet.create({
  itemBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemTipsContainer: {
    marginTop: "5@vs",
    backgroundColor: colors.secondary01,
    borderRadius: "12@s",
    paddingHorizontal: "10@s",
  },
  setDefaultText: {
    fontFamily: fonts.primary,
    fontSize: "16@s",
    fontWeight: "600",
    color: colors.secondary00,
  },
  itemSetDefault: {
    marginTop: "12@vs",

    height: "24@vs",
    borderRadius: "12@s",
  },
  itemTips: {
    fontSize: "12@s",
    fontFamily: fonts.primary,
    color: colors.secondary00,
    fontWeight: "400",

    backgroundColor: "transparent",
    textAlign: "center",
  },
  credit: {
    width: "100%",
    maxHeight: "80@vs",
    resizeMode: "contain",
    marginVertical: "25@vs",
  },
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },

  itemTitle: {
    fontSize: "14@s",
    fontFamily: fonts.primary,
    color: colors.black,
    fontWeight: "600",
  },
  itemSubTitle: {
    fontSize: "14@s",
    fontFamily: fonts.primary,
    color: colors.grey80,
  },
  paytypeIcon: {
    width: "26@s",
    height: "26@s",
    resizeMode: "contain",
  },
  icon: {
    width: "20@s",
    height: "20@s",
    marginLeft: "12@s",
    resizeMode: "contain",
  },
  editImage: {
    width: "24@s",
    height: "24@s",
    marginLeft: "12@s",
    resizeMode: "contain",
  },
  container: {
    flex: 1,
  },
  headerText: {
    color: "white",
  },
  item: {
    marginTop: "15@vs",
    backgroundColor: colors.white,
    borderRadius: "16@s",
    height: "122@vs",
    paddingHorizontal: AppConfig.paddingHorizontal,
    justifyContent: "center",
    borderColor: "#409AEF",
  },
});
