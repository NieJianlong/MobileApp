import { useState } from "react";
import { createModel } from "hox";

interface ImageUrlProps {
  url: string;
}
interface ImageViewerProps {
  visible: boolean;
  images: ImageUrlProps[];
}
const useImageViewer = () => {
  const [imageViewer, setImageViewer] = useState<ImageViewerProps>({
    visible: false,
    images: [],
  });
  const { visible, images } = imageViewer;
  return {
    visible,
    images,
    imageViewer,
    setImageViewer,
  };
};

export default createModel(useImageViewer);
