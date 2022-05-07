import React from "react";
import { View, TouchableOpacity, Image, SafeAreaView } from "react-native";
import { s, ScaledSheet } from "react-native-size-matters";
import fonts from "../../Themes/Fonts";
import colors from "../../Themes/Colors";
import NavigationService from "../../Navigation/NavigationService";
import TextTip from "../../Components/EmptyReminder";
import images from "../../Themes/Images";
import { useNavigation, useRoute } from "@react-navigation/native";
import { OrderItemHistoryEventType } from "../../../generated/graphql";
import { t } from "react-native-tailwindcss";

function CancelOrderCompleted(props) {
  const { params } = useRoute();
  const data = {
    textTip: "Your order has been canceled",
    subTextTip:
      params.data.latestEventStatus === OrderItemHistoryEventType.Paid
        ? "You will receive the refund money in 3-5 business days"
        : "You can go on to browse other products",
    needButton: true,
    btnMsg: "CONTINUE EXPLORING",
    onPress: () => {
      NavigationService.navigate("ExploreScreen");
    },
  };
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
      headerRight: () => (
        <View style={[t.mR6]}>
          <TouchableOpacity
            onPress={() => {
              NavigationService.goBack();
            }}
          >
            <Image
              style={{
                width: s(25),
                height: s(25),
                tintColor: colors.grey60,
              }}
              source={images.crossMedium}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);
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
      <View>
        <Image
          style={{
            width: "100%",
            height: 80,
            marginTop: 50,
            resizeMode: "contain",
          }}
          source={images.orderCanceledImage}
        />
        <View style={{ height: s(230), backgroundColor: "transparent" }}>
          <TextTip {...data} />
        </View>
      </View>
    </View>
  );
}

export default CancelOrderCompleted;
const styles = ScaledSheet.create({
  title: {
    fontFamily: fonts.primary,
    fontSize: "16@s",
    color: colors.black,
    fontWeight: "600",
  },
});
