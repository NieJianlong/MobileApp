import React, { useState } from "react";
import {
  View,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";

import { Colors } from "../../../Themes";
import styles from "./styles";

import { AppBar } from "../../../Components";
import AppConfig from "../../../Config/AppConfig";
import ImageViewer from "react-native-image-zoom-viewer";
import { t } from "react-native-tailwindcss";

function ProductGallery(props) {
  const { params } = useRoute();
  const imageUrls =
    params.urls?.map((item) => {
      return { url: item };
    }) ?? [];

  //fullscreen mode: to show a specific photo
  const [fullscreenMode, setFullscreenMode] = useState(
    params.fullscreenMode ?? false
  );
  //current phto index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  //toggle fullscreen mode when tap on a photo item
  const toggleFullscreenMode = (index) => {
    setFullscreenMode(!fullscreenMode);
    setCurrentImageIndex(index);
  };
  //render paging indicator
  const renderIndicator = (currentIndex, numberOfPhotos) => {
    return (
      <View style={[styles.indicatorContainer, t.absolute, t.mT12]}>
        <Text style={styles.indicator}>
          {currentIndex}/{numberOfPhotos}
        </Text>
      </View>
    );
  };
  return (
    // use ImageViewer component to support zoom and pinch photo
    <ImageViewer
      index={currentImageIndex}
      imageUrls={imageUrls}
      backgroundColor={Colors.background}
      onClick={() => toggleFullscreenMode(0)}
      renderIndicator={(currentIndex, allSize) =>
        renderIndicator(currentIndex, imageUrls.length)
      }
    />
  );
}

export default ProductGallery;
