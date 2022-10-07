import { AntDesign, Ionicons } from "@expo/vector-icons";
import { observer } from "mobx-react";
import React from "react";
import {
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { Divider } from "react-native-paper";
import { color, t } from "react-native-tailwindcss";
import { useFilesStore } from "../../mobx";
import { Title } from "../common";
import FolderPath from "../common/FolderList/FolderPath";

interface TitleHeaderProps {
  title: string;
  onPress?: () => void;
  withBack?: boolean;
}

function TitleHeader({ title, onPress, withBack }: TitleHeaderProps) {
  const { folderPaths, folderPathGoBack, folderPathGoRoot } = useFilesStore();
  const { width } = useWindowDimensions();

  return (
    <View>
      <View style={[t.pX8, t.flexRow, t.justifyBetween, t.itemsCenter, t.mB6]}>
        <View style={[t.flexRow, t.itemsCenter]}>
          {withBack && (
            <TouchableOpacity
              disabled={folderPaths.length === 0}
              style={[folderPaths.length === 0 ? t.opacity50 : t.opacity100]}
              onPress={() => folderPathGoBack(false)}
            >
              <Ionicons
                name="ios-chevron-back-circle-outline"
                size={30}
                color={color.primaryNavyLight}
                style={[t.mR2]}
              />
            </TouchableOpacity>
          )}
          <View>
            <Text
              style={[
                t.text16,
                t.textPrimaryNavyLight,
                t.fontPrimaryBoldHeavy,
                { width: 0.5 * width - 150 },
              ]}
              numberOfLines={1}
            >
              {title}
            </Text>
            <View style={[t.mT2, t.flexRow]}>{withBack && <FolderPath />}</View>
          </View>
        </View>
        <TouchableOpacity onPress={onPress}>
          <AntDesign name="close" size={24} color={color.primaryNavyLight} />
        </TouchableOpacity>
      </View>
      <Divider />
    </View>
  );
}

export default observer(TitleHeader);
