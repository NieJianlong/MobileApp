import { gql } from "@apollo/client";
export const ValidateCode = gql`
  mutation validateCode($request: ValidateCodeRequest!) {
    validateCode(request: $request) {
      status
      extraMessage
    }
  }
`;

export const ForgotPasswordStep2VerifyTokenEmail = gql`
  mutation forgotPasswordStep2VerifyTokenEmail(
    $email: String!
    $tokenCode: String
  ) {
    forgotPasswordStep2VerifyTokenEmail(email: $email, tokenCode: $tokenCode) {
      message
      actionToken
    }
  }
`;

export const ForgotPasswordStep3ChangeByEmail = gql`
  mutation forgotPasswordStep3ChangeByEmail(
    $actionTokenValue: String!
    $newPassword: String!
    $confirmPassword: String!
  ) {
    forgotPasswordStep3ChangeByEmail(
      actionTokenValue: $actionTokenValue
      newPassword: $newPassword
      confirmPassword: $confirmPassword
    ) {
      message
    }
  }
`;
