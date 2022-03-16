import React, { useContext, useCallback, useMemo, useEffect } from "react";
import { View } from "react-native";
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

export default function AddressSheetContent(props) {
  const { dispatch, actionSheet } = useContext(AlertContext);
  const userProfileVarReactive = useReactiveVar(userProfileVar);
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
      {isAuth && data?.getBuyerAddressByType && (
        <Addresses
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
      )}
    </View>
  );
}
