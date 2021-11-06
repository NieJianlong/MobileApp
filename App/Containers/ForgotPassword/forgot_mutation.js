import { gql } from "@apollo/client";
export const ForgotPasswordStep1SendNotificationEmail = gql`
  mutation ForgotPasswordStep1SendNotificationEmail($email: String!) {
    forgotPasswordStep1SendNotificationEmail(email: $email) {
      email
      phoneNumber
      message
    }
  }
`;
