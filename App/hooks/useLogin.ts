import { useState } from "react";
import { createModel } from "hox";

interface LoginProps {
  loginVisible: boolean;
  onDismiss?: () => void;
}
const useLogin = () => {
  const [login, setLogin] = useState<LoginProps>({
    loginVisible: false,
    onDismiss: () => {},
  });
  const { loginVisible, onDismiss } = login;
  return {
    loginVisible,
    onDismiss,
    setLogin,
  };
};

export default createModel(useLogin);
