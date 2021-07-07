import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

const Variant = (props) => {
  const [variant, setVariant] = useState({});
  const [selectedValueDisplay, setSelectedVaueDisplay] = useState("");
  const [optionGroupId, setOptionGroupId] = useState("");
  // for now this is just for state,
  // to update the selected variants (add/ remove existing for user selection)
  const [product, setProduct] = useState({});

  useEffect(() => {
    //console.log(JSON.stringify(props.variant));
    setVariant(props.variant);
    setProduct(props.product);
    setOptionGroupId(props.variant.optionGroupId);
  }, [props.variant, props.product]);

  const updateSelectedValue = (selData, key) => {
    // console.log( `selected val ${selData} and gid ${variant.optionGroupId}` );
    setSelectedVaueDisplay(selData); // will be only one value at a time
    /** now need to update the selected variants */
    let selectedVariant = {
      optionGroupId: optionGroupId,
      value: selData,
      key: key,
    };
    // remove if it exists, keys could be the same accross variants due to
    // backend never cares about the data
    for (var i = product.selectedProductVariants.length - 1; i >= 0; i--) {
      if (
        product.selectedProductVariants[i].optionGroupId ===
        selectedVariant.optionGroupId
      ) {
        product.selectedProductVariants.splice(i, 1);
      }
    }
    product.selectedProductVariants.push(selectedVariant);
    console.log(product.selectedProductVariants);
  };

  // this will run on button select
  // we need to test on selected vals and set opacity
  const buildSimpleView = (list, gid) => {
    // check for undefined
    if (list) {
      console.log(`render selectedValueDisplay ${selectedValueDisplay}`);
      return list.map((opt, k) => {
        if (selectedValueDisplay === opt.value) {
          console.log("render selected");
          return (
            <View key={k}>
              <TouchableOpacity
                style={styles.vButtonSelected}
                onPress={() => {
                  updateSelectedValue(opt.value, opt.key);
                }}
              >
                <Text style={{ marginTop: 4, color: "grey" }}>{opt.value}</Text>
              </TouchableOpacity>
            </View>
          );
        } else {
          console.log("render inactive");
          return (
            <View key={k}>
              <TouchableOpacity
                style={styles.vButton}
                onPress={() => {
                  updateSelectedValue(opt.value, opt.key);
                }}
              >
                <Text style={{ marginTop: 4, color: "grey" }}>{opt.value}</Text>
              </TouchableOpacity>
            </View>
          );
        }
      });
    }
  };

  return (
    <View
      style={{
        flex: 1,
        flexGrow: 1,
        width: 500, // only way I can get it to fill full width
      }}
    >
      <Text style={styles.headerRow}> Value: {selectedValueDisplay}</Text>
      <View style={styles.buttonRow}>
        {buildSimpleView(variant.options, variant.optionGroupId)}
      </View>
    </View>
  );
};
const styles = ScaledSheet.create({
  buttonRow: {
    flex: 1,
    flexGrow: 1,
    flexShrink: 0,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
    marginHorizontal: 8,
    padding: 10,
  },
  headerRow: {
    flex: 1,
    alignItems: "baseline",
    flexDirection: "row",
    marginHorizontal: 12,
  },
  vButton: {
    height: "20@s",
    backgroundColor: "transparent",
    paddingHorizontal: "6@s",
    borderRadius: 4,
    borderColor: "grey",
    borderWidth: 1,
    marginRight: "20@s",
    borderStyle: "dashed",
  },
  vButtonSelected: {
    height: "20@s",
    backgroundColor: "transparent",
    paddingHorizontal: "6@s",
    borderRadius: 4,
    borderColor: "blue",
    borderWidth: 1,
    marginRight: "20@s",
  },
});
export default Variant;
