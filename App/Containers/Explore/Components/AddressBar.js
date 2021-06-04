import React, {
  useContext,
  useCallback,
  useEffect,
  useState,
  useMemo,
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
import { userProfileVar } from "../../../Apollo/cache";
import { useLazyQuery, useReactiveVar } from "@apollo/client";

export default function AddressBar() {
  const userProfileVarReactive = useReactiveVar(userProfileVar);
  const [addrLine1, setAddrLine1] = useState("");
  const [addrLine2, setAddrLine2] = useState("");
  const [addressResult, setAddressResult] = useState({});
  const [error, setError] = useState("");
  const { dispatch } = useContext(AlertContext);
  const isAuth = useMemo(() => userProfileVarReactive.isAuth, [
    userProfileVarReactive.isAuth,
  ]);
  const toggleAddressSheet = useCallback(() => {
    dispatch({
      type: "changSheetState",
      payload: {
        showSheet: true,
        height: 380,
        children: () => <AddressSheetContent />,
        sheetTitle: "Add your delivery address",
      },
    });
  }, [dispatch]);
  const handleResult = useCallback(() => {
    if (addressResult.addressId === null) {
      console.log("found null Guest/Buyer addressId  creating");
      toggleAddressSheet();
      return;
    } else {
      console.log(
        `AddressBar fetchAddressDataGuest found GuestBuyer default address ${JSON.stringify(
          addressResult
        )}`
      );
      let aL1 = gqlMappers.mapGQLAddressToDelivery(addressResult);
      let aL2 = gqlMappers.mapGQLAddressToLine2(addressResult);
      userProfileVar({
        ...userProfileVar(),
        addressId: aL1,
        addressLine2: aL2,
      });
      setAddrLine1(aL1);
      setAddrLine2(aL2);
    }
  }, [addressResult, toggleAddressSheet]);

  const handleError = useCallback(() => {
    if (typeof error !== "undefined") {
      console.log(
        "AddressBar fetchAddressDataGuest Query error GetGuestBuyerDefaultAddressByBuyerId" +
          error
      );
    }
  }, [error]);
  useEffect(() => {
    if (addressResult) {
      handleResult();
    }
  }, [handleResult, addressResult]);
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
  const [fetchAddress] = useLazyQuery(
    isAuth
      ? aQM.FIND_BUYER_DEFAULT_ADDRESS_BY_ID
      : aQM.FIND_GUEST_BUYER_DEFAULT_ADDRESS_BY_ID,
    {
      variables: { buyerId: isAuth ? global.buyerId : global.guestId },
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
          console.log(
            `AddressBar fetchAddressDataGuest look up GuestBuyer addressId ${JSON.stringify(
              result.data
            )}`
          );
          setAddressResult(
            isAuth
              ? result.getBuyerDefaultAddressByBuyerId
              : result.getGuestBuyerDefaultAddressByBuyerId
          );
        } else {
          console.log(
            "AddressBar fetchAddressDataGuest server error for query FIND_GUEST_BUYER_ADDRESS_BY_ID"
          );
        }
      },
    }
  );

  /**
   * we wil only toggle toggleAddressSheet if the default address does not exist
   * for buyeror guest
   * to do remove
   *
   */
  // useEffect(() => {
  //   toggleAddressSheet();
  // }, [toggleAddressSheet]);

  useEffect(() => {
    fetchAddress();
  }, [fetchAddress]);

  // need this to get the address to show in screen see App/Containers/Explore/Components/AddLocationSheetContent.js
  useEffect(() => {
    console.log(
      "AddressBar useEffect addressUpdate " +
        JSON.stringify(userProfileVarReactive)
    );
    setAddrLine1(userProfileVarReactive.addressLine1);
    setAddrLine2(userProfileVarReactive.addressLine2);
  }, [userProfileVarReactive]);

  return (
    <View style={styles.addressBarContainer}>
      <View style={styles.row}>
        <Image source={Images.locationMed} style={styles.icLocation} />
        <Text style={styles.heading5Regular}>Deliver to - {addrLine1}</Text>
        <View style={styles.areaContainer}>
          <Text style={styles.heading6Bold}>{addrLine2}</Text>
        </View>
      </View>

      <TouchableOpacity onPress={toggleAddressSheet}>
        <Image source={Images.arrow_left} style={styles.icArrowDown} />
      </TouchableOpacity>
    </View>
  );
}
