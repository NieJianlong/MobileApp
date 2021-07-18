import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { s, vs } from "react-native-size-matters";
import { Button } from "../../../Components";

import { Colors } from "../../../Themes";
import styles from "./styles";
import NavigationService from "../../../Navigation/NavigationService";
import { AlertContext } from "../../Root/GlobalContext";

export default function AddToCartSheetContent() {
  const { dispatch } = useContext(AlertContext);
  const toggleAddToCartSheet = useCallback(() => {
    dispatch({
      type: "changSheetState",
      payload: {
        showSheet: false,
        height: 0,
      },
    });
  }, [dispatch]);
  return (
    <View style={{ flex: 1, justifyContent: "flex-end" }}>
      <Text
        style={[
          styles.txtRegular,
          { textAlign: "center", marginBottom: vs(25) },
        ]}
      >
        There are now 2 items in your cart
      </Text>

      <Button onPress={toggleAddToCartSheet} text={"GO TO CHECKOUT"} />

      <View style={styles.btnRow}>
        <View style={styles.v5}>
          <Button
            onPress={toggleAddToCartSheet}
            text={"CONTINUE"}
            backgroundColor={Colors.grey80}
          />
        </View>

        <View style={styles.v5}>
          <Button
            text={"VIEW CART"}
            backgroundColor={Colors.grey80}
            onPress={() => NavigationService.navigate("ShoppingCartScreen")}
          />
        </View>
      </View>
    </View>
  );
}
