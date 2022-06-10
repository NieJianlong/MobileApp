import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { act } from "react-test-renderer";
import { Fonts, Colors, ApplicationStyles } from "../Themes";

//description text component which can expand and collapse
function DescriptionText(props) {
  const [active, setActive] = useState(false);

  const { text, style, previewLength } = props;
  const isNeedReadMore = text && text.length > 104;
  const newContent = isNeedReadMore
    ? text.substring(0, previewLength ?? 104) + "..."
    : text;

  return (
    <TouchableOpacity
      disabled={!isNeedReadMore}
      onPress={() => setActive(!active)}
      style={style}
    >
      {text && (
        <Text style={styles.text}>
          {active ? text : newContent}

          {isNeedReadMore && (
            <Text style={{ color: Colors.secondary00 }}>
              {active ? " Less" : " Read more"}
            </Text>
          )}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const WIDTH = "44@s";
const HEIGHT = "22@s";

const styles = ScaledSheet.create({
  text: {
    ...ApplicationStyles.screen.txtRegular,
  },
});

export default DescriptionText;
