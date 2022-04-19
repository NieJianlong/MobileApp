import { useState } from "react";
import { useReactiveVar } from "@apollo/client";
import { localCartVar, userProfileVar } from "../Apollo/cache";
import {
  AddressType,
  useCreateBillingDetailsForGuestBuyerMutation,
  useCreateBillingDetailsMutation,
  useUpdateBillingDetailsForGuestBuyerMutation,
  useUpdateBillingDetailsMutation,
} from "../../generated/graphql";
import { isEmpty } from "lodash";

const AddBillingDetail = () => {
  const userProfile = useReactiveVar(userProfileVar);
  const localCartVarReactive = useReactiveVar(localCartVar);
  const [isBillingLoaded, setIsBillingLoaded] = useState(false);
  const [addbillingDetail, setBillingDetail] = useState(null);
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
    phoneNumber: userProfile?.phoneNumber,
    billingAddress: userProfile.billingDetailsId
      ? { addressId: userProfile.billingDetailsId, ...billingAddress }
      : billingAddress,
    taxCode: addressLocal?.pinCode,
  };
  const [updateBillingDetails] = useUpdateBillingDetailsMutation({
    variables: {
      request: {
        billingDetailsId: userProfile.billingDetailsId,
        ...request,
      },
    },
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
      variables: {
        request: {
          billingDetailsId: userProfile.billingDetailsId,
          ...request,
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
  const [createBilling] = useCreateBillingDetailsMutation({
    context: {
      headers: {
        isPrivate: true,
      },
    },
    variables: {
      request: request,
    },
    onError: (err) => {
      console.log("error-======", err);

      return err;
    },
  });
  const [createGuestBilling] = useCreateBillingDetailsForGuestBuyerMutation({
    variables: {
      request: request,
    },
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
  async function addBilling() {
    let result;
    let resultTemp1;
    if (isEmpty(userProfile.billingDetailsId)) {
      if (userProfile.isAuth) {
        resultTemp1 = await createBilling();
        result = resultTemp1?.data?.createBillingDetails;
      } else {
        resultTemp1 = await createGuestBilling();
        result = resultTemp1?.data?.createBillingDetailsForGuestBuyer;
      }
    } else {
      if (userProfile.isAuth) {
        resultTemp1 = await updateBillingDetails();
        result = resultTemp1?.data?.updateBillingDetails;
      } else {
        resultTemp1 = await updateGuestBillingDetails();
        result = resultTemp1?.data?.updateBillingDetailsForGuestBuyer;
      }
    }
    userProfileVar({
      ...userProfile,
      billingDetails: result,
      billingDetailsId: result?.billingDetailsId,
    });
    return result?.billingDetailsId;
  }
  return {
    isBillingLoaded,
    addbillingDetail,
    addBilling,
  };
};

export default AddBillingDetail;
