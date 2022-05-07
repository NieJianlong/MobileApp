import React, { useState, useEffect, useContext, useCallback } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { vs } from "react-native-size-matters";
import { AppBar, TextInput, Switch, RightButton } from "../../Components";
import styles from "./styles";
import colors from "../../Themes/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import { CREATE_PAYMENT_DETAIL } from "../../Apollo/mutations/mutations_user";
import { AlertContext } from "../Root/GlobalContext";
import { t } from "react-native-tailwindcss";

function AddCredit(props) {
  const [name, setName] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [date, setDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [disable, setDisable] = useState(true);
  const [isDefaultPaymentType, setIsDefaultPaymentType] = useState(false);
  const { dispatch } = useContext(AlertContext);
  /**
   * buyerId:ID!
    paymentType:PaymentType
    isDefaultPaymentType:Boolean
   */
  const [addPayMent] = useMutation(CREATE_PAYMENT_DETAIL, {
    variables: {
      request: {
        buyerId: global.buyerId,
        paymentType: "CREDIT_CARD",
        isDefaultPaymentType: isDefaultPaymentType,
      },
    },
    context: {
      headers: {
        isPrivate: true,
      },
    },
    onCompleted: (res) => {
      dispatch({ type: "hideloading" });
      dispatch({
        type: "changAlertState",
        payload: {
          visible: true,
          message: "You have successfully added new payment method.",
          color: colors.secondary00,
          title: "Payment method added!",
        },
      });
      params.callback({
        name,
        cardNum,
        date,
        cvv,
      });
    },
    onError: (res) => {
      dispatch({ type: "hideloading" });
    },
  });
  const onAddPayMent = useCallback(() => {
    if (disable) {
      dispatch({
        type: "changAlertState",
        payload: {
          visible: true,
          message: "",
          color: colors.error,
          title: "Make sure you have entered the correct information",
        },
      });
    } else {
      dispatch({ type: "loading" });
      addPayMent();
    }
  }, [addPayMent, disable, dispatch]);
  useEffect(() => {
    if (
      name.length === 0 ||
      cardNum.length === 0 ||
      date.length === 0 ||
      cvv.length === 0
    ) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [name, cardNum, date, cvv]);

  const inputs = [
    {
      placeholder: "Type your name on the card",
      onChangeText: (text) => setName(text),
      showError: false,
      errorMessage: null,
      keyboardType: "default",
      weight: "12",
    },
    {
      placeholder: "000000000000000",
      onChangeText: (text) => setCardNum(text),
      showError: false,
      errorMessage: null,
      keyboardType: "decimal-pad",
      weight: "12",
    },
    {
      placeholder: "MM/YY",
      onChangeText: (text) => {
        if (text.length <= 5) {
          if (text.length === 2) {
            text = text + "/";
            setDate(text);
          } else {
            setDate(text);
          }
        }
      },
      showError: false,
      errorMessage: null,
      value: date,
      keyboardType: "decimal-pad",
      weight: "7",
    },
    {
      placeholder: "CVV",
      onChangeText: (text) => {
        if (text.length <= 3) {
          setCvv(text);
        }
      },
      showError: false,
      errorMessage: null,
      value: cvv,
      keyboardType: "decimal-pad",
      weight: "4.5",
    },
  ];

  const { params } = useRoute();
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={[t.mR6]}>
          <RightButton title="SAVE" disable={disable} onPress={onAddPayMent} />
        </View>
      ),
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <View style={styles.bodyContainer}>
        <Text style={styles.heading2Bold}>Add your credit card details</Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {inputs.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  width: `${(item.weight / 12) * 100}%`,
                }}
              >
                <TextInput style={{ marginTop: vs(18) }} {...item} />
              </View>
            );
          })}
        </View>
        <View style={{ marginTop: 20 }}>
          <Switch
            onSwitch={(value) => {
              setIsDefaultPaymentType(value);
            }}
            label="Set as default payment method"
          />
        </View>
      </View>
    </View>
  );
}

export default AddCredit;
