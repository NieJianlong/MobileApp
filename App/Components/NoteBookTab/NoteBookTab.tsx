import React, { useState } from "react";
import { StyleProp, TextStyle, View } from "react-native";
import { t } from "react-native-tailwindcss";
import TabItem from "./TabItem";

function NoteBookTab({
  style,
  onSelect,
}: {
  style?: StyleProp<TextStyle>;
  onSelect: (id: string) => void;
}) {
  const tabs = [
    { title: "My Notebooks", id: "mine" },
    { title: "Shared With Me", id: "shared" },
  ];
  const [selectItem, setSelectItem] = useState(tabs[0]);

  return (
    <View style={[t.flexRow, style]}>
      {tabs.map((tab, index) => {
        return (
          <View key={tab.id} style={[t.mR6]}>
            <TabItem
              {...tab}
              onPress={() => {
                setSelectItem(tab);
                onSelect(tab.id);
              }}
              selected={selectItem.id}
            />
          </View>
        );
      })}
    </View>
  );
}

export default NoteBookTab;
