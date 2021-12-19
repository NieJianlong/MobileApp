import { gql } from "@apollo/client";
export const ValidateCode = gql`
  mutation validateCode($request: ValidateCodeRequest!) {
    validateCode(request: $request) {
      status
      extraMessage
    }
  }
`;
