import { useReactiveVar } from "@apollo/client";
import { trimStart } from "lodash";
import { colors } from "react-native-tailwindcss";
import { userProfileVar } from "../Apollo/cache";

export function usePaymentConfigration() {
  const userProfile = useReactiveVar(userProfileVar);
  const getPaymentConfigration = (orderId: string) => {
    return {
      description: "Wholesale Marketplace",
      image:
        "https://raw.githubusercontent.com/zhuchuanwu/publicImage/main/App-Icon.png",
      currency: "INR",
      key: "rzp_test_I8X2v4LgupMLv0",
      name: "Salami Slicing",
      order_id: orderId, //Replace this with an order_id created using Orders API.
      prefill: {
        email: userProfile?.email,
        contact: userProfile?.userName
          ? trimStart(userProfile?.userName, "+91")
          : userProfile?.phone,
        name: userProfile?.firstName + userProfile.lastName,
      },
      theme: { color: colors.primary },
    };
  };

  return getPaymentConfigration;
}
