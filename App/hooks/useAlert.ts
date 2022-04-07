import { useState } from "react";
import { createModel } from "hox";
import colors from "../Themes/Colors";

interface AppAlert {
  visible: boolean;
  message?: string;
  title?: string;
  color?: string;
  onDismiss?: () => void;
}
const useAlert = () => {
  const [alert, setAlert] = useState<AppAlert>({
    visible: false,
    message: "",
    title: "",
    color: colors.success,
  });
  const { visible, message, title, color, onDismiss } = alert;
  return {
    visible,
    message,
    title,
    color,
    onDismiss,
    setAlert,
  };
};

export default createModel(useAlert);
