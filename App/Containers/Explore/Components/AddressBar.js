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
import {
  CURRENT_ADDRESS,
  getLocalStorageValue,
} from "../../../Apollo/local-storage";
import { isEmpty } from "lodash";

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
        // enabledGestureInteraction: addrLine1.length > 0,
        sheetTitle: "Add your delivery address",
      },
    });
  }, [dispatch]);

  const handleError = useCallback(() => {
    if (typeof error !== "undefined") {
      console.log(
        "AddressBar fetchAddressDataGuest Query error GetGuestBuyerDefaultAddressByBuyerId" +
          error
      );
    }
  }, [error]);

  /**
   * get the list of address to populate the add addres bottom sheet
   * called when component mounts useEffect via getBuyerId
   * use mutation hook is only available for public api
   * so using standalone clients
   * FIND_BUYER_ADDRESS_BY_ID is private endpoint use emais as key for
   * guest buyer id in local storage
   *
   * FIND_GUEST_BUYER_ADDRESS_BY_ID public endpoint  use device id as key for
   * guest buyer id in local storage
   * see './gql/explore_queries'
   */
  /** FIND_BUYER_DEFAULT_ADDRESS_BY_ID is a private api */

  // const { data } = useQuery(aQM.GetCountries, {
  //   onCompleted: (res) => {
  //     console.log("data====================================");
  //     console.log(data);
  //     console.log("====================================");
  //   },
  // });

  const { loading, refetch } = useQuery(
    isAuth
      ? aQM.FIND_BUYER_DEFAULT_ADDRESS_BY_ID
      : aQM.FIND_GUEST_BUYER_DEFAULT_ADDRESS_BY_ID,
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
          console.log(
            `AddressBar fetchAddressData Guest/Buyer look up addressId ${JSON.stringify(
              result.getBuyerDefaultAddressByBuyerId
            )}`
          );
          const resultJson = isAuth
            ? result.getBuyerDefaultAddressByBuyerId
            : result.getGuestBuyerDefaultAddressByBuyerId;
          // handleData(resultJson);
          getLocalStorageValue(CURRENT_ADDRESS).then((res) => {
            console.log("res========getLocalStorageValue", res);
            if (!isEmpty(res)) {
              const resultkkk = JSON.parse(res);
              handleData(resultkkk);
            } else {
              handleData(resultJson);
            }
          });
        } else {
          toggleAddressSheet();
        }
      },
    }
  );
  function handleData(resultJson) {
    let aL1 = gqlMappers.mapGQLAddressToDelivery(resultJson);
    let aL2 = gqlMappers.mapGQLAddressToLine2(resultJson);
    if (aL1.length > 10) {
      aL1 = aL1.substring(0, 17);
    }
    if (aL2.length > 10) {
      aL2 = aL2.substring(0, 16);
    }
    // callBackAddress used for gql query to get geo co-ords see useEffect Explore
    localCartVar({
      ...localCartVar(),
      deliverAddress: resultJson?.addressId,
      callBackAddress: gqlMappers.mapGQLAddressResponseToCache(resultJson),
    });
    setAddrLine1(aL1);
    setAddrLine2(aL2);
    if (aL1.length === 0) {
      toggleAddressSheet();
    }
  }
  useFocusEffect(
    React.useCallback(() => {
      // refetch();
      getLocalStorageValue(CURRENT_ADDRESS).then((res) => {
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
      getLocalStorageValue(CURRENT_ADDRESS).then((res) => {
        console.log("it is here====================================");
        console.log();
        console.log("====================================");
        if (!isEmpty(res)) {
          console.log("myaddress====================================");
          console.log(res);
          console.log("====================================");
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
          <View style={styles.areaContainer}>
            <Text style={styles.heading6Bold}>{addrLine2}</Text>
          </View>
        </View>
        <Image source={Images.arrow_left} style={styles.icArrowDown} />
      </View>
    </TouchableOpacity>
  );
}
