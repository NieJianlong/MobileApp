import { gql } from "@apollo/client";

export const UPDATE_BUYER_NOTIFICATION_PREFERENCES = gql`
  mutation UpdateBuyerNotificationPreferences(
    $preferences: [NotificationPreferenceRequest!]!
  ) {
    updateBuyerNotificationPreferences(preferences: $preferences) {
      notificationPreferenceId
      referenceId
      notificationGroupType
      smsEnabled
      whatsappEnabled
      emailEnabled
    }
  }
`;
