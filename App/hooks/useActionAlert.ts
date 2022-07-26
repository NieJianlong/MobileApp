import { useState } from "react";
import { createModel } from "hox";
import colors from "../Themes/Colors";
import { StyleProp, ViewStyle } from "react-native";

interface AppAlert {
  visible: boolean;
  message?: string;
  title?: string;
  color?: string;
  onDismiss?: () => void;
  buttons?: [
    {
      style?: StyleProp<ViewStyle>;
      onPress?: () => void;
      text: string;
    }
  ];
}
const useActionAlert = () => {
  const [alert, setAlert] = useState<AppAlert>({
    visible: false,
    message: "",
    title: "",
    color: colors.success,
  });
  const { visible, message, title, color, onDismiss, buttons } = alert;
  return {
    visible,
    message,
    title,
    color,
    buttons,
    onDismiss,
    setAlert,
  };
};

export default createModel(useActionAlert);
