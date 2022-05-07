import { useState } from "react";
import { createModel } from "hox";

interface StatusBarProps {
  hidden: boolean;
}
const useStatusBar = () => {
  const [statusBar, setStatusBar] = useState<StatusBarProps>({
    hidden: true,
  });
  const { hidden } = statusBar;
  return {
    hidden,
    statusBar,
    setStatusBar,
  };
};

export default createModel(useStatusBar);
