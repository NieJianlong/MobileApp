import React from "react";
import { ScaledSheet, vs } from "react-native-size-matters";
import { Button, Switch } from "../../../Components";
import AppConfig from "../../../Config/AppConfig";
import { View, FlatList, Text, Image, SafeAreaView } from "react-native";
import images from "../../../Themes/Images";
import { TouchableOpacity } from "react-native-gesture-handler";
import colors from "../../../Themes/Colors";
import fonts from "../../../Themes/Fonts";
import Fonts from "../../../Themes/Fonts";

export default function AddressItem(
  item,
  showSheet = () => {},
  setDefault,
  doEdit,
  doDelete
) {
  return (
    <View style={{ paddingHorizontal: AppConfig.paddingHorizontal }}>
      <View style={[styles.item, { height: vs(122) }]}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          {item.isDefault && (
            <Image style={styles.icon} source={images.check}></Image>
          )}
        </View>
        <View>
          <Text style={styles.itemSubTitle}>{item.subTitle}</Text>
        </View>

        <View style={styles.itemBottom}>
          {item.isDefault ? (
            <View style={styles.itemTipsContainer}>
              <Text style={styles.itemTips}>Default address</Text>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.itemSetDefault}
              onPress={setDefault}
            >
              <Text style={styles.setDefaultText}>SET AS DEFAULT</Text>
            </TouchableOpacity>
          )}
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={(item) => {
                doEdit(item);
              }}
            >
              <Image
                style={styles.editImage}
                source={images.userAddressEditImage}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={(item) => {}}>
              <Image
                style={styles.editImage}
                source={images.userAddressTrashImage}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    height: "100@s",
    backgroundColor: colors.background,
  },
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
    fontFamily: Fonts.primary,
    color: colors.secondary00,
    fontWeight: "400",

    backgroundColor: "transparent",
    textAlign: "center",
  },
  itemTitle: {
    fontSize: "14@s",
    fontFamily: Fonts.primary,
    color: colors.black,
    fontWeight: "600",
  },
  itemSubTitle: {
    fontSize: "14@s",
    fontFamily: Fonts.primary,
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
  },
});
