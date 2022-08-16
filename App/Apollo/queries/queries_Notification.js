import { gql } from "@apollo/client";

export const NOTIFICATION_PREFERENCES_BY_BUYER_ID = gql`
  query NotificationPreferencesByBuyerId($buyerId: ID!) {
    notificationPreferencesByBuyerId(buyerId: $buyerId) {
      notificationPreferenceId
      referenceId
      notificationGroupType
      smsEnabled
      whatsappEnabled
      emailEnabled
    }
  }
`;
