import { useState } from "react";
import { useMutation, useReactiveVar } from "@apollo/client";
import { localCartVar, userProfileVar } from "../Apollo/cache";
import {
  CREATE_BILLING_DETAILS,
  DELETE_BILLING_DETAILS,
  UPDATE_BILLING_DETAILS,
} from "../Apollo/mutations/mutations_user";
import PubSub from "pubsub-js";

const AddBillingDetail = () => {
  const userProfile = useReactiveVar(userProfileVar);
  const localCartVarReactive = useReactiveVar(localCartVar);
  const [isBillingLoaded, setIsBillingLoaded] = useState(false);
  const [addbillingDetail, setBillingDetail] = useState(null);
  const localCart = localCartVar();
  const setuserProfile = userProfileVar();
  const addressLocal = localCartVarReactive.callBackAddress;
  console.log("Here call========", localCartVarReactive.callBackAddress);
  console.log("userProfile=====", userProfile);
  console.log(
    "userProfile ===== billingDetailsId",
    userProfile.billingDetailsId
  );

  const billingAddress = {
    pinCode: addressLocal?.pinCode,
    addressType: "BILLING",
    provinceState: addressLocal?.provinceState,
    townCity: addressLocal?.townCity,
    flat: addressLocal?.flatNumber,
    villageArea: addressLocal?.villageArea,
    houseNumber: addressLocal?.houseNumber,
    country: "India",
    referenceId: global.buyerId,
    defaultAddress: true,
    streetAddress1: "",
  };
  const request = {
    buyerId: global.buyerId,
    firstName: userProfile?.firstName,
    lastName: userProfile?.lastName,
    companyName: "",
    email: userProfile?.email,
    phoneNumber: userProfile?.phoneNumber,
    billingAddress: userProfile.billingDetailsId
      ? { addressId: userProfile.billingDetailsId, ...billingAddress }
      : billingAddress,
    taxCode: addressLocal?.pinCode,
  };

  const [addBilling] = useMutation(
    userProfile.billingDetailsId
      ? UPDATE_BILLING_DETAILS
      : CREATE_BILLING_DETAILS,
    {
      variables: {
        request: userProfile.billingDetailsId
          ? {
              billingDetailsId: userProfile.billingDetailsId,
              ...request,
            }
          : request,
      },
      context: {
        headers: {
          isPrivate: true,
        },
      },
      onCompleted: (res) => {
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
    }
  );
  return {
    isBillingLoaded,
    addbillingDetail,
    addBilling,
  };
};

export default AddBillingDetail;
