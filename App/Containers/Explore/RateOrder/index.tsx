import React, { Component, useContext } from "react";
import {
  View,
  StatusBar,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ActionSheet from "react-native-actionsheet";
import ImagePicker from "react-native-image-crop-picker";

import styles from "./styles";

import { AppBar, StarRating, TextInput } from "../../../Components";
import { Images } from "../../../Themes";
import NavigationService from "../../../Navigation/NavigationService";
import { s } from "react-native-size-matters";
import {
  MutationAddProductReviewArgs,
  useAddProductReviewMutation,
  useAddSellerReviewMutation,
} from "../../../../generated/graphql";
import { useRoute } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import colors from "../../../Themes/Colors";
import { AlertContext } from "../../Root/GlobalContext";
import useAlert from "../../../hooks/useAlert";
import useLoading from "../../../hooks/useLoading";

class RateOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      stars: 0,
    };
  }

  componentDidMount() {}
  //execute onPost function and navigate back to the previous screen
  onPost = () => {
    this.props.route.params.onPost();
    NavigationService.goBack();
  };
  //handle when user want to pick from gallery
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
  //handle when user want to take photos
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
  //remove photos from list
  removeImage = (index) => {
    let images = [...this.state.images];
    images.splice(index, 1);
    this.setState({ images });
  };
  //render screen's header
  renderHeader() {
    return (
      <View style={styles.header}>
        <AppBar
          title={this.props.title}
          rightButton={() => (
            <TouchableOpacity
              onPress={() => this.props.onPost(this.state.stars)}
            >
              <Text style={styles.txtSave}>POST</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }

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
          <Text style={styles.txtProductName}>
            {this.props.data?.shortName}
          </Text>

          <StarRating
            ratingMode
            onChange={(star) => {
              this.setState({ stars: star });
            }}
          />
        </View>
        <Controller
          control={this.props.control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.reviewInput}
              placeholder={"Write here title"}
              textAlignVertical={"top"}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="title"
        />
        <Controller
          control={this.props.control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.reviewInput}
              multiline
              placeholder={"Write here your review"}
              textAlignVertical={"top"}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="description"
        />

        {/* <View style={styles.center}>
          <Text style={styles.txt1}>Upload pictures to your review</Text>
        </View>

        <FlatList
          ListHeaderComponent={() => (
            <TouchableOpacity
              onPress={() => this.showActionSheet()}
              style={styles.btnAddPhotoContainer}
            >
              <Image source={Images.add1} style={styles.icAdd} />
            </TouchableOpacity>
          )}
          horizontal
          data={this.state.images}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderImageItem}
          showsHorizontalScrollIndicator={false}
        /> */}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
          {this.renderHeader()}

          {this.renderBody()}
        </SafeAreaView>

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

function RateOrderScreen() {
  const { dispatch } = useContext(AlertContext);
  const [addProductReview] = useAddProductReviewMutation({
    onError: () => {
      setAlert({
        color: colors.error,
        title: "Review about the prodcut Failed",

        visible: true,
        onDismiss: () => {
          setAlert({ visible: false });
        },
      });
      setLoading({ show: false });
    },
    onCompleted: () => {
      NavigationService.goBack();
      setLoading({ show: false });
      setAlert({
        color: colors.success,
        title: "Thanks for your review",
        message: "Your review has been added successfully",
        visible: true,
        onDismiss: () => {
          setAlert({ visible: false });
        },
      });
    },
  });
  const [addSellerReview] = useAddSellerReviewMutation({
    onError: () => {
      setAlert({
        color: colors.error,
        title: "Review about the seller Failed",
        visible: true,
        onDismiss: () => {
          setAlert({ visible: false });
        },
      });
      setLoading({ show: false });
    },
    onCompleted: () => {
      setLoading({ show: false });
      setAlert({
        color: colors.success,
        title: "Thanks for your review",
        message: "Your review has been added successfully",
        visible: true,
        onDismiss: () => {
          setAlert({ visible: false });
        },
      });
      NavigationService.goBack();
      // dispatch({
      //   type: "changAlertState",
      //   payload: {
      //     visible: true,
      //     message: "",
      //     color: colors.success,
      //     title: "Review about the seller Success",
      //   },
      // });
    },
  });
  const { params } = useRoute();
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<MutationAddProductReviewArgs>();
  const { setAlert } = useAlert();
  const { setLoading } = useLoading();
  // const onSubmit = (data) => {
  //   addProductReview({
  //     variables: {
  //       input: {
  //         ...data,
  //         productId: params.product.productId,
  //       },
  //     },
  //     context: {
  //       headers: {
  //         isPrivate: true,
  //       },
  //     },
  //   });
  // };
  return (
    <RateOrder
      data={params?.data}
      product={params.product}
      register={register}
      title={params.title ?? "Rate Order"}
      control={control}
      onPost={(stars) => {
        // alert(stars);
        handleSubmit((data) => {
          setLoading({ show: true });
          if (params.title) {
            addSellerReview({
              variables: {
                input: {
                  ...data,
                  sellerId: params.data.sellerId,
                  ratingVote: stars,
                },
              },

              context: {
                headers: {
                  isPrivate: true,
                },
              },
            });
            return;
          }
          addProductReview({
            variables: {
              input: {
                ...data,
                productId: params.product.productId,
                ratingVote: stars,
              },
            },
            context: {
              headers: {
                isPrivate: true,
              },
            },
          });
        })();
      }}
    />
  );
}

export default RateOrderScreen;
