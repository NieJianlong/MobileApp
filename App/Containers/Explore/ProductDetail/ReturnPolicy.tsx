import React from "react";
import { Text, useWindowDimensions, View } from "react-native";
import { t } from "react-native-tailwindcss";
import { ProductReturnPolicyViewFieldFragment } from "../../../../generated/graphql";
import ReturnPolicy1 from "../../../Components/SvgComponents/ReturnPolicy1";
import ReturnPolicy2 from "../../../Components/SvgComponents/ReturnPolicy2";
import ReturnPolicy3 from "../../../Components/SvgComponents/ReturnPolicy3";
import styles from "../styles";

interface ReturnPolicyProps {
  returnPolices: ProductReturnPolicyViewFieldFragment[];
}

function ReturnPolicy({ returnPolices }: ReturnPolicyProps) {
  const icons = [
    <ReturnPolicy1 />,
    <ReturnPolicy2 />,
    <ReturnPolicy3 />,
    <ReturnPolicy1 />,
    <ReturnPolicy2 />,
    <ReturnPolicy3 />,
  ];
  const titles = [
    "Wrong product delivered",
    "Manufacturing defects",
    "Size replacements",
  ];
  const return_period = returnPolices.find(
    (item) => item.name === "return_period"
  );
  const items = returnPolices.filter(
    (item) => item.name === "allowed_return_reason"
  );
  const { width } = useWindowDimensions();
  const width1 = width - 64;
  const firstLine =
    Number(return_period?.value) === 0 || return_period?.value === "0"
      ? "No returns"
      : `Allowed return period:${return_period?.value} days`;
  const allItems = [{ value: firstLine }, ...items];
  debugger;
  return (
    <View>
      <Text style={[styles.heading3Bold, t.textLeft, t.pX4]}>
        Return Policy
      </Text>
      <View style={[t.roundedLg, t.pX4, t.itemsCenter]}>
        <View style={[t.wFull, t.justifyAround, t.mB4, t.mT2]}>
          {allItems.map((title, index) => {
            return (
              <View key={index} style={[styles.row, t.itemsCenter]}>
                <View
                  style={[t.w1, t.h1, t.roundedFull, t.bgBlack, t.mR4, t.mT1]}
                />
                <Text style={styles.txtRegular}> {title.value}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}

export default ReturnPolicy;
