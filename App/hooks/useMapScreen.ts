import { useState } from "react";
import { createModel } from "hox";

interface MapScreenProps {
  mapVisible: boolean;
  showCloseButton?: boolean;
  onDismiss?: () => void;
}
const useMapScreen = () => {
  const [showMap, setShowMap] = useState<MapScreenProps>({
    mapVisible: false,
    showCloseButton: false,
    onDismiss: () => {},
  });
  const { mapVisible, onDismiss, showCloseButton } = showMap;
  return {
    mapVisible,
    showCloseButton,
    onDismiss,
    setShowMap,
  };
};

export default createModel(useMapScreen);
