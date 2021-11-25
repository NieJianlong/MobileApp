import React, { useContext, useCallback, useMemo } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { vs, s } from "react-native-size-matters";
import { Button } from "../../../Components";
import { Colors, Images } from "../../../Themes";
import styles from "../styles";
import { AlertContext } from "../../Root/GlobalContext";
import AddLocationSheetContent from "./AddLocationSheetContent";
import Addresses from "../../UserInfo/InfoList/Addresses";
import { useQuery, useReactiveVar } from "@apollo/client";
import {
  FIND_BUYER_ADDRESS_BY_ID_AND_TPYE,
  FIND_GUEST_ADDRESS_BY_ID_AND_TPYE,
} from "../../../Apollo/queries/queries_user";
import { userProfileVar } from "../../../Apollo/cache";

function AddressItem(address) {
  return (
    <View style={styles.pickupLocationContainer}>
      <Image style={styles.pickupLocationIcon} source={Images.locationMed} />
      <View style={{ marginLeft: s(10) }}>
        <Text style={styles.heading5Bold}>Seller Address 00</Text>
        <Text style={styles.txtRegular}>Tamil Nadu 12345, Area 4</Text>
      </View>
      <View style={{ flex: 1 }} />
      <TouchableOpacity style={styles.btnEditAddress}>
        <Image
          style={styles.editAddressIcon}
          source={Images.userAddressEditImage}
        />
      </TouchableOpacity>
    </View>
  );
}

export default function AddressSheetContent(props) {
  const { dispatch } = useContext(AlertContext);
  const userProfileVarReactive = useReactiveVar(userProfileVar);
  const isAuth = useMemo(() => userProfileVarReactive.isAuth, [
    userProfileVarReactive.isAuth,
  ]);
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
        />
      )}
    </View>
  );
}
