import React, { useContext, useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput as RNTextInput,
  Linking,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { vs, s, ScaledSheet } from "react-native-size-matters";
import fonts from "../../Themes/Fonts";
import colors from "../../Themes/Colors";
import { AlertContext } from "../Root/GlobalContext";
import { t } from "react-native-tailwindcss";
import AppConfig from "../../Config/AppConfig";
import { Button, RightButton, Selector } from "../../Components";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Images } from "../../Themes";
import TextTip from "../../Components/EmptyReminder";
import {
  useSubmitAccountContactSupportMutation,
  MutationSubmitAccountContactSupportArgs,
  ProblemReason,
  useSubmitOrderContactSupportMutation,
} from "../../../generated/graphql";
import { Controller, useForm } from "react-hook-form";
import { isEmpty, trim } from "lodash";
import TextInput from "../../Components/MultilineTextInput/MultilineTextInput";
import useLoading from "../../hooks/useLoading";
import useAlert from "../../hooks/useAlert";
import NavigationService from "../../Navigation/NavigationService";
import { userProfileVar } from "../../Apollo/cache";
import { useReactiveVar } from "@apollo/client";
function CustomerSupport(props) {
  const { params } = useRoute();
  // alert(JSON.stringify(params));
  const accountItems = [
    "Mobile app issues",
    "Website issues",
    "Order related issues",
  ];
  const orderItems = [
    "Item not delivered yet",
    "Item damaged",
    "Item is defective or does not work",
    "Wrong item was sent",
    "Product and delivery box both damaged",
    "Missing parts or accessories",
    "Performance or quality not adequate",
    "Missed estimated delivery date",
    "About refunds or replacement",
    "Other",
  ];
  const { dispatch } = useContext(AlertContext);
  const [mstate, setMstate] = useState(
    isEmpty(params) ? "Mobile app issues" : "Item not delivered yet"
  );
  const navigation = useNavigation();
  const { setLoading } = useLoading();
  const { setAlert } = useAlert();
  const userProfile = useReactiveVar(userProfileVar);
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<MutationSubmitAccountContactSupportArgs>();
  const [submitSupporting] = useSubmitAccountContactSupportMutation();
  const [submitOrderSupporting] = useSubmitOrderContactSupportMutation();
  const onSubmit = (data: MutationSubmitAccountContactSupportArgs) => {
    setLoading({ show: true });
    let reason = isEmpty(params)
      ? ProblemReason.MobileAppIssues
      : ProblemReason.ItemNotDeliveredYet;
    if (data.request.problemReason === "Website issues") {
      reason = ProblemReason.WebsiteIssues;
    }
    if (data.request.problemReason === "Order related issues") {
      reason = ProblemReason.OrderRelatedIssues;
    }
    // const orderItems = [
    //   "Item not delivered yet",
    //   "Item damaged",
    //   "Item is defective or does not work",
    //   "Wrong item was sent",
    //   "Product and delivery box both damaged",
    //   "Missing parts or accessories",
    //   "Performance or quality not adequate",
    //   "Missed estimated delivery date",
    //   "About refunds or replacement",
    //   "Other",
    // ];
    if (data.request.problemReason === "Item not delivered yet") {
      reason = ProblemReason.ItemNotDeliveredYet;
    }
    if (data.request.problemReason === "Item damaged") {
      reason = ProblemReason.ItemDamaged;
    }
    if (data.request.problemReason === "Item is defective or does not work") {
      reason = ProblemReason.ItemIsDefectiveOrDoesNotWork;
    }
    if (data.request.problemReason === "Wrong item was sent") {
      reason = ProblemReason.WrongItemWasSent;
    }
    if (
      data.request.problemReason === "Product and delivery box both damaged"
    ) {
      reason = ProblemReason.ProductAndDeliveryBoxBothDamaged;
    }
    if (data.request.problemReason === "Missing parts or accessories") {
      reason = ProblemReason.MissingPartsOrAccessories;
    }
    if (data.request.problemReason === "Performance or quality not adequate") {
      reason = ProblemReason.PerformanceOrQualityNotAdequate;
    }
    if (data.request.problemReason === "Missed estimated delivery date") {
      reason = ProblemReason.MissedEstimatedDeliveryDate;
    }
    if (data.request.problemReason === "About refunds or replacement") {
      reason = ProblemReason.AboutRefundsOrReplacement;
    }
    if (data.request.problemReason === "Other") {
      reason = ProblemReason.Other;
    }
    if (isEmpty(params)) {
      submitSupporting({
        context: {
          headers: {
            isPrivate: userProfile.isAuth,
          },
        },
        variables: {
          request: {
            userId: global.userProfileId,
            problemReason: reason,
            message: data.request.message,
          },
        },
        onCompleted: (data) => {
          setLoading({ show: false });
          NavigationService.goBack();
          setAlert({
            color: colors.success,
            title: "Thanks for submitting!",
            visible: true,
            onDismiss: () => {
              setAlert({ visible: false });
            },
          });
        },
        onError: (error) => {
          setLoading({ show: false });
        },
      });
    } else {
      submitOrderSupporting({
        context: {
          headers: {
            isPrivate: userProfile.isAuth,
          },
        },
        variables: {
          request: {
            problemReason: reason,
            message: data.request.message,
            orderItemId: params.orderItemId,
          },
        },
        onCompleted: (data) => {
          setLoading({ show: false });
          NavigationService.goBack();
          setAlert({
            color: colors.success,
            title: "Thanks for submitting!",
            visible: true,
            onDismiss: () => {
              setAlert({ visible: false });
            },
          });
        },
        onError: (error) => {
          setLoading({ show: false });
        },
      });
    }
  };
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={[t.mR6]}>
          <RightButton
            title="SUBMIT"
            onPress={() => {
              handleSubmit(onSubmit)();
              return;
            }}
          />
        </View>
      ),
    });
  }, [navigation]);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      {/* <View style={[t.itemsCenter, t.pT12]}>
        <Text style={[t.textXl, t.pX4, t.mB6]}>
          Please send queries to below email address. In case of Order issues,
          please include Order no, Product information, buyer register phone no
        </Text>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL("mailto:support@SalamiSlicing.in?subject=&body=")
              .then((res) => {
                console.log("RESSSSSSSSSSSS OPEN ", res);
              })
              .catch((err) => {
                console.log("ERRRRRRRRRRR LINKING", err);
              })
          }
        >
          <Text style={[t.textXl]}>support@SalamiSlicing.in</Text>
        </TouchableOpacity>
      </View> */}

      <View style={{ paddingHorizontal: AppConfig.paddingHorizontal }}>
        <Text
          style={[
            {
              fontSize: s(20),
              fontFamily: fonts.primary,
              color: colors.black,
            },
            t.fontSemibold,
          ]}
        >
          How may we help you?
        </Text>
      </View>
      <View style={{ paddingHorizontal: AppConfig.paddingHorizontal }}>
        <Selector
          style={{ marginVertical: vs(10) }}
          placeholder={"Problem reason goes here"}
          value={mstate}
          data={isEmpty(params) ? accountItems : orderItems}
          onValueChange={(text) => setMstate(text)}
        />
        <Controller
          control={control}
          rules={{
            required: "Content is required",
            minLength: {
              value: 5,
              message: "Length must be 6 or more",
            },
            maxLength: {
              value: 250,
              message: "Length must be less than  250",
            },
            validate: {
              positive: (v) => {
                const v1 = trim(v);
                if (v1.length === 0)
                  return "Content should not contain Spaces only";
                return true;
              },
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[t.h64, { borderRadius: 20, marginTop: 20 }]}
              multiline
              placeholder={"Write here your review"}
              textAlignVertical={"top"}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="request.message"
        />
        {!isEmpty(errors.request?.message?.message) && (
          <Text style={[t.mT2, t.mL4, t.textPrimary]}>Message is required</Text>
        )}
      </View>
    </View>
  );
}

export default CustomerSupport;
const styles = ScaledSheet.create({
  title: {
    fontFamily: fonts.primary,
    fontSize: "16@s",
    color: colors.black,
    fontWeight: "600",
  },
});
