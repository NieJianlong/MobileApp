import { useEffect, useState } from "react";
import { useLazyQuery, useReactiveVar } from "@apollo/client";
import { userProfileVar } from "../Apollo/cache";
import { BILLING_DETAIL_BY_BUYERID } from "../Apollo/queries/queries_user";
import {
  getLocalStorageValue,
  LOCAL_STORAGE_USER_PROFILE,
} from "../Apollo/local-storage";
import * as storage from "../Apollo/local-storage";

const GetBillingDetail = () => {
  const userProfile = useReactiveVar(userProfileVar);
  const [isBillingLoaded, setIsBillingLoaded] = useState(false);
  const [billingDetail, setBillingDetail] = useState(null);

  const [getBillingAddress, { loading, error, data }] = useLazyQuery(
    BILLING_DETAIL_BY_BUYERID,
    {
      variables: {
        buyerId: global.buyerId,
      },
      context: {
        headers: {
          isPrivate: true,
        },
      },
    }
  );

  useEffect(() => {
    if (global.buyerId) {
      getBillingAddress();
    }
  }, [global.buyerId]);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (error) {
      setIsBillingLoaded(true);
      setBillingDetail(null);
    }

    if (data) {
      console.log("billingData", data);
      const billingDatas = data.billingDetailsByBuyerId;

      if ((billingDatas || []).length > 1) {
        userProfileVar({
          ...userProfile,
          billingDetailsId: billingDatas[0].billingDetailsId,
        });
        getLocalStorageValue(LOCAL_STORAGE_USER_PROFILE).then(async (res) => {
          if (res) {
            const userData = JSON.parse(res);
            userData.billingDetailsId = billingDatas[0].billingDetailsId;
            await storage.setLocalStorageValue(
              storage.LOCAL_STORAGE_USER_PROFILE,
              JSON.stringify(userData)
            );
          }
        });

        setBillingDetail(billingDatas[0]);
      }

      setIsBillingLoaded(true);
    }
  }, [loading, error, data]);

  return {
    isBillingLoaded,
    billingDetail,
  };
};

export default GetBillingDetail;
