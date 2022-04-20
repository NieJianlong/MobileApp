import { useState } from "react";
import { createModel } from "hox";

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
