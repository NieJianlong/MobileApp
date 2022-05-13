import { useState } from "react";
import { useReactiveVar } from "@apollo/client";
import { localCartVar, userProfileVar } from "../Apollo/cache";
import {
  AddressType,
  BillingDetailsRequestForCreate,
  useCreateBillingDetailsForGuestBuyerMutation,
  useCreateBillingDetailsMutation,
  useUpdateBillingDetailsForGuestBuyerMutation,
  useUpdateBillingDetailsMutation,
} from "../../generated/graphql";
import { isEmpty } from "lodash";

const UseBillingDetail = () => {
  const userProfile = useReactiveVar(userProfileVar);
  const localCartVarReactive = useReactiveVar(localCartVar);
  const addressLocal = localCartVarReactive.callBackAddress;
  const billingAddress = {
    pinCode: addressLocal?.pinCode,
    addressType: AddressType.Billing,
    provinceState: addressLocal?.provinceState,
    townCity: addressLocal?.townCity,
    flat: addressLocal?.flatNumber,
    villageArea: addressLocal?.villageArea,
    houseNumber: addressLocal?.houseNumber,
    country: "India",
    referenceId: global.buyerId,
    defaultAddress: true,
    streetAddress1: addressLocal?.streetAddress1,
  };
  const request = {
    buyerId: global.buyerId,
    firstName: userProfile?.firstName,
    lastName: userProfile?.lastName,
    email: userProfile?.email,
    phoneNumber: userProfile?.phone,
    billingAddress: userProfile.billingDetailsId
      ? { addressId: userProfile.billingDetailsId, ...billingAddress }
      : billingAddress,
    taxCode: addressLocal?.pinCode,
  };
  const [updateBillingDetails] = useUpdateBillingDetailsMutation({
    context: {
      headers: {
        isPrivate: true,
      },
    },
    onCompleted: (res) => {
      userProfileVar({
        ...userProfile,
        billingDetails: res.updateBillingDetails,
        billingDetailsId: res.updateBillingDetails?.billingDetailsId,
      });
      console.log(
        "In complete===",
        userProfile?.billingDetailsId
          ? res.updateBillingDetails
          : res.createBillingDetails
      );
    },
    onError: (err) => {
      console.log("error-======", err);
      alert(err.message);
      return err;
    },
  });
  const [updateGuestBillingDetails] =
    useUpdateBillingDetailsForGuestBuyerMutation({
      onCompleted: (res) => {
        userProfileVar({
          ...userProfile,
          billingDetails: res.updateBillingDetails,
          billingDetailsId: res.updateBillingDetails?.billingDetailsId,
        });
        console.log(
          "In complete===",
          userProfile?.billingDetailsId
            ? res.updateBillingDetails
            : res.createBillingDetails
        );
      },
      onError: (err) => {
        console.log("error-======", err);
        alert(err.message);
        return err;
      },
    });
  const [createBilling] = useCreateBillingDetailsMutation({
    context: {
      headers: {
        isPrivate: true,
      },
    },
    onError: (err) => {
      console.log("error-======", err);

      return err;
    },
  });
  const [createGuestBilling] = useCreateBillingDetailsForGuestBuyerMutation({
    onCompleted: (res) => {
      userProfileVar({
        ...userProfile,
        billingDetails: res.createBillingDetailsForGuestBuyer,
        billingDetailsId:
          res.createBillingDetailsForGuestBuyer?.billingDetailsId,
      });
    },
    onError: (err) => {
      console.log("error-======", err);

      return err;
    },
  });
  async function addBilling(data: BillingDetailsRequestForCreate | undefined) {
    let result;
    let resultTemp1;
    if (isEmpty(userProfile.billingDetailsId)) {
      if (userProfile.isAuth) {
        resultTemp1 = await createBilling({
          variables: {
            request: { ...request, ...data },
          },
        });
        result = resultTemp1?.data?.createBillingDetails;
      } else {
        resultTemp1 = await createGuestBilling({
          variables: {
            request: { ...request, ...data },
          },
        });
        result = resultTemp1?.data?.createBillingDetailsForGuestBuyer;
      }
    } else {
      if (userProfile.isAuth) {
        resultTemp1 = await updateBillingDetails({
          variables: {
            request: {
              billingDetailsId: userProfile.billingDetailsId,
              ...request,
              ...request,
              ...data,
            },
          },
        });
        result = resultTemp1?.data?.updateBillingDetails;
      } else {
        resultTemp1 = await updateGuestBillingDetails({
          variables: {
            request: {
              billingDetailsId: userProfile.billingDetailsId,
              ...request,
              ...data,
            },
          },
        });
        result = resultTemp1?.data?.updateBillingDetailsForGuestBuyer;
      }
    }

    global.billingDetails = result;

    userProfileVar({
      ...userProfile,
      billingDetails: result,
      billingDetailsId: result?.billingDetailsId,
    });
    return result?.billingDetailsId;
  }
  return {
    addBilling,
  };
};

export default UseBillingDetail;
