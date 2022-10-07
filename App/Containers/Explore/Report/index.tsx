import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { vs } from "react-native-size-matters";
import { useNavigation, useRoute } from "@react-navigation/native";

import styles from "./styles";

import { TextInput, Selector } from "../../../Components";
import NavigationService from "../../../Navigation/NavigationService";
import {
  ReportReviewReason,
  useAddReportReviewMutation,
} from "../../../../generated/graphql";
import useAlert from "../../../hooks/useAlert";
import colors from "../../../Themes/Colors";
import useLoading from "../../../hooks/useLoading";
import { t } from "react-native-tailwindcss";

function Report(props) {
  const { params } = useRoute();

  const [reportReviewReason, setReportReviewReason] =
    useState<ReportReviewReason>();
  const [addReportReview] = useAddReportReviewMutation();
  const { setAlert } = useAlert();
  const { setLoading } = useLoading();
  const [message, setMessage] = useState("");

  const onSubmit = () => {
    if (!reportReviewReason) {
      setAlert({
        message: "Please select report review reason",
        visible: true,
        color: colors.warning,
        onDismiss: () => {
          setAlert({ visible: false });
        },
      });
    } else {
      setLoading({ show: true });
      addReportReview({
        context: {
          headers: {
            isPrivate: true,
          },
        },
        variables: {
          input: {
            description: message,
            reportReason: reportReviewReason,
            reviewId: params.reviewId,
          },
        },
        onCompleted: () => {
          setLoading({ show: false });
          setAlert({
            message: "Report this review success",
            visible: true,
            color: colors.success,
            onDismiss: () => {
              setAlert({ visible: false });
            },
          });
          NavigationService.goBack();
        },
        onError: () => {
          setLoading({ show: false });
          setAlert({
            message: "Report this review failed",
            visible: true,
            color: colors.error,
            onDismiss: () => {
              setAlert({ visible: false });
            },
          });
        },
      });
    }
  };

  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={[t.mR6]}>
          <TouchableOpacity onPress={onSubmit}>
            <Text style={styles.txtSave}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);
  const renderBody = () => {
    return (
      <View style={styles.body}>
        <Selector
          style={{ marginBottom: vs(10) }}
          placeholder={"Problem reason goes here"}
          //   value={mstate}
          data={[
            "Inappropriate content",
            "Irrelevant content",
            "Misleading content",
          ]}
          onValueChange={(text) => {
            if (text === "Inappropriate content") {
              setReportReviewReason(ReportReviewReason.Inappropriate);
            }
            if (text === "Irrelevant content") {
              setReportReviewReason(ReportReviewReason.Irrelevant);
            }
            if (text === "Misleading content") {
              setReportReviewReason(ReportReviewReason.Misleading);
            }
          }}
        />

        <TextInput
          style={styles.reviewInput}
          multiline
          value={message}
          onChangeText={(text: string) => {
            setMessage(text);
          }}
          placeholder={"Write here your review"}
          textAlignVertical={"top"}
        />
      </View>
    );
  };

  return <View style={styles.container}>{renderBody()}</View>;
}

export default Report;
