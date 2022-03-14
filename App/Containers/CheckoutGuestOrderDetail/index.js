import React, { useState, useMemo } from "react";
import { View, TouchableOpacity, Text } from "react-native";

import BaseScreen from "../BaseScreen";
import { AppBar, Switch } from "../../Components";
import { MaterialTextInput } from "../../Components";
import { useQuery, useReactiveVar } from "@apollo/client";
import { userProfileVar } from "../../Apollo/cache";
import styles from "./styles";
import * as aQM from "../../Containers/Explore/gql/explore_queries";
import * as gqlMappers from "../../Containers/Explore/gql/gql_mappers";
import {
  FIND_GUEST_BUYER_DEFAULT_ADDRESS_BY_ID,
  FIND_GUEST_ADDRESS_BY_ID_AND_TPYE,
} from "../../Apollo/queries/queries_user";

function CheckoutGuestOrderDetail(props) {
  const userProfileVarReactive = useReactiveVar(userProfileVar);
  const [email, setEmail] = useState(null);
  const [fName, setFName] = useState(null);
  const [lName, setLName] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [isSameAsDelivery, setIsSameAsDelivery] = useState(true);
  const isAuth = useMemo(
    () => userProfileVarReactive.isAuth,
    [userProfileVarReactive.isAuth]
  );

  const { loading, refetch } = useQuery(
    aQM.FIND_GUEST_BUYER_DEFAULT_ADDRESS_BY_ID,
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
        console.log("Error===========", err);
      },
      onCompleted: (result) => {
        if (result) {
          // debug only

          const resultJson = result.getGuestBuyerDefaultAddressByBuyerId;
          console.log("resultJson =========== resultJson", resultJson);
          let aL1 = gqlMappers.mapGQLAddressToDelivery(resultJson);
          let aL2 = gqlMappers.mapGQLAddressToLine2(resultJson);
          setDeliveryAddress(resultJson);
          console.log("resultJson", resultJson.flat);
          console.log("resultJson", resultJson.houseNumber);
          console.log("resultJson", resultJson.landMark);
          console.log("resultJson", resultJson.pinCode);
          console.log("resultJson", resultJson.provinceState);
          console.log("aL1====aL2", aL1, aL2);
          if (aL1.length > 10) {
            aL1 = aL1.substring(0, 17);
          }
          if (aL2.length > 10) {
            aL2 = aL2.substring(0, 16);
          }

          // callBackAddress used for gql query to get geo co-ords see useEffect Explore
        }
      },
    }
  );

  const variables = { guestBuyerId: global.buyerId, addressType: "SHIPPING" };
  const { error, data } = useQuery(FIND_GUEST_ADDRESS_BY_ID_AND_TPYE, {
    variables: variables,
    context: {
      headers: {
        isPrivate: isAuth,
      },
    },
  });

  console.log("Dtaaaaaaaa", data);
  return (
    <BaseScreen {...props}>
      <AppBar
        rightButton={() => {
          return (
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.rightButton}>Next</Text>
            </TouchableOpacity>
          );
        }}
      />
      <View style={styles.container}>
        <View style={styles.horizontalCenter}>
          <Text style={styles.title}>Please enter details for the order</Text>
          <Text style={styles.description}>
            All guests receive confirmation through email only.
          </Text>
          <Text style={styles.boldDescription}>
            Please make sure your email is correct!
          </Text>
        </View>

        <View style={styles.inputsWrapper}>
          <MaterialTextInput
            placeholder="Email*"
            onChangeText={(text) => setEmail(text)}
            showError={false}
            keyboardType="email-address"
          />
          <View style={styles.inputsWrapper2}>
            <View style={styles.inputName}>
              <MaterialTextInput
                placeholder="FirstName*"
                onChangeText={(text) => setFName(text)}
                showError={false}
                keyboardType="default"
              />
            </View>

            <View style={styles.inputName}>
              <MaterialTextInput
                placeholder="LastName*"
                onChangeText={(text) => setLName(text)}
                showError={false}
                keyboardType="default"
              />
            </View>
          </View>
        </View>

        <View style={styles.deliveryAddressSection}>
          <Text style={styles.deliveryAddressSectionTitle}>
            Current Delivery Address
          </Text>
          <View style={styles.deliveryDescriptionBox}>
            <Text style={styles.deliveryDescriptionText}>
              {deliveryAddress?.flat + deliveryAddress?.houseNumber}
            </Text>
            <Text style={styles.deliveryDescriptionText}>
              {deliveryAddress?.pinCode + deliveryAddress?.provinceState}
            </Text>
            <Text style={styles.deliveryDescriptionText}>India</Text>
          </View>

          <View style={styles.switch}>
            <Switch
              onSwitch={(b) => setIsSameAsDelivery(b)}
              active={isSameAsDelivery}
              label="Billing address is the same as delivery"
            />
          </View>
        </View>
      </View>
    </BaseScreen>
  );
}

export default CheckoutGuestOrderDetail;
