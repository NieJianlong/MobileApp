import React, { useEffect, useMemo, useState } from "react";
import { View, Text } from "react-native";
import { s, vs } from "react-native-size-matters";
s;
import AppConfig from "../../../Config/AppConfig";
import useRealm from "../../../hooks/useRealm";
import colors from "../../../Themes/Colors";
import styles from "../styles";
import PubSub from "pubsub-js";
import { useQuery } from "@apollo/client";
import { GET_LOCAL_CART } from "../../../Apollo/cache";

function CartSummary(props) {
  const { realm } = useRealm();
  const {
    data: { localCartVar },
  } = useQuery(GET_LOCAL_CART);
  const [mydatas, setMydatas] = useState(
    realm
      .objects("ShoppingCart")
      .filtered("addressId == $0", localCartVar.deliverAddress)
      .filtered("quantity > 0")
      .filtered("isDraft == false")
  );
  useEffect(() => {
    let refresh = PubSub.subscribe("refresh-shoppingcart", () => {
      setMydatas(
        realm
          .objects("ShoppingCart")
          .filtered("addressId == $0", localCartVar.deliverAddress)
          .filtered("quantity > 0")
          .filtered("isDraft == false")
      );
    });
    return () => {
      PubSub.unsubscribe(refresh);
    };
  }, [localCartVar.deliverAddress, realm]);
  const quantity = useMemo(() => {
    let currentQuantity = 0;
    for (let index = 0; index < mydatas.length; index++) {
      const element = mydatas[index];
      currentQuantity = currentQuantity + element.quantity;
    }
    return currentQuantity;
  }, [mydatas]);
  return (
    <View style={{ padding: AppConfig.paddingHorizontal }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.heading4Bold}>Subtotal (2 items)</Text>
        <Text style={[styles.heading4Bold, { color: colors.primary }]}>
          $1,639.97
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: vs(10),
          justifyContent: "space-between",
        }}
      >
        <Text style={[styles.heading4Regular, { fontSize: s(14) }]}>
          You save
        </Text>
        <Text style={[styles.heading4Regular, { fontSize: s(14) }]}>
          $490 (30%)
        </Text>
      </View>
    </View>
  );
}

export default CartSummary;
