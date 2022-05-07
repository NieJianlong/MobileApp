import { useState } from "react";
import { createModel } from "hox";
import { Colors } from "../Themes";

interface StatusBarProps {
  hidden: boolean;
  color: string;
}
const useStatusBar = () => {
  const [statusBar, setStatusBar] = useState<StatusBarProps>({
    hidden: false,
    color: Colors.background,
  });
  const { hidden, color } = statusBar;
  return {
    color,
    hidden,
    statusBar,
    setStatusBar,
  };
};

export default createModel(useStatusBar);
