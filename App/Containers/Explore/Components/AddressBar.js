import React, { useContext, useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from '../styles';
import { AlertContext } from '../../Root/GlobalContext';
import { Images } from '../../../Themes';
import AddressSheetContent from './AddressSheetContent';

/**
 * queries for address
 */
import * as aQM from '../gql/explore_queries'
import * as gqlMappers from '../gql/gql_mappers'
import { endPointClient, PUBLIC_CLIENT_ENDPOINT } from '../../../Apollo/public-api-v3'
import { getPrivateClient } from '../../../Apollo/private-api-v3'
import { getPrivateTestClient } from '../../../Apollo/private-api-v3'
import { LOCAL_STORAGE_TOKEN_KEY, getLocalStorageValue } from '../../../Apollo/local-storage'
import * as storage from '../../../Apollo/local-storage'
import { userProfileVar } from '../../../Apollo/cache'
import { getUniqueId } from 'react-native-device-info';


export default function AddressBar() {
  const [addressUpdate, setAdressUpdate] = useState(false)
  const [regBuyerId, setRegBuyerId] = useState('')
  const [guestBuyerId, setGuestBuyerId] = useState('')

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
   */
  // useEffect(() => {
  //   toggleAddressSheet();
  // }, [toggleAddressSheet]);

  // get the buyer id from locasl storgae and tun the queries
  const getBuyerId = async () => {
    let isAuth = userProfileVar().isAuth
    if (isAuth) {
      console.log('AddressBar getBuyerId isAuth true get buyerid from local storage in statewith email= ' + userProfileVar().email)
      let bid = await storage.getLocalStorageValue(userProfileVar().email)
      setRegBuyerId(bid)
      console.log('AddressBar getBuyerId isAuth true get buyerid from local storage in state= ' + regBuyerId)
      fetchAddessDataBuyer()
    } else {
      let gbod = await storage.getLocalStorageValue(getUniqueId())
      setGuestBuyerId(gbod)
      console.log('AddressBar getBuyerId isAuth false get guestBuyerId from local storage in state= ' + guestBuyerId)
      fetchAddessDataGuest()
    }
  }

  useEffect(() => {
    console.log('AddressBar useEffect constructor getBuyerId')
    getBuyerId()
  }, []);


  // need this to get the address to show in screen see App/Containers/Explore/Components/AddLocationSheetContent.js
  useEffect(() => {
    console.log('AddressBar useEffect addressUpdate' + userProfileVar().addressId)
  }, [userProfileVar().addressId]);


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

  const fetchAddessDataGuest = async () => {
    console.log(`fetchAddessDataGuest and guest buyerId=${guestBuyerId}`)
    let client = await endPointClient(PUBLIC_CLIENT_ENDPOINT)
    await client.query({
      query: aQM.FIND_GUEST_BUYER_DEFAULT_ADDRESS_BY_ID, // return is not a collection
      variables: { buyerId: guestBuyerId }
    })
      .then((result) => {
        if (typeof result.data !== 'undefined') {
          console.log(`AddressBar found GuestBuyer addressId ${JSON.stringify(result.data)}`)
          if (result.data.getGuestBuyerDefaultAddressByBuyerId.addressId === null) {
            console.log(`found null GuestBuyer addressId  creating`)
            toggleAddressSheet()
            return
          } else {
            console.log(`AddressBar found GuestBuyer address ${JSON.stringify(result.data.getGuestBuyerDefaultAddressByBuyerId)}`)
            userProfileVar({
              ...userProfileVar(),
              addressId: result.data.getGuestBuyerDefaultAddressByBuyerId.addressId,
              addressLine1: gqlMappers.mapGQLAddressToDelivery(result.data.getGuestBuyerDefaultAddressByBuyerId),
              addressLine2: gqlMappers.mapGQLAddressToLine2(result.data.getGuestBuyerDefaultAddressByBuyerId)
            });
            setAdressUpdate(true)
            //   console.log(userProfileVar().addressId)
          }
        } else {
          console.log('AddressBar server error for query FIND_GUEST_BUYER_ADDRESS_BY_ID')
        }
      })
      .catch(err => {
        if (typeof err !== 'undefined') {
          console.log("AddressBar Query error GetGuestBuyerDefaultAddressByBuyerId" + err)
        }
      });

  }

  /** FIND_BUYER_DEFAULT_ADDRESS_BY_ID is a private api */
  const fetchAddessDataBuyer = async () => {

    // call query for registerBuyerAddress by buyer id  
    console.log(`AddressBar fetchAddessDataBuyer and  buyerId=${regBuyerId}`)
    //console.log(`AddressBar fetchAddessDataBuyer and  buyerId=${JSON.stringify(aQM.FIND_BUYER_DEFAULT_ADDRESS_BY_ID)}`)
    let client = await getPrivateClient()
    // const token = await getLocalStorageValue(LOCAL_STORAGE_TOKEN_KEY)
    // console.log(token)
    // let client = await  getPrivateTestClient(token)
    await client.query({
      query: aQM.FIND_BUYER_DEFAULT_ADDRESS_BY_ID,
      variables: { buyerId: regBuyerId }
    })
      .then((result) => {
        console.log(`AddressBar result ${result}`)
        if (typeof result.data !== 'undefined') {
          console.log(`AddressBar address id ${result.data.getBuyerDefaultAddressByBuyerId.addressId}`)
          if (result.data.getBuyerDefaultAddressByBuyerId.addressId === null) {
            console.log(`AddressBar address is null`)
            toggleAddressSheet()
            return
          }
          console.log(`AddressBar found getBuyerDefaultAddressByBuyerId addressId ${JSON.stringify(result.data)}`)

          userProfileVar({
            ...userProfileVar(),
            addressId: result.data.getBuyerDefaultAddressByBuyerId.addressId,
            addressLine1: gqlMappers.mapGQLAddressToDelivery(result.data.getBuyerDefaultAddressByBuyerId),
            addressLine2: gqlMappers.mapGQLAddressToLine2(result.data.getBuyerDefaultAddressByBuyerId)
          });
          setAdressUpdate(true)


        } else {
          console.log('AddressBar server error for query getBuyerDefaultAddressByBuyerId')
        }
      })
      .catch(err => {
        if (typeof err !== 'undefined') {
          console.log("AddressBar Query error getBuyerDefaultAddressByBuyerId" + err)
        }
      });

  }


  return (
    <View style={styles.addressBarContainer}>
      <View style={styles.row}>
        <Image source={Images.locationMed} style={styles.icLocation} />
        <Text style={styles.heading5Regular}>
          Deliver to -  {userProfileVar().addressId && userProfileVar().addressLine1}
        </Text>
        <View style={styles.areaContainer}>
          <Text style={styles.heading6Bold}>{userProfileVar().addressId && userProfileVar().addressLine2}</Text>
        </View>
      </View>

      <TouchableOpacity onPress={toggleAddressSheet}>
        <Image source={Images.arrow_left} style={styles.icArrowDown} />
      </TouchableOpacity>
    </View>
  );
}
