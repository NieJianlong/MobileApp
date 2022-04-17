import { useState } from "react";
import { useReactiveVar } from "@apollo/client";
import { localCartVar, userProfileVar } from "../Apollo/cache";
import {
  AddressType,
  useCreateBillingDetailsMutation,
  useUpdateBillingDetailsMutation,
} from "../../generated/graphql";
import { isEmpty } from "lodash";

const AddBillingDetail = () => {
  const userProfile = useReactiveVar(userProfileVar);
  const localCartVarReactive = useReactiveVar(localCartVar);
  const [isBillingLoaded, setIsBillingLoaded] = useState(false);
  const [addbillingDetail, setBillingDetail] = useState(null);
  const addressLocal = localCartVarReactive.callBackAddress;
  console.log("Here call========", localCartVarReactive.callBackAddress);
  console.log("userProfile=====", userProfile);
  console.log(
    "userProfile ===== billingDetailsId",
    userProfile.billingDetailsId
  );

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
    companyName: "",
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
  const [createBilling] = useCreateBillingDetailsMutation({
    context: {
      headers: {
        isPrivate: true,
      },
    },
    variables: {
      request: request,
    },
    onCompleted: (res) => {
      userProfileVar({
        ...userProfile,
        billingDetails: res.createBillingDetails,
        billingDetailsId: res.createBillingDetails?.billingDetailsId,
      });
    },
    onError: (err) => {
      console.log("error-======", err);

      return err;
    },
  });

  async function addBilling() {
    if (isEmpty(userProfile.billingDetailsId)) {
      await createBilling();
    } else {
      await updateBillingDetails();
    }
  }
  return {
    isBillingLoaded,
    addbillingDetail,
    addBilling,
  };
};

export default AddBillingDetail;
