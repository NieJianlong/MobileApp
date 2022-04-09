import React, { useContext, useCallback, useMemo, useEffect } from "react";
import { useWindowDimensions, View } from "react-native";
import { vs } from "react-native-size-matters";
import { Button } from "../../../Components";
import { Colors, Images } from "../../../Themes";
import { AlertContext } from "../../Root/GlobalContext";
import AddLocationSheetContent from "./AddLocationSheetContent";
import Addresses from "../../UserInfo/InfoList/Addresses";
import { useQuery, useReactiveVar } from "@apollo/client";
import {
  FIND_BUYER_ADDRESS_BY_ID_AND_TPYE,
  FIND_GUEST_ADDRESS_BY_ID_AND_TPYE,
} from "../../../Apollo/queries/queries_user";
import { userProfileVar } from "../../../Apollo/cache";
import {
  CURRENT_ADDRESS,
  setLocalStorageValue,
} from "../../../Apollo/local-storage";
import PubSub from "pubsub-js";
import useAlert from "../../../hooks/useAlert";
import colors from "../../../Themes/Colors";

export default function AddressSheetContent(props) {
  const { dispatch, actionSheet } = useContext(AlertContext);
  const { width, height: windowHeight } = useWindowDimensions();
  const userProfileVarReactive = useReactiveVar(userProfileVar);
  const { setAlert } = useAlert();
  const isAuth = useMemo(
    () => userProfileVarReactive.isAuth,
    [userProfileVarReactive.isAuth]
  );
  const variables = isAuth
    ? { buyerId: global.buyerId, addressType: "SHIPPING" }
    : { guestBuyerId: global.buyerId, addressType: "SHIPPING" };
  const { loading, error, data, refetch } = useQuery(
    isAuth
      ? FIND_BUYER_ADDRESS_BY_ID_AND_TPYE
      : FIND_GUEST_ADDRESS_BY_ID_AND_TPYE,
    {
      variables: variables,
      context: {
        headers: {
          isPrivate: isAuth,
        },
      },
      onCompleted: (res) => {
        let height = isAuth
          ? res?.getBuyerAddressByType.length * 115
          : res?.getGuestBuyerAddressByType.length * 115;
        if (height > windowHeight - 500) {
          height = windowHeight - 500;
        }
        dispatch({
          type: "changSheetState",
          payload: {
            height: height + 200,

            sheetTitle: "Add your delivery address",
          },
        });
      },
    }
  );
  useEffect(() => {
    if (actionSheet.showSheet) {
      refetch();
    }
  }, [actionSheet.showSheet, refetch]);
  const toggleAddressSheet = useCallback(() => {
    dispatch({
      type: "changSheetState",
      payload: {
        showSheet: true,
        height: 600,
        children: () => <AddLocationSheetContent />,
        sheetTitle: "",
      },
    });
  }, [dispatch]);
  return (
    <View style={[{ flex: 1, justifyContent: "flex-start" }]}>
      <View style={{ height: vs(30) }} />
      <Button
        backgroundColor={Colors.grey80}
        prefixIcon={Images.add1}
        onPress={toggleAddressSheet}
        text={"ADD ADDRESS"}
      />
      <View style={{ height: vs(20) }} />

      <Addresses
        isInBottomSheet={true}
        data={
          isAuth
            ? data?.getBuyerAddressByType
            : data?.getGuestBuyerAddressByType
        }
        needempty={false}
        isCheckout={true}
        refetch={refetch}
        onPress={(item) => {
          setLocalStorageValue(CURRENT_ADDRESS, JSON.stringify(item)).then(
            () => {
              PubSub.publish("refresh-address", "");
              setAlert({
                color: colors.success,
                title: "Your address has been changed",
                message: "Discover the products of the area",
                visible: true,
                onDismiss: () => {
                  setAlert({ visible: false });
                },
              });
              dispatch({
                type: "changSheetState",
                payload: {
                  showSheet: false,
                  height: 600,
                  children: () => <AddLocationSheetContent />,
                  sheetTitle: "",
                },
              });
            }
          );
        }}
      />
    </View>
  );
}
