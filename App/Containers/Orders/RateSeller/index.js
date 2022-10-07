import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ActionSheet from "react-native-actionsheet";
import ImagePicker from "react-native-image-crop-picker";

import styles from "./styles";

import { StarRating } from "../../../Components";
import { Images } from "../../../Themes";
import NavigationService from "../../../Navigation/NavigationService";
import { s } from "react-native-size-matters";
import TextInput from "../../../Components/MultilineTextInput/MultilineTextInput";

class RateSellerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
    };
  }

  componentDidMount() {
    console.log(this.props);
    this.props.navigation.setOptions({
      title: "Evaluate the seller",
      headerRight: () => {
        return (
          <TouchableOpacity onPress={this.onPost}>
            <Text style={styles.txtSave}>POST</Text>
          </TouchableOpacity>
        );
      },
    });
  }

  onPost = () => {
    NavigationService.goBack();
  };

  onPressGallery = () => {
    ImagePicker.openPicker({
      //cropping: true,
      includeBase64: true,
      multiple: true,
    }).then((image) => {
      let images = [...image, ...this.state.images];
      this.setState({ images });
    });
  };

  onPressCamera = () => {
    ImagePicker.openCamera({
      cropping: true,
      includeBase64: true,
    }).then((image) => {
      let images = [...image, ...this.state.images];
      this.setState({ images });
    });
  };

  showActionSheet = () => {
    this.ActionSheet.show();
  };

  removeImage = (index) => {
    let images = [...this.state.images];
    images.splice(index, 1);
    this.setState({ images });
  };

  renderImageItem = ({ item, index }) => {
    return (
      <ImageBackground
        borderRadius={s(10)}
        source={{ uri: item.path }}
        style={styles.photoContainer}
      >
        <TouchableOpacity
          onPress={() => this.removeImage(index)}
          style={styles.btnDeleteContainer}
        >
          <Image source={Images.crossMedium} style={styles.icDelete} />
        </TouchableOpacity>
      </ImageBackground>
    );
  };

  renderBody() {
    return (
      <View style={styles.body}>
        <View style={styles.center}>
          <Text style={styles.txtProductName}>iPhone 11</Text>
          <StarRating ratingMode />
        </View>

        <TextInput
          style={styles.reviewInput}
          multiline
          placeholder={"Write here your review是的是的所"}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderBody()}

        <ActionSheet
          ref={(o) => (this.ActionSheet = o)}
          title={"Which one do you like ?"}
          options={["Camera", "Photo Gallery", "Cancel"]}
          cancelButtonIndex={2}
          //destructiveButtonIndex={1}
          onPress={(index) => {
            if (index === 0) {
              this.onPressCamera();
            } else if (index === 1) {
              this.onPressGallery();
            }
          }}
        />
      </View>
    );
  }
}

export default RateSellerScreen;
