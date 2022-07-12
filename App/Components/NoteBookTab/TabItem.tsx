import React, { useEffect, useRef } from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { t } from "react-native-tailwindcss";
export interface TabItemProps {
  title: string;
  id: string;
  selected: string;
  onPress: () => void;
}
function TabItem({ title, selected, id, onPress }: TabItemProps) {
  const shareWidth = useSharedValue(0);
  const viewtyle = useAnimatedStyle(() => {
    return {
      width: withTiming(shareWidth.value),
    };
  });

  const ref = useRef<View | null>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.measure((x, y, width, height, pageX, pageY) => {
        if (id === selected) {
          shareWidth.value = width;
        } else {
          shareWidth.value = 0;
        }
      });
    }
  }, [id, selected, ref.current]);

  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
      }}
    >
      <View
        style={[t.itemsCenter]}
        ref={ref}
        onLayout={() => {
          if (ref.current) {
            ref.current.measure((x, y, width, height, pageX, pageY) => {
              if (id === selected) {
                shareWidth.value = width;
              } else {
                shareWidth.value = 0;
              }
            });
          }
        }}
      >
        <Text style={[id === selected ? t.textPrimary : t.textGray500]}>
          {title}
        </Text>
        <Animated.View style={[t.bgPrimary, t.mT2, { height: 2 }, viewtyle]} />
      </View>
    </TouchableOpacity>
  );
}

export default TabItem;
