import { useState } from "react";
import { createModel } from "hox";
import {
  BuyerProfileQueryResult,
  BuyerProfileResponse,
} from "../../generated/graphql";
import { KeyboardType } from "react-native";

interface RenameProps {
  show: boolean;
  defaultValue: string;
  controlName: string;
  rules?: any;
  element: any;
  palceHolder: string;
  title: string;
  userProfile?: BuyerProfileResponse;
  keyboardType?: KeyboardType;
}
const useRename = () => {
  const [rename, setRename] = useState<RenameProps>({
    show: false,
    defaultValue: "",
    controlName: "",
    element: null,
    palceHolder: "",
    title: "",
    userProfile: {},
    keyboardType: "default",
  });
  const { show, defaultValue, controlName, userProfile } = rename;
  return {
    rename,
    setRename,
    show,
    defaultValue,
    controlName,
    userProfile,
  };
};

export default createModel(useRename);
