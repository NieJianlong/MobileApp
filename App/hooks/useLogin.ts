import { useState } from "react";
import { createModel } from "hox";
import {
  useSendOtpCodeMutation,
  ValidationType,
} from "../../generated/graphql";
import jwt_decode from "jwt-decode";
import * as jwt from "../Apollo/jwt-request";
import useLoading from "./useLoading";
import NavigationService from "../Navigation/NavigationService";
interface LoginProps {
  loginVisible: boolean;
  showCloseButton?: boolean;
  onDismiss?: () => void;
}
const useLogin = () => {
  const [login, setLogin] = useState<LoginProps>({
    loginVisible: false,
    showCloseButton: false,
    onDismiss: () => {},
  });
  const { loginVisible, onDismiss, showCloseButton } = login;

  return {
    loginVisible,
    showCloseButton,
    onDismiss,
    setLogin,
  };
};

export default createModel(useLogin);
