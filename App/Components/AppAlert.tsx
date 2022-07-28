import { isEmpty } from "lodash";
import React, { useCallback } from "react";
import {
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { Modal, Portal } from "react-native-paper";
import { color, t } from "react-native-tailwindcss";
import useActionAlert from "../hooks/useActionAlert";
import Button from "./Button";
import { AntDesign } from "@expo/vector-icons";

const AppAlert = () => {
  const { visible, buttons, setAlert, title, message, onDismiss } =
    useActionAlert();
  const dissAlert = useCallback(() => {
    setAlert({ show: false, title: "", content: "", buttons: [] });
  }, []);
  const noButtons = isEmpty(buttons);
  const { width, height } = useWindowDimensions();

  return visible ? (
    <Portal>
      <Modal visible dismissable={false}>
        <View
          style={[
            t.roundedLg,
            t.pY6,
            t.w10_12,
            t.pX4,
            t.bgWhite,
            { marginLeft: 0.1 * width },
          ]}
        >
          <View style={[t.flexRow, t.justifyBetween]}>
            <Text
              style={[
                t.fontPrimary,
                t.textGray500,
                { fontSize: 18 },
                t.leading3,
                t.fontBold,
              ]}
            >
              {title}
            </Text>
            <TouchableOpacity
              onPress={() => {
                dissAlert();
                onDismiss && onDismiss();
              }}
            >
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <Text
            style={[
              t.fontPrimary,
              noButtons ? { fontSize: 14 } : t.text16,
              t.textPrimaryNavyLight,
              t.mY6,
              t.leading6,
            ]}
          >
            {message}
          </Text>
          <View style={[t.justifyEnd, t.flexRow]}>
            {!isEmpty(buttons) &&
              buttons.map((item, index) => {
                return (
                  <Button
                    key={`${index}`}
                    style={[index !== buttons.length - 1 && t.mR4, item.style]}
                    text={item.text}
                    onPress={() => {
                      item.onPress?.();
                    }}
                  />
                );
              })}
          </View>
        </View>
      </Modal>
    </Portal>
  ) : null;
};

export default AppAlert;
