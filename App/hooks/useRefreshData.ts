import { useState } from "react";
import { createModel } from "hox";

interface MapScreenProps {
  refreshLists: boolean;
  onDismiss?: () => void;
}
const useRefreshData = () => {
  const [refreshAddress, setRefreshaddress] = useState<MapScreenProps>({
    refreshLists: false,
    onDismiss: () => {},
  });
  const { refreshLists, onDismiss } = refreshAddress;
  return {
    refreshLists,
    setRefreshaddress,
    onDismiss,
  };
};

export default createModel(useRefreshData);