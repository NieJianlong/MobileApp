import React, { useContext } from "react";
import { ScaledSheet } from "react-native-size-matters";
import AppConfig from "../../../Config/AppConfig";
import {
  View,
  Text,
  Image,
  TouchableOpacity as RNTouchableOpacity,
  Platform,
  TouchableWithoutFeedback as RNTouchableWithoutFeedback,
} from "react-native";
import images from "../../../Themes/Images";

import colors from "../../../Themes/Colors";
import fonts from "../../../Themes/Fonts";
import Fonts from "../../../Themes/Fonts";
import { useMutation, useReactiveVar } from "@apollo/client";
import { DELETE_ADDRESS } from "../../../Apollo/mutations/mutations_user";
import { AlertContext } from "../../Root/GlobalContext";
import NavigationService from "../../../Navigation/NavigationService";
import PubSub from "pubsub-js";
import {
  TouchableOpacity as GHTouchableOpacity,
  TouchableWithoutFeedback as GHTouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { omit } from "lodash";
import { t } from "react-native-tailwindcss";
import {
  DeleteAddressDocument,
  DeleteAddressForGuestBuyerDocument,
  UpdateAddressDocument,
  UpdateAddressForGuestBuyerDocument,
} from "../../../../generated/graphql";
import { userProfileVar } from "../../../Apollo/cache";
import { mapGQLAddressToDelivery } from "../../Explore/gql/gql_mappers";
import useActionAlert from "../../../hooks/useActionAlert";
const TouchableOpacity =
  Platform.OS === "ios" ? RNTouchableOpacity : GHTouchableOpacity;
const TouchableWithoutFeedback =
  Platform.OS === "ios"
    ? RNTouchableWithoutFeedback
    : GHTouchableWithoutFeedback;

export default function AddressItem({ item, refetch, isCheckout, onPress }) {
  const { dispatch } = useContext(AlertContext);
  const userProfile = useReactiveVar(userProfileVar);
  const { setAlert } = useActionAlert();
  const variables = userProfile.isAuth
    ? { addressId: item.addressId }
    : { addressId: item.addressId, guestBuyerId: global.buyerId };
  const [deleteAddress, { error, data }] = useMutation(
    userProfile.isAuth
      ? DeleteAddressDocument
      : DeleteAddressForGuestBuyerDocument,
    {
      variables: variables,
      context: {
        headers: {
          isPrivate: userProfile.isAuth,
        },
      },
      onCompleted: (res) => {
        dispatch({ type: "hideloading" });
        // PubSub.publish("refresh-address", "");
        PubSub.publish("delete-address", item);
        if (res.deleteAddress || res.deleteAddressForGuestBuyer) {
          refetch();
          dispatch({
            type: "changAlertState",
            payload: {
              visible: true,
              message: "You have successfully removed your address.",
              color: colors.secondary00,
              title: "Address Removed!",
            },
          });
        }
      },
      onError: (res) => {
        dispatch({ type: "hideloading" });
      },
    }
  );
  console.log("item====================================");
  console.log(item);
  console.log("====================================");
  const [setAddressDefault] = useMutation(
    userProfile.isAuth
      ? UpdateAddressDocument
      : UpdateAddressForGuestBuyerDocument,
    {
      variables: {
        request: {
          ...omit(item, ["__typename", "updatedAt", "createdAt"]),
          addressId: item.addressId,
          referenceId: item.referenceId,
          defaultAddress: true,
          addressType: item.addressType,
        },
      },
      context: {
        headers: {
          isPrivate: userProfile.isAuth,
        },
      },
      onCompleted: (res) => {
        dispatch({ type: "hideloading" });
        PubSub.publish("refresh-address", "");
        refetch();
        if (onPress) {
          onPress(item);
          return;
        }
        dispatch({
          type: "changAlertState",
          payload: {
            visible: true,
            message: "You have successfully Changed your default address.",
            color: colors.secondary00,
            title: "Default Address Changed!",
          },
        });
      },
      onError: (error) => {
        console.log("Error UPDATE_ADDRESS", error);
        dispatch({ type: "hideloading" });
      },
    }
  );
  // let addressDetail = `${item.houseNumber ?? ""} ${item.building ?? ""} ${
  //   item.villageArea ?? ""
  // } ${item.townCity} ${item.provinceState} ${item.country} ${item.pinCode}`;

  let addressDetail = mapGQLAddressToDelivery(item, true);
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        onPress
          ? onPress(item)
          : console.log("====================================");
      }}
    >
      <View style={[styles.item]}>
        <View style={[{ flexDirection: "row", alignItems: "center" }]}>
          <Text style={styles.itemTitle}>{item.streetAddress1}</Text>
          {item.defaultAddress && (
            <Image style={styles.icon} source={images.check} />
          )}
        </View>
        <View>
          <Text style={styles.itemSubTitle}>{addressDetail.trim()}</Text>
        </View>

        <View style={[styles.itemBottom]}>
          {item.defaultAddress ? (
            <View style={styles.itemTipsContainer}>
              <Text style={styles.itemTips}>Default address</Text>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.itemSetDefault}
              onPress={() => {
                dispatch({ type: "loading" });
                setAddressDefault();
              }}
            >
              <Text style={styles.setDefaultText}>SET AS DEFAULT</Text>
            </TouchableOpacity>
          )}
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => {
                dispatch({
                  type: "changSheetState",
                  payload: {
                    showSheet: false,
                  },
                });
                NavigationService.navigate("AddNewAddressScreen", {
                  title: "Edit address",
                  currentAddress: item,
                });
              }}
            >
              <Image
                style={styles.editImage}
                source={images.userAddressEditImage}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setAlert({
                  visible: true,
                  message: "Would you like to delete this address.",
                  color: colors.secondary00,
                  title: "Delete Address",
                  buttons: [
                    // {
                    //   text: "Cancel",
                    //   style: [t.w16, t.h8, t.bgGray200],
                    //   backgroundColor: colors.secondary00,
                    //   onPress: () => {
                    //     setAlert({ visible: false });
                    //   },
                    // },
                    {
                      text: "Delete",
                      style: [t.w16, t.h8],
                      onPress: () => {
                        dispatch({ type: "loading" });
                        deleteAddress();
                      },
                    },
                  ],
                });
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
    </TouchableWithoutFeedback>
  );
}

const styles = ScaledSheet.create({
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
    paddingVertical: AppConfig.paddingHorizontal,
    paddingHorizontal: AppConfig.paddingHorizontal,
    justifyContent: "center",
  },
});
