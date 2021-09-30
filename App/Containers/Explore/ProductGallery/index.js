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

import { Colors, Images } from "../../../Themes";
import styles from "./styles";

import { AppBar } from "../../../Components";
import AppConfig from "../../../Config/AppConfig";
import ImageViewer from "react-native-image-zoom-viewer";

function ProductGallery(props) {
  const { params } = useRoute();
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
      <View style={styles.indicatorContainer}>
        <Text style={styles.indicator}>
          {currentIndex}/{numberOfPhotos}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <AppBar title={"Gallery (4)"} />

        {fullscreenMode ? (
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
        ) : (
          //list view mode
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: AppConfig.paddingHorizontal,
            }}
          >
            {imageUrls.map((image, index) => (
              <TouchableOpacity
                key={index.toString()}
                onPress={() => toggleFullscreenMode(index)}
              >
                <Image
                  resizeMode={"contain"}
                  source={{ uri: image.url }}
                  style={styles.image}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </SafeAreaView>
    </View>
  );
}

export default ProductGallery;

const imageUrls = [
  {
    url:
      "https://www.transparentpng.com/thumb/apple-iphone/fORwQR-smartphone-apple-iphone-x-transparent-background.png",
  },
  {
    url:
      "https://www.transparentpng.com/thumb/apple-iphone/fORwQR-smartphone-apple-iphone-x-transparent-background.png",
  },
  {
    url:
      "https://www.transparentpng.com/thumb/apple-iphone/fORwQR-smartphone-apple-iphone-x-transparent-background.png",
  },
  {
    url:
      "https://www.transparentpng.com/thumb/apple-iphone/fORwQR-smartphone-apple-iphone-x-transparent-background.png",
  },
];
