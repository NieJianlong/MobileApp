import { useState } from "react";
import { useReactiveVar } from "@apollo/client";
import { localCartVar, userProfileVar } from "../Apollo/cache";
import { isEmpty } from "lodash";
import NavigationService from "../Navigation/NavigationService";
import useLoading from "./useLoading";
import { ComeFromType, usePaymentConfigration } from "../Utils/utils";
import { useCreateRazorOrder } from "./razorOrder";
import {
  BillingDetailsRequestForCreate,
  DeliveryOption,
  IsListingAvailableFieldFragment,
  ListingVariantViewFieldFragment,
  ProductListingViewFieldFragment,
  useCreateOrderFromCartMutation,
  useGetBuyerSalamiWalletBalanceLazyQuery,
} from "../../generated/graphql";
import BigNumber from "bignumber.js";
import UseBillingDetail from "./useBillingDetail";
import useOrderInfo from "./useOrderInfo";
import useAlert from "./useAlert";
import { Colors } from "../Themes";
export interface ItemProps {
  listingId: string;
  quantity: number;
  variantId: string;
  productDetails: ProductListingViewFieldFragment;
  variant: ListingVariantViewFieldFragment;
}
export enum OrderType {
  sufficient = "sufficient",
  zero = "zero",
  inSufficient = "InSufficient",
}

