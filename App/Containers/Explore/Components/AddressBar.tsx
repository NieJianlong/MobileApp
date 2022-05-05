import React, {
  useContext,
  useCallback,
  useState,
  useMemo,
  useEffect,
} from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "../styles";
import { AlertContext } from "../../Root/GlobalContext";
import { Images } from "../../../Themes";
import AddressSheetContent from "./AddressSheetContent";
/**
 * queries for address
 */
import * as aQM from "../gql/explore_queries";
import * as gqlMappers from "../gql/gql_mappers";
import { localCartVar, userProfileVar } from "../../../Apollo/cache";
import { useQuery, useReactiveVar } from "@apollo/client";
import { useFocusEffect } from "@react-navigation/native";
import PubSub from "pubsub-js";
import { getLocalStorageValue } from "../../../Apollo/local-storage";
import { isEmpty } from "lodash";
import {
  DeliveryAddressForBuyerDocument,
  DeliveryAddressForGuestBuyerDocument,
} from "../../../../generated/graphql";
import useMapScreen from "../../../hooks/useMapScreen";

export default function AddressBar() {
  const userProfileVarReactive = useReactiveVar(userProfileVar);
  const [addrLine1, setAddrLine1] = useState("");
  const [addrLine2, setAddrLine2] = useState("");
  const [error, setError] = useState("");
  const { dispatch } = useContext(AlertContext);
  const isAuth = useMemo(
    () => userProfileVarReactive.isAuth,
    [userProfileVarReactive.isAuth]
  );
  const { setShowMap } = useMapScreen();

  /**
   * we need to add comments for stuff like this
   * there is a heirachy here thats not at all obvious
   * AddressSheetContent -> AddLocationSheetContent
   * comment should be like state updates see @AddLocationSheetContent
   */
  const toggleAddressSheet = useCallback(() => {
    dispatch({
      type: "changSheetState",
      payload: {
        showSheet: true,
        height: 380,
        children: () => <AddressSheetContent />,
        onCloseEnd: () => {},
        enabledGestureInteraction: addrLine1.length > 0,
        sheetTitle: "Add your delivery address",
      },
    });
  }, [addrLine1.length, dispatch]);

  const handleError = useCallback(() => {
    if (typeof error !== "undefined") {
      // setShowMap({ mapVisible: true });
      console.log(
        "AddressBar fetchAddressDataGuest Query error GetGuestBuyerDefaultAddressByBuyerId" +
          error
      );
    }
  }, [error]);

  const { loading, refetch } = useQuery(
    isAuth
      ? DeliveryAddressForBuyerDocument
      : DeliveryAddressForGuestBuyerDocument,
    {
      variables: { buyerId: global.buyerId },
      fetchPolicy: "network-only",
      notifyOnNetworkStatusChange: true,
      context: {
        headers: {
          isPrivate: isAuth,
        },
      },
      onError: (err) => {
        setError(err);
        handleError();
      },
      onCompleted: (result) => {
        if (result) {
          // debug only

          const resultJson = isAuth
            ? result.deliveryAddressForBuyer
            : result.deliveryAddressForGuestBuyer;
          // handleData(resultJson);
          getLocalStorageValue(global.buyerId + "Address").then((res) => {
            console.log("res========getLocalStorageValue", res);
            if (!isEmpty(res)) {
              const resultkkk = JSON.parse(res);
              handleData(resultkkk);
            } else {
              handleData(resultJson);
            }
          });
        } else {
          setShowMap({ mapVisible: true });
          // toggleAddressSheet();
        }
      },
    }
  );
  function handleData(resultJson) {
    let aL1 = gqlMappers.mapGQLAddressToDelivery(resultJson);
    let aL2 = gqlMappers.mapGQLAddressToLine2(resultJson);

    // if (aL1.length > 10) {
    //   aL1 = aL1.substring(0, 17);
    // }
    // if (aL2.length > 10) {
    //   aL2 = aL2.substring(0, 16);
    // }
    // callBackAddress used for gql query to get geo co-ords see useEffect Explore
    localCartVar({
      ...localCartVar(),
      deliverAddress: resultJson?.addressId,
      callBackAddress: resultJson,
    });
    setAddrLine1(aL1);
    setAddrLine2(aL2);
    if (aL1.length === 0) {
      setShowMap({ mapVisible: true });
      // toggleAddressSheet();
    }
  }
  useFocusEffect(
    React.useCallback(() => {
      // refetch();
      getLocalStorageValue(global.buyerId + "Address").then((res) => {
        if (!isEmpty(res)) {
          const result = JSON.parse(res);
          handleData(result);
        }
      });
      // if (addrLine1 === "" && !loading) {
      //   toggleAddressSheet();
      // }
    }, [refetch])
  );
  useEffect(() => {
    let refresh = PubSub.subscribe("refresh-address", () => {
      getLocalStorageValue(global.buyerId + "Address").then((res) => {
        if (!isEmpty(res)) {
          const result = JSON.parse(res);
          handleData(result);
        }
      });
    });
    return () => {
      if (refresh) {
        PubSub.unsubscribe(refresh);
      }
    };
  });
  return (
    <TouchableOpacity onPress={toggleAddressSheet}>
      <View style={styles.addressBarContainer}>
        <View style={styles.row}>
          <Image source={Images.locationMed} style={styles.icLocation} />
          <Text style={styles.heading5Regular}>Deliver to - {addrLine1}</Text>
          {/* <View style={styles.areaContainer}>
            <Text style={styles.heading6Bold}>{addrLine2}</Text>
          </View> */}
        </View>
        <Image source={Images.arrow_left} style={styles.icArrowDown} />
      </View>
    </TouchableOpacity>
  );
}
