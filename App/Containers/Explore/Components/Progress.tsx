import React from "react";
import { s, vs } from "react-native-size-matters";
import { Progress } from "../../../Components";

function ProgressC({ product }) {
  return (
    <Progress
      maximumValue={product.noOfItemsInStock}
      currentValue={
        product.missed ? product.noOfItemsInStock : product.noOfOrderedItems
      }
      barWidth={s(60)}
      barHeight={vs(6)}
    />
  );
}

export default ProgressC;
