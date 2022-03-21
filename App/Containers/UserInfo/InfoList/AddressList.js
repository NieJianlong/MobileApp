import React, { useCallback, useContext, useEffect } from "react";
import { vs } from "react-native-size-matters";
import { Button } from "../../../Components";
import AppConfig from "../../../Config/AppConfig";
import { View, SafeAreaView } from "react-native";
import NavigationService from "../../../Navigation/NavigationService";
import { useQuery } from "@apollo/client";
import {
  FIND_BUYER_ADDRESS_BY_ID,
} from "../../../Apollo/queries/queries_user";
import { useFocusEffect } from "@react-navigation/core";
import Addresses from "./Addresses";
import { AlertContext } from "../../Root/GlobalContext";
/**
 * @description:Display my address, list of my payment methods, display bill detail
 * @param {*} item Menu Item with a special configuration
 * @param {*} data FlatList data
 * @param {*} isPayment Distinguish between payment method list and address list
 * @param {*} showSheet Display the Acction Sheet for the home page
 * @return {*}
 */
export default function AddressList({ dispatch, xIndex }) {
  // const { loading, error, data, refetch } = useQuery(FIND_BUYER_ADDRESS_BY_ID, {
  //   variables: {
  //     buyerId: global.buyerId,
  //   },
  //   context: {
  //     headers: {
  //       isPrivate: true,
  //     },
  //   },
  // });
  const { dispatch: globalDispatch } = useContext(AlertContext);
  const { loading, error, data, refetch } = useQuery(
    FIND_BUYER_ADDRESS_BY_ID_AND_TPYE,
    {
      variables: {
        buyerId: global.buyerId,
        addressType: "SHIPPING",
      },
      context: {
        headers: {
          isPrivate: true,
        },
      },
      onCompleted: (res) => {
        globalDispatch({ type: "hideloading" });
      },
      onError: (res) => {
        globalDispatch({ type: "hideloading" });
      },
    }
  );
  const refreshData = useCallback(() => {
    refetch();
  }, [refetch]);
  useFocusEffect(refreshData);
  useEffect(() => {
    dispatch({
      type: "rightButtonShow",
      payload: false,
    });
  }, [dispatch]);
  useEffect(() => {
    if (xIndex === 0) {
      refreshData();
    }
  }, [refreshData, xIndex]);
  return (
    <View style={{ flex: 1 }}>
      <Addresses data={data?.getBuyerAddressByType || []} refetch={refetch} />
      {data?.getBuyerAddressByType.length > 0 && (
        <SafeAreaView
          style={{
            marginBottom: vs(20),
            marginTop: vs(20),
          }}
        >
          <View style={{ paddingHorizontal: AppConfig.paddingHorizontal }}>
            <Button
              text="ADD NEW ADDRESS"
              onPress={() => {
                NavigationService.navigate("AddNewAddressScreen", {
                  title: "Add new address",
                });
              }}
            />
          </View>
        </SafeAreaView>
      )}
    </View>
  );
}
