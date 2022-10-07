import React, { useContext, useCallback } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { s } from "react-native-size-matters";
import { AppBar, RightButton } from "../../Components";
import styles from "./styles";
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
import { FIND_BUYER_ADDRESS_BY_ID_AND_TPYE } from "../../Apollo/queries/queries_user";
import { t } from "react-native-tailwindcss";
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
        addressType: "SHIPPING",
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

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={[t.mR6]}>
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
        </View>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
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

        <Addresses data={data?.getBuyerAddressByType || []} refetch={refetch} />
      </View>
      <SafeAreaView
        style={{
          position: "absolute",
          bottom: 10,
          right: 0,
          left: 0,
          paddingHorizontal: AppConfig.paddingHorizontal,
        }}
      />
    </View>
  );
}

export default SelectDeliveryAddress;