export const useCreateOrder = () => {
  const [order, setOrder] = useState();
  const { setAlert } = useAlert();
  const { addBilling } = UseBillingDetail();
  const [createOrderFromCart] = useCreateOrderFromCartMutation();
  const userProfile = useReactiveVar(userProfileVar);
  const localCart = useReactiveVar(localCartVar);
  const { setLoading } = useLoading();
  const { orderInfo, setOrderInfo } = useOrderInfo();
  const getPaymentConfigration = usePaymentConfigration();
  const { razorpayCreateOrder } = useCreateRazorOrder();
  const [getBuyerSalamiWalletBalance] = useGetBuyerSalamiWalletBalanceLazyQuery(
    {
      context: {
        headers: {
          isPrivate: true,
        },
      },
    }
  );

  const moneyInfo = ({
    data,
    walletBalance = 0,
    availbleList,
    comeFromType,
  }: {
    data: ItemProps[];
    walletBalance: number;
    availbleList?: IsListingAvailableFieldFragment[];
    comeFromType: ComeFromType;
  }) => {
    let currentBilling = 0;
    let originalBilling = 0;
    let deliveryFess = 0;

    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      let itemAvailble: boolean = true;
      if (!isEmpty(availbleList)) {
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
          originalBilling = originalBilling + variantRetailPrice;
          0 * element.quantity;
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
    const total = currentBilling;
    const saving = originalBilling - currentBilling;
    // setOrderInfo({
    //   ...orderInfo,
    //   currentBilling,
    //   originalBilling,
    //   deliveryFess,
    //   walletBalance,
    // });
    let orderType = OrderType.zero;
    if (walletBalance >= total) {
      orderType = OrderType.sufficient;
    } else if (walletBalance === 0 || walletBalance < 0) {
      orderType = OrderType.zero;
    } else {
      orderType = OrderType.inSufficient;
    }
    return {
      total: currentBilling,
      orderType,
      saving: saving,
      percent: new BigNumber(saving)
        .dividedBy(total)
        .multipliedBy(100)
        .toFixed(2),
      deliveryFess: deliveryFess,
      comeFromType,
    };
  };

  const createOrder = async ({
    data,
    isFromInSufficientSalamiCreditScreen = false,
    itemsForRequest,
    comeFromType,
    allItems,
    availbleList,
    paymentRetry = false,
  }: {
    data?: BillingDetailsRequestForCreate;
    isFromInSufficientSalamiCreditScreen?: boolean;
    itemsForRequest?: any[];
    comeFromType?: ComeFromType;
    allItems?: ItemProps[];
    availbleList?: IsListingAvailableFieldFragment[];
    paymentRetry?: boolean;
  }) => {
    setLoading({ show: true });

    let walletBalance = 0;
    if (userProfile.isAuth) {
      const { data: balanceData } = await getBuyerSalamiWalletBalance();
      const remoteBalance =
        balanceData?.getBuyerSalamiWalletBalance?.walletBalance ?? 0;
      const remoteGiftBalance =
        balanceData?.getBuyerSalamiWalletBalance?.giftBalance ?? 0;
      walletBalance = parseFloat(
        new BigNumber(remoteBalance + remoteGiftBalance).toFixed(2)
      );
    }
    const info = moneyInfo({
      data: isEmpty(orderInfo.allItems) ? allItems : orderInfo.allItems,
      walletBalance,
      availbleList: isEmpty(orderInfo.availbleList)
        ? availbleList
        : orderInfo.availbleList,
      comeFromType: comeFromType ? comeFromType : orderInfo.comeFromType,
    });
    // if (info.orderType === OrderType.inSufficient) {
    if (
      !isFromInSufficientSalamiCreditScreen &&
      info.orderType === OrderType.inSufficient
    ) {
      NavigationService.navigate("InSufficientSalamiCreditScreen");
      return;
    }

    // }

    const billingDetailsId = await addBilling(data ?? undefined);
    const cart = {
      buyerId: global.buyerId,
      shippingAddressId: localCart.deliverAddress,
      billingDetailsId: isEmpty(billingDetailsId)
        ? userProfile.billingDetailsId
        : billingDetailsId,
      useSalamiWallet: true,
      cartItems: !isEmpty(itemsForRequest)
        ? itemsForRequest
        : orderInfo.itemsForRequest,
      paymentRetry: paymentRetry ? paymentRetry : false,
    };

    createOrderFromCart({
      variables: {
        cart,
      },
      context: {
        headers: {
          isPrivate: userProfile.isAuth,
        },
      },
      onCompleted: (res) => {
        if (info.orderType === OrderType.sufficient) {
          setLoading({ show: false });
          if (res?.createOrderFromCart?.orderId) {
            NavigationService.navigate("OrderPlacedScreen");
          }
        } else if (
          info.orderType === OrderType.zero ||
          info.orderType === OrderType.inSufficient
        ) {
          const order1 = res?.createOrderFromCart;
          if (res?.createOrderFromCart?.orderId) {
            razorpayCreateOrder(order1).then(async (res1) => {
              if (res1?.data) {
                const razorId =
                  res1?.data?.razorpayCreateOrder?.razorpayOrderId;
                try {
                  await getPaymentConfigration(
                    razorId ?? "",
                    order1.paymentDetails.balanceToPay
                  );
                  setLoading({ show: false });
                } catch (error) {
                  setLoading({ show: false });
                }
              }
            });
          }
          return res?.createOrderFromCart;
        }
      },
      onError: (res) => {
        setLoading({ show: false });
        setAlert({
          visible: true,
          message: res.message,
          color: Colors.error,
          onDismiss: () => {
            setAlert({ visible: false });
          },
        });
      },
    });
  };

  const retryPayment = async ({
    isFromInSufficientSalamiCreditScreen = false,
    itemsForRequest,
    allItems,
    availbleList,
    billingDetailsId,
    shippingAddressId,
  }: {
    isFromInSufficientSalamiCreditScreen?: boolean;
    itemsForRequest?: any[];
    allItems?: ItemProps[];
    availbleList?: IsListingAvailableFieldFragment[];
    billingDetailsId: string;
    shippingAddressId: string;
  }) => {
    setLoading({ show: true });

    let walletBalance = 0;
    if (userProfile.isAuth) {
      const { data: balanceData } = await getBuyerSalamiWalletBalance();
      const remoteBalance =
        balanceData?.getBuyerSalamiWalletBalance?.walletBalance ?? 0;
      const remoteGiftBalance =
        balanceData?.getBuyerSalamiWalletBalance?.giftBalance ?? 0;
      walletBalance = parseFloat(
        new BigNumber(remoteBalance + remoteGiftBalance).toFixed(2)
      );
    }
    const info = moneyInfo({
      data: allItems,
      walletBalance,
      availbleList: availbleList,
      comeFromType: ComeFromType.checkout,
    });
    // if (info.orderType === OrderType.inSufficient) {
    if (
      !isFromInSufficientSalamiCreditScreen &&
      info.orderType === OrderType.inSufficient
    ) {
      NavigationService.navigate("InSufficientSalamiCreditScreen");
      return;
    }
    const cart = {
      buyerId: global.buyerId,
      shippingAddressId: shippingAddressId,
      billingDetailsId,
      useSalamiWallet: true,
      cartItems: itemsForRequest,
      paymentRetry: true,
    };

    createOrderFromCart({
      variables: {
        cart,
      },
      context: {
        headers: {
          isPrivate: userProfile.isAuth,
        },
      },
      onCompleted: (res) => {
        if (info.orderType === OrderType.sufficient) {
          setLoading({ show: false });
          if (res?.createOrderFromCart?.orderId) {
            NavigationService.navigate("OrderPlacedScreen");
          }
        } else if (
          info.orderType === OrderType.zero ||
          info.orderType === OrderType.inSufficient
        ) {
          const order1 = res?.createOrderFromCart;
          if (res?.createOrderFromCart?.orderId) {
            razorpayCreateOrder(order1).then(async (res1) => {
              if (res1?.data) {
                const razorId =
                  res1?.data?.razorpayCreateOrder?.razorpayOrderId;
                try {
                  await getPaymentConfigration(
                    razorId ?? "",
                    order1.paymentDetails.balanceToPay
                  );
                  setLoading({ show: false });
                } catch (error) {
                  setLoading({ show: false });
                }
              }
            });
          }
          return res?.createOrderFromCart;
        }
      },
      onError: (res) => {
        setLoading({ show: false });
        setAlert({
          visible: true,
          message: res.message,
          color: Colors.error,
          onDismiss: () => {
            setAlert({ visible: false });
          },
        });
      },
    });
  };
  return {
    createOrderFromCart,
    createOrder,
    order,
    retryPayment,
    moneyInfo,
  };
};
