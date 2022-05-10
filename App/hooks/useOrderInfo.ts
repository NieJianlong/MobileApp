import { createModel } from "hox";
import { useState } from "react";
import { IsListingAvailableFieldFragment } from "../../generated/graphql";
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

  const {
    currentBilling,
    originalBilling,
    deliveryFess,
    itemsForRequest,
    allItems,
    walletBalance,
    comeFromType,
  } = orderInfo;
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
  };
};
export default createModel(useOrderInfo);
