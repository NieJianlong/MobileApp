import React, { useState } from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import AppConfig from "../../Config/AppConfig";
import { s, ScaledSheet, vs } from "react-native-size-matters";
import colors from "../../Themes/Colors";
import { Button, Switch } from "../../Components";
import CartItem from "./Cartitem";
import BottomSummary from "./Summary";
import DeliverInfo from "./DeliverInfo";
import NavigationService from "../../Navigation/NavigationService";

import { useCreateOrder } from "../../hooks/useCreateOrder";
import PaymentOptions from "./PaymentOptions";
import { userProfileVar } from "../../Apollo/cache";
import images from "../../Themes/Images";
import { ApplicationStyles } from "../../Themes";
import { useReactiveVar } from "@apollo/client";
import useOrderInfo from "../../hooks/useOrderInfo";
import { useRoute } from "@react-navigation/native";

//orderStatus：1,completed
function CheckoutResume(props) {
  const [on, setOnSwitch] = useState(false);
  const { createOrder } = useCreateOrder();
  const userProfile = useReactiveVar(userProfileVar);
  const { orderInfo } = useOrderInfo();
  const { params } = useRoute();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <SafeAreaView
        style={{ flex: 1 }}
        edges={["top", "right", "left", "bottom"]}
      >
        <View style={{ flex: 1 }}>
          <ScrollView
            style={{
              paddingHorizontal: AppConfig.paddingHorizontal,
            }}
            contentContainerStyle={{ paddingBottom: 110 }}
          >
            <DeliverInfo />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 20,
              }}
            >
              <Text style={ApplicationStyles.screen.heading4Bold}>
                {"Your order"}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  NavigationService.goBack();
                }}
              >
                <Image
                  style={styles.editImage}
                  source={images.userAddressEditImage}
                />
              </TouchableOpacity>
            </View>
            <View>
              {orderInfo.allItems.map((item, index) => {
                let itemAvailble = true;
                if (orderInfo.availbleList) {
                  const i = orderInfo.availbleList[index];
                  itemAvailble = i?.isAvailable;
                }

                console.log("Itemm", item);
                if (itemAvailble) {
                  return (
                    <CartItem
                      key={index.toString()}
                      product={{
                        product: item.productDetails,
                        variant: item.variant,
                      }}
                      availble={itemAvailble}
                    />
                  );
                }
              })}
            </View>

            <BottomSummary />
            {global.access_token && global.access_token !== "" && (
              <PaymentOptions />
            )}

            <View>
              <View
                style={{
                  marginTop: 30,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{
                    width: s(28),
                    height: s(28),
                    resizeMode: "contain",
                    marginRight: s(10),
                  }}
                  source={images.shopcartInfoImage}
                />
                <View>
                  <Text
                    style={[
                      ApplicationStyles.screen.txtRegular,
                      { color: colors.grey80 },
                    ]}
                  >
                    Remember that you will get your product once the
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={[
                        ApplicationStyles.screen.txtRegular,
                        { color: colors.grey80 },
                      ]}
                    >
                      number of slices has been reached
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        props.navigation.navigate("LearnMoreScreen");
                      }}
                    >
                      <Text
                        style={[
                          ApplicationStyles.screen.txtRegular,
                          { color: colors.secondary00, paddingLeft: 6 },
                        ]}
                      >
                        Learn more
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={{ marginTop: 20 }}>
                <Switch
                  onSwitch={(b) => setOnSwitch(b)}
                  active={on}
                  label="I accept Privacy Policy and Terms of use"
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>

      <SafeAreaView
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <View
          style={{
            height: vs(80),
            width: "100%",
            backgroundColor: colors.white,
            paddingHorizontal: AppConfig.paddingHorizontal,
            paddingTop: vs(15),
          }}
        >
          <Button
            onPress={() => {
              if (!on) {
                alert("Please accept privacy and policy");
                return;
              }
              debugger;
              createOrder({ data: params?.data });
            }}
            text={"PROCEED"}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = ScaledSheet.create({
  editImage: {
    width: "24@s",
    height: "24@s",
    marginLeft: "12@s",
    resizeMode: "contain",
  },
});

export default CheckoutResume;
