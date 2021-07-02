import React, { useCallback, useContext, useMemo } from "react";
import { s, ScaledSheet, vs } from "react-native-size-matters";
import { Button, Switch } from "../../../Components";
import AppConfig from "../../../Config/AppConfig";
import { View, FlatList, Text, Image, SafeAreaView } from "react-native";
import images from "../../../Themes/Images";
import { TouchableOpacity } from "react-native-gesture-handler";
import colors from "../../../Themes/Colors";
import fonts from "../../../Themes/Fonts";
import Fonts from "../../../Themes/Fonts";
import { AlertContext } from "../../Root/GlobalContext";
import TextTip from "../../../Components/EmptyReminder";
import { useMutation } from "@apollo/client";
import { DELETE_PAYMENT_DETAIL } from "../../../Apollo/mutations/mutations_user";
export default function PaymentItem({
  item,
  showSheet = () => {},
  setDefault,
  refetch,
}) {
  const [deletePayment, { error, data }] = useMutation(DELETE_PAYMENT_DETAIL, {
    variables: { paymentDetailId: item.paymentDetailId },
    context: {
      headers: {
        isPrivate: true,
      },
    },
    onCompleted: (res) => {
      refetch();
      if (res.deletePaymentDetail) {
        dispatch({
          type: "changAlertState",
          payload: {
            visible: true,
            message: "You have successfully removed your payment method.",
            color: colors.secondary00,
            title: "Payment method Removed!",
          },
        });
      }
    },
    onError: (res) => {},
  });
  const tips = useMemo(
    () => ({
      textTip: "Remove Payment Method",
      subTextTip: "This action cannot be undone,\n are you sure?",
      needButton: true,
      btnMsg: "SURE!",
      onPress: () => {
        dispatch({
          type: "changSheetState",
          payload: {
            showSheet: false,
            height: 600,
            children: () => null,
            sheetTitle: "",
          },
        });
        deletePayment();
      },
    }),
    [deletePayment, dispatch]
  );
  const { dispatch } = useContext(AlertContext);
  const toggleSortBySheet = useCallback(() => {
    dispatch({
      type: "changSheetState",
      payload: {
        showSheet: true,
        height: vs(320),
        children: () => (
          <View style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={styles.credit}
                source={images.userCreditCardImage}
              />
            </View>
            <View
              style={{
                flex: 2,
                justifyContent: "flex-end",
              }}
            >
              <View style={{ flex: 1, marginLeft: s(-15) }}>
                <TextTip {...tips} />
              </View>
              <Button
                backgroundColor="transparent"
                text="CANCEL"
                textColor={colors.grey80}
                onPress={() => {
                  dispatch({
                    type: "changSheetState",
                    payload: {
                      showSheet: false,
                      height: 600,
                      children: () => null,
                      sheetTitle: "",
                    },
                  });
                }}
              />
            </View>
          </View>
        ),
      },
    });
  }, [dispatch, tips]);
  return (
    <View style={{ paddingHorizontal: AppConfig.paddingHorizontal }}>
      <View style={[styles.item, { height: vs(122) }]}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            style={styles.paytypeIcon}
            source={images.userPayTypeImage}
          ></Image>
          <Text style={styles.itemTitle}>***********6756</Text>
          {item.isDefaultPaymentType && (
            <Image style={styles.icon} source={images.check}></Image>
          )}
        </View>
        <View>
          <Text style={styles.itemSubTitle}>John.Smith</Text>
        </View>
        <View style={styles.itemBottom}>
          {item.isDefaultPaymentType ? (
            <View style={styles.itemTipsContainer}>
              <Text style={styles.itemTips}>Default payment method</Text>
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
                toggleSortBySheet();
              }}
            >
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
  credit: {
    width: "100%",
    maxHeight: "80@vs",
    resizeMode: "contain",
    marginVertical: "25@vs",
  },
});
