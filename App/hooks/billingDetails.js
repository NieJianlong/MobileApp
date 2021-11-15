import { useEffect, useState } from "react";
import { useLazyQuery, useReactiveVar } from "@apollo/client";
import { userProfileVar } from "../Apollo/cache";
import { BILLING_DETAIL_BY_BUYERID } from "../Apollo/queries/queries_user";

const GetBillingDetail = () => {
    const userProfile = useReactiveVar(userProfileVar);
    const [isBillingLoaded, setIsBillingLoaded] = useState(false);
    const [billingDetail, setBillingDetail] = useState(null);

    const [getBillingAddress, { loading, error, data}] = useLazyQuery(
        BILLING_DETAIL_BY_BUYERID, {
            variables: {
                buyerId: userProfile.buyerId
            },
            context: {
                headers: {
                    isPrivate: true,
                },
            },
        }
    );

    useEffect(() => {
        if (userProfile.buyerId) {
            getBillingAddress();
        }
    }, [userProfile.buyerId]);

    useEffect(() => {
        if (loading) return;

        if (error) {
            setIsBillingLoaded(true)
            setBillingDetail(null);
        }
    
        if (data) {
            const billingData = data.billingDetailsByBuyerId[0];
            userProfileVar({
                ...userProfile,
                billingDetailsId: billingData.billingDetailsId
            });

            setIsBillingLoaded(true);
            setBillingDetail(billingData);
        }
    }, [loading, error, data]);

    return {
        isBillingLoaded,
        billingDetail,
    };
};

export default GetBillingDetail;