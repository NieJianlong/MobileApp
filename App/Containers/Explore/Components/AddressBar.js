import React, { useContext, useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from '../styles';
import { AlertContext } from '../../Root/GlobalContext';
import { Images } from '../../../Themes';
import AddressSheetContent from './AddressSheetContent';
/**
 * queries for address
 */
import * as aQM from '../gql/explore_queries';
import * as gqlMappers from '../gql/gql_mappers';
import { userProfileVar } from '../../../Apollo/cache';
import { getUniqueId } from 'react-native-device-info';

import AsyncStorage from '@react-native-community/async-storage';
import { useReactiveVar } from '@apollo/client';
import {client} from "../../../Apollo/apolloClient"

export default function AddressBar() {
  const userProfileVarReactive = useReactiveVar(userProfileVar);
  const [addrLine1, setAddrLine1 ] =useState('')
  const [addrLine2, setAddrLine2 ] =useState('')

  const { dispatch } = useContext(AlertContext);
  const toggleAddressSheet = useCallback(() => {
    dispatch({
      type: 'changSheetState',
      payload: {
        showSheet: true,
        height: 380,
        children: () => <AddressSheetContent />,
        sheetTitle: 'Add your delivery address',
      },
    });
  }, [dispatch]);

  /**
   * we wil only toggle toggleAddressSheet if the default address does not exist
   * for buyeror guest
   * to do remove
   *
   */
  // useEffect(() => {
  //   toggleAddressSheet();
  // }, [toggleAddressSheet]);

  // debug code
  const fetchAllItems = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const items = await AsyncStorage.multiGet(keys);

      return items;
    } catch (error) {
      console.log(error, 'fetchAllItems issues');
    }
  };

  let buyId = '';

  // get the buyer id from local storage and tun the queries
  const getBuyerId = async () => {
    // this wakes up async storage
    let data = await fetchAllItems();
    console.log(data);

    let isAuth = userProfileVarReactive.isAuth;
    if (isAuth) {
      console.log(
        'AddressBar getBuyerId isAuth true get buyerid from local storage in statewith email= ' +
          userProfileVar().email
      );
      // let bid = await storage.getLocalStorageValue(userProfileVar().email)

      buyId = await AsyncStorage.getItem(userProfileVar().email);

      console.log(
        'AddressBar getBuyerId isAuth true get buyerid from local storage in state= ' +
          buyId
      );
      fetchAddressDataBuyer();
    } else {
      // let gbod = await storage.getLocalStorageValue(getUniqueId())
      buyId = await AsyncStorage.getItem(getUniqueId());

      console.log(
        'AddressBar getBuyerId isAuth false get guestBuyerId from local storage in state= ' +
          buyId
      );
      fetchAddressDataGuest();
    }
  };

  useEffect(() => {
    console.log('AddressBar useEffect constructor getBuyerId');
    getBuyerId();
  }, []);

  // need this to get the address to show in screen see App/Containers/Explore/Components/AddLocationSheetContent.js
  useEffect(() => {
    console.log(
      'AddressBar useEffect addressUpdate ' + JSON.stringify(userProfileVarReactive)
    );
    setAddrLine1(userProfileVarReactive.addressLine1)
    setAddrLine2(userProfileVarReactive.addressLine2)

  }, [userProfileVarReactive.addressId]);

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

  const fetchAddressDataGuest = async () => {
    console.log(`fetchAddessDataGuest and guest buyerId=${buyId}`);
    await client
      .query({
        query: aQM.FIND_GUEST_BUYER_DEFAULT_ADDRESS_BY_ID,  
        variables: { buyerId: buyId },
        context: {
          headers: {
            isPrivate: false,
          },
      }})
      .then((result) => {
        if (typeof result.data !== 'undefined') {
          console.log(
            `AddressBar fetchAddressDataGuest look up GuestBuyer addressId ${JSON.stringify(
              result.data
            )}`
          );
          if (
            result.data.getGuestBuyerDefaultAddressByBuyerId.addressId === null
          ) {
            console.log('found null GuestBuyer addressId  creating');
            toggleAddressSheet();
            return;
          } else {
            console.log(
              `AddressBar fetchAddressDataGuest found GuestBuyer default address ${JSON.stringify(
                result.data.getGuestBuyerDefaultAddressByBuyerId
              )}`
            );
            let aL1 = gqlMappers.mapGQLAddressToDelivery(
              result.data.getGuestBuyerDefaultAddressByBuyerId
            )
            let aL2 = gqlMappers.mapGQLAddressToLine2(
              result.data.getGuestBuyerDefaultAddressByBuyerId
            )
            userProfileVar({
              ...userProfileVar(),
              addressId:aL1,
              addressLine2:aL2,
            });
            setAddrLine1(aL1)
            setAddrLine2(aL2)
          }
        } else {
          console.log(
            'AddressBar fetchAddressDataGuest server error for query FIND_GUEST_BUYER_ADDRESS_BY_ID'
          );
        }
      })
      .catch((err) => {
        if (typeof err !== 'undefined') {
          console.log(
            'AddressBar fetchAddressDataGuest Query error GetGuestBuyerDefaultAddressByBuyerId' +
              err
          );
        }
      });
  };

  /** FIND_BUYER_DEFAULT_ADDRESS_BY_ID is a private api */
  const fetchAddressDataBuyer = async () => {
    // call query for registerBuyerAddress by buyer id
    console.log(`AddressBar fetchAddressDataBuyer and  buyerId=${buyId}`);
   let access_token= await AsyncStorage.getItem("@local_storage_token_key")
   if(access_token == null || typeof access_token  === 'undefined') {
    console.log(`AddressBar fetchAddressDataBuyer no token`);
   } else {
    console.log(`AddressBar fetchAddressDataBuyer token`+JSON.stringify(access_token));
   }
    await client
      .query({
        query: aQM.FIND_BUYER_DEFAULT_ADDRESS_BY_ID,
        variables: { buyerId: buyId },
        context: {
          headers: {
            isPrivate: true,
            Authorization: `Bearer ${access_token}`,
          },
      }
      })
      .then((result) => {
        console.log(
          `AddressBar fetchAddressDataBuyer found getBuyerDefaultAddressByBuyerId addressId ${JSON.stringify(
            result
          )}`
        );
        if (typeof result.data !== 'undefined') {
          console.log(
            `AddressBar fetchAddressDataBuyer address id ${result.data.getBuyerDefaultAddressByBuyerId.addressId}`
          );
          if (result.data.getBuyerDefaultAddressByBuyerId.addressId === null) {
            console.log(
              'AddressBar fetchAddressDataBuyer address is null so create'
            );
            toggleAddressSheet();
            return;
          }
          console.log(
            `AddressBar fetchAddressDataBuyer found getBuyerDefaultAddressByBuyerId addressId ${JSON.stringify(
              result.data
            )}`
          );
          let aL1 = gqlMappers.mapGQLAddressToDelivery(
            result.data.getBuyerDefaultAddressByBuyerId
          )
          let aL2 = gqlMappers.mapGQLAddressToLine2(
            result.data.getBuyerDefaultAddressByBuyerId
          )
          userProfileVar({
            ...userProfileVar(),
            addressId: result.data.getBuyerDefaultAddressByBuyerId.addressId,
            addressLine1:aL1,
            addressLine2:aL2,
          });
          setAddrLine1(aL1)
          setAddrLine2(aL2)
        } else {
          console.log(
            'AddressBar fetchAddressDataBuyer server error for query getBuyerDefaultAddressByBuyerId'
          );
        }
      })
      .catch((err) => {
        if (typeof err !== 'undefined') {
          console.log(
            'AddressBar fetchAddressDataBuyer Query error getBuyerDefaultAddressByBuyerId' +
              err
          );
        }
      });
  };

  return (
    <View style={styles.addressBarContainer}>
      <View style={styles.row}>
        <Image source={Images.locationMed} style={styles.icLocation} />
        <Text style={styles.heading5Regular}>
          Deliver to -{' '}
          {addrLine1}
        </Text>
        <View style={styles.areaContainer}>
          <Text style={styles.heading6Bold}>
            {addrLine2}
          </Text>
        </View>
      </View>

      <TouchableOpacity onPress={toggleAddressSheet}>
        <Image source={Images.arrow_left} style={styles.icArrowDown} />
      </TouchableOpacity>
    </View>
  );
}
