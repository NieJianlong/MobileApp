import { createModel } from "hox";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import {
  DeliveryOption,
  IsListingAvailableFieldFragment,
} from "../../generated/graphql";
import { ComeFromType } from "../Utils/utils";
import { ItemProps } from "./useCreateOrder";

interface OrderInfoProps {
  currentBilling: number;
  originalBilling?: number;
  deliveryFess?: number;
  itemsForRequest: any[];
  allItems: ItemProps[];
  walletBalance: number;
  comeFromType: ComeFromType;
  availbleList: IsListingAvailableFieldFragment[];
}

const useOrderInfo = () => {
  const [orderInfo, setOrderInfo] = useState<OrderInfoProps>({
    currentBilling: 0,
    originalBilling: 0,
    deliveryFess: 0,
    itemsForRequest: [],
    allItems: [],
    walletBalance: 0,
    comeFromType: ComeFromType.Buynow,
    availbleList: [],
  });
  const updateMoneyInfo = ({
    itemsForRequest,
    allItems,
    availbleList,
    comeFromType,
  }: OrderInfoProps) => {
    let currentBilling = 0;
    let originalBilling = 0;
    let deliveryFess = 0;
    debugger;
    for (let index = 0; index < allItems.length; index++) {
      const element = allItems[index];
      let itemAvailble: boolean = true;
      if (!isEmpty(availbleList) && !availbleList) {
        const i = availbleList[index];
        itemAvailble = i?.isAvailable;
      }
      const courierShippingFee =
        element?.productDetails?.courierShippingFee ?? 0;
      const variantRetailPrice = element.variant.retailPrice ?? 0;
      const variantWholeSalePrice = element.variant.wholeSalePrice ?? 0;
      const productRetailPrice = element.productDetails.retailPrice ?? 0;
      const productWholeSalePrice = element.productDetails.wholeSalePrice ?? 0;
      if (itemAvailble) {
        if (
          element?.productDetails?.deliveryOption ===
          DeliveryOption.CourierDelivery
        ) {
          deliveryFess = courierShippingFee + deliveryFess;
        }
        if (element.variant) {
          originalBilling =
            originalBilling + variantRetailPrice * element.quantity;
          currentBilling =
            currentBilling + variantWholeSalePrice * element.quantity;
        } else {
          originalBilling =
            originalBilling + productRetailPrice * element.quantity;
          currentBilling =
            currentBilling + productWholeSalePrice * element.quantity;
        }
      }
    }
    const newItem = {
      ...orderInfo,
      itemsForRequest: itemsForRequest,
      allItems,
      comeFromType: comeFromType,
      availbleList: availbleList,
      currentBilling,
      originalBilling,
      deliveryFess,
    };

    setOrderInfo(newItem);
  };
  const {
    currentBilling,
    originalBilling,
    deliveryFess,
    itemsForRequest,
    allItems,
    walletBalance,
    comeFromType,
  } = orderInfo;
  useEffect(() => {
    console.log("orderInfo changed====================================");
    console.log(orderInfo);
    console.log("====================================");
  }, [orderInfo]);
  return {
    currentBilling,
    originalBilling,
    deliveryFess,
    itemsForRequest,
    allItems,
    walletBalance,
    comeFromType,
    setOrderInfo,
    orderInfo,
    updateMoneyInfo,
  };
};
export default createModel(useOrderInfo);
