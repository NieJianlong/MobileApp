import { useState } from "react";
import { createModel } from "hox";

interface MapScreenProps {
  stopPermission: boolean;
  mapVisible: boolean;
  showCloseButton?: boolean;
  onDismiss?: () => void;
}
const useMapScreen = () => {
  const [showMap, setShowMap] = useState<MapScreenProps>({
    stopPermission: false,
    mapVisible: false,
    showCloseButton: false,
    onDismiss: () => {},
  });
  const { mapVisible, onDismiss, showCloseButton, stopPermission } = showMap;
  return {
    stopPermission,
    mapVisible,
    showCloseButton,
    onDismiss,
    setShowMap,
  };
};

export default createModel(useMapScreen);
