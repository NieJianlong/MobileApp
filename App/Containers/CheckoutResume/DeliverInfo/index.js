import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity, Text, Image } from "react-native";
import AppConfig from "../../../Config/AppConfig";
import { vs, s, ScaledSheet } from "react-native-size-matters";

import images from "../../../Themes/Images";
import colors from "../../../Themes/Colors";
import fonts from "../../../Themes/Fonts";
import { ApplicationStyles } from "../../../Themes";

function index(props) {
  console.log("props======", props);
  const { orderStatus, isAuth, billingAddressDetail, userProfile} = props;
  console.log("props.billinfDetail", props.billingAddressDetail);
  const fname = isAuth
    ? userProfile.firstName
    : billingAddressDetail?.firstName;
  const provinceState = isAuth
    ? billingAddressDetail?.provinceState
    : billingAddressDetail?.billingAddress?.provinceState;
  const towncity = isAuth
    ? billingAddressDetail?.townCity
    : billingAddressDetail?.billingAddress?.townCity;
  const [datas, setDatas] = useState([
    {
      icon: images.userDeliverytoImage,
      title: "Deliver to:",
      subtitle: `${fname}, ${towncity}, ${
        props?.billingAddressDetail?.billingAddress?.streetAddress1 || ""
      } ${props?.billingAddressDetail?.billingAddress?.streetAddress2 || ""} ${
        props?.billingAddressDetail?.billingAddress?.streetAddress3 || ""
      }`,
      subtitle1: `India, ${provinceState}`,
      type: "delivery",
    },
    // {
    //   icon: images.userUBillingImage,
    //   title: 'Billing Address:',
    //   subtitle: 'Username, Streetname 00',
    //   subtitle1: 'County, City',
    //   type: 'delivery',
    // },
    // {
    //   icon: images.userUPayImage,
    //   title: 'Payment',
    //   subtitle: 'Salami Credit',
    //   subtitle1: images.userLogoImage,
    //   type: 'Payment',
    // },
  ]);
  return (
    <View>
      {datas.map((item, index) => {
        return (
          <View
            key={`header${index}`}
            style={[styles.item, { height: vs(80) }]}
          >
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image style={styles.paytypeIcon} source={item.icon} />
                <Text style={ApplicationStyles.screen.heading5Bold}>
                  {item.title}
                </Text>
              </View>
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  {item.type == "Payment" && (
                    <Image style={styles.paytypeIcon} source={item.subtitle1} />
                  )}
                  <Text style={styles.itemSubTitle}>{item.subtitle}</Text>
                </View>

                {item.type != "Payment" && (
                  <Text style={styles.itemSubTitle}>{item.subtitle1}</Text>
                )}
              </View>
            </View>

            {item.type === "Payment" && (
              <TouchableOpacity>
                <Image
                  style={styles.editImage}
                  source={images.userAddressEditImage}
                />
              </TouchableOpacity>
            )}
          </View>
        );
      })}
    </View>
  );
}

export default index;
const styles = ScaledSheet.create({
  item: {
    marginTop: "15@vs",
    backgroundColor: colors.white,
    borderRadius: "16@s",
    height: "122@vs",
    paddingHorizontal: AppConfig.paddingHorizontal,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: fonts.primary,
    fontSize: "16@s",
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
});
