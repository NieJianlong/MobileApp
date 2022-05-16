import React from "react";
import { Text, useWindowDimensions, View } from "react-native";
import { t } from "react-native-tailwindcss";
import { ProductReturnPolicyViewFieldFragment } from "../../../../generated/graphql";
import ReturnPolicy1 from "../../../Components/SvgComponents/ReturnPolicy1";
import ReturnPolicy2 from "../../../Components/SvgComponents/ReturnPolicy2";
import ReturnPolicy3 from "../../../Components/SvgComponents/ReturnPolicy3";

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
  return (
    <View style={[t.pX4]}>
      <View
        style={[
          { backgroundColor: "#EEEFF1" },
          t.roundedLg,
          t.p4,
          t.itemsCenter,
        ]}
      >
        <Text>
          {Number(return_period?.value) === 0 || return_period?.value === "0"
            ? "No returns"
            : `Covered by seller ${return_period?.value} days return policy, for:`}
        </Text>
        <View style={[t.wFull, t.flexRow, t.justifyAround, t.mY4, t.flexWrap]}>
          {items.map((title, index) => {
            return (
              <View style={[t.itemsCenter, t.mT2]}>
                {icons[index]}
                <Text style={[{ width: width1 / 3 }, t.textCenter, t.mT2]}>
                  {title.value}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}

export default ReturnPolicy;
