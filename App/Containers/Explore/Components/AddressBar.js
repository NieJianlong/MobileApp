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
import { endPointClient, PUBLIC_CLIENT_ENDPOINT } from '../../../Apollo/public-api-v3'
import { getPrivateClient } from '../../../Apollo/private-api-v3'
import * as storage from '../../../Apollo/local-storage'
import { userProfileVar } from '../../../Apollo/cache'
import { getUniqueId } from 'react-native-device-info';


export default function AddressBar() {
  let [deliveryAddress, setDeliveryAddress] = useState('Deliver to - Tanil Nadu 12345')


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
   * we wil only toggle toggleAddressSheet if address not exist
   */
  useEffect(() => {
    toggleAddressSheet();
  }, [toggleAddressSheet]);

  useEffect(() => {
    console.log(`useEffect=$`)
    fetchAddessData()
    // just a test for now
    setDeliveryAddress('updated')

  }, []);



  /**
   * get the list of address to populate the add addres bottom sheet
   * called when component mounts useEffect
   * use mutation hook is only available for public api
   * so using standalone clients
   * FIND_BUYER_ADDRESS_BY_ID is private endpoint use emais as key for
   * guest buyer id in local storage
   * 
   * FIND_GUEST_BUYER_ADDRESS_BY_ID public endpoint  use device id as key for
   * guest buyer id in local storage
   * see './gql/explore_queries'
   */
  const fetchAddessData = async () => {
    let isAuth = userProfileVar().isAuth
    console.log(`showLocationSheet and isAuth=${isAuth}`)
    let buyerId = ``
    if (isAuth) {
      // call query for registerBuyerAddress by buyer id  
      // use email here
      let email = userProfileVar().email
      buyerId = await storage.getLocalStorageValue(email)
      console.log(`registerBuyerAddress and buyerId=${buyerId}`)

      let client = await getPrivateClient()
      await client.query({
        query: aQM.FIND_BUYER_ADDRESS_BY_ID,
        variables: { buyerId: buyerId }
      })
        .then((result) => {
          if (typeof result.data !== 'undefined') {
            if (!Array.isArray(result.data.getBuyerAddressesById) || !result.data.getBuyerAddressesById.length) {
              console.log("Query returns no data show add address ")
              toggleAddressSheet()
            }


          } else {
            console.log('server error for query FIND_GUEST_BUYER_ADDRESS_BY_ID')
          }
        })
        .catch(err => {
          if (typeof err !== 'undefined') {
            console.log("Query error " + err)
          }
        });

    } else {
      // call query for guestBuyerAddress by id
      //  
      buyerId = await storage.getLocalStorageValue(getUniqueId())
      console.log(`showLocationSheet and guest buyerId=${buyerId}`)
      let client = await endPointClient(PUBLIC_CLIENT_ENDPOINT)
      await client.query({
        query: aQM.FIND_GUEST_BUYER_ADDRESS_BY_ID,
        variables: { buyerId: buyerId }
      })
        .then((result) => {
          if (typeof result.data !== 'undefined') {
            if (!Array.isArray(result.data.getGuestBuyerAddressesById) || !result.data.getGuestBuyerAddressesById.length) {
              console.log("Query returns no data show add address  ")
              toggleAddressSheet()
            }

          } else {
            console.log('server error for query FIND_GUEST_BUYER_ADDRESS_BY_ID')
          }
        })
        .catch(err => {
          if (typeof err !== 'undefined') {
            console.log("Query error " + err)
          }
        });
    }
  }


  return (
    <View style={styles.addressBarContainer}>
      <View style={styles.row}>
        <Image source={Images.locationMed} style={styles.icLocation} />
        <Text style={styles.heading5Regular}>
          {deliveryAddress}
        </Text>
        <View style={styles.areaContainer}>
          <Text style={styles.heading6Bold}>Area 4</Text>
        </View>
      </View>

      <TouchableOpacity onPress={toggleAddressSheet}>
        <Image source={Images.arrow_left} style={styles.icArrowDown} />
      </TouchableOpacity>
    </View>
  );
}
