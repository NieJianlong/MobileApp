import { gql } from "@apollo/client";

export const SAVE_BUYER_ID = gql`
  mutation SaveBuyerDevice($request: BuyerDeviceRequest!) {
    saveBuyerDevice(request: $request) {
      deviceId
      buyerId
    }
  }
`;
