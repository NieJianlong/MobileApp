import React, { useContext, useCallback } from "react";
import { View, StatusBar, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { s } from "react-native-size-matters";
import { AppBar, Button, RightButton } from "../../Components";
import styles from "./styles";
import NavigationService from "../../Navigation/NavigationService";
import colors from "../../Themes/Colors";
import AppConfig from "../../Config/AppConfig";
import { AlertContext } from "../Root/GlobalContext";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { StackActions } from "@react-navigation/native";
import Addresses from "../UserInfo/InfoList/Addresses";
import { useQuery } from "@apollo/client";
import {
  FIND_BUYER_ADDRESS_BY_ID,
  FIND_BUYER_ADDRESS_BY_ID_AND_TPYE,
} from "../../Apollo/queries/queries_user";
/**
 * @description: The user selects the shipping address page
 * @param {*} props
 * @return {*}
 */
function SelectDeliveryAddress(props) {
  const { params } = useRoute();
  const context = useContext(AlertContext);
  const popAction = StackActions.pop(2);
  const navigation = useNavigation();
  const { loading, error, data, refetch } = useQuery(
    FIND_BUYER_ADDRESS_BY_ID_AND_TPYE,
    {
      variables: {
        buyerId: global.buyerId,
        type: "SHIPPING",
      },
      context: {
        headers: {
          isPrivate: true,
        },
      },
    }
  );
  const refreshData = useCallback(() => {
    refetch();
  }, [refetch]);
  useFocusEffect(refreshData);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <SafeAreaView
        style={styles.safeArea}
        edges={["top", "right", "left", "bottom"]}
      >
        <AppBar
          rightButton={() => (
            <RightButton
              title="SAVE"
              onPress={() => {
                navigation.dispatch(popAction);
                context.dispatch({
                  type: "changAlertState",
                  payload: {
                    visible: true,
                    message:
                      "You have successfully activated 1 click purchasing method.",
                    color: colors.success,
                    title: "1 Click Purchasing Activated!",
                  },
                });
              }}
            />
          )}
        />

        <View style={{ flex: 1, paddingBottom: 90 }}>
          <Text
            style={[
              styles.heading2Bold,
              {
                fontSize: s(22),
                paddingHorizontal: AppConfig.paddingHorizontal,
              },
            ]}
          >
            Select a default delivery address
          </Text>

          <Addresses
            data={data?.getBuyerAddressByType || []}
            refetch={refetch}
          />
        </View>
        <SafeAreaView
          style={{
            position: "absolute",
            bottom: 10,
            right: 0,
            left: 0,
            paddingHorizontal: AppConfig.paddingHorizontal,
          }}
        >
          <Button
            onPress={(callback) => {
              NavigationService.navigate("AddNewAddressScreen", {
                callback,
                title: "Add new address",
              });
            }}
            textColor="white"
            text="Add new address"
            backgroundColor={colors.grey80}
          />
        </SafeAreaView>
      </SafeAreaView>
    </View>
  );
}

export default SelectDeliveryAddress;
