import React, { useContext, useCallback, useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { vs, s } from "react-native-size-matters";
import { Images } from "../../../Themes";
import styles from "../styles";
import { AlertContext } from "../../Root/GlobalContext";
import CheckBox from "./CheckBox";

const sortOptions = [
  { title: "Last added", sortDirection: "DESCENDING", sortType: "DATE" },
  {
    title: "Price: low to high",
    sortDirection: "ASCENDING",
    sortType: "PRICE",
  },
  {
    title: "Price: high to low",
    sortDirection: "DESCENDING",
    sortType: "PRICE",
  },
];

function SortSheetContent({ callback, option }) {
  const [sortOption, setSortOption] = useState(option || sortOptions[1]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {sortOptions.map((item, index) => {
        return (
          <View key={index.toString()}>
            <View style={{ height: vs(12) }} />
            <CheckBox
              defaultValue={sortOption.title === item.title}
              onSwitch={(t) => {
                setSortOption(item);
                callback(item);
              }}
              label={item.title}
            />
          </View>
        );
      })}
    </SafeAreaView>
  );
}
export default function ExploreSortBar({ onChange, refresh, option }) {
  const [showProductAsRows, setShowProductAsRows] = useState(true);
  const { dispatch } = useContext(AlertContext);
  const [currentOption, setCurrentOption] = useState(option || sortOptions[1]);
  const toggleSortBySheet = useCallback(() => {
    dispatch({
      type: "changSheetState",
      payload: {
        showSheet: true,
        height: 320,
        enabledGestureInteraction: true,
        onCloseEnd: () => {
          refresh && refresh(currentOption);
        },
        children: () => (
          <SortSheetContent
            option={currentOption}
            callback={(item) => {
              setCurrentOption(item);
              debugger;
              refresh && refresh(item);
              dispatch({
                type: "changSheetState",
                payload: {
                  showSheet: false,
                },
              });
            }}
          />
        ),
        sheetTitle: "Sort by",
      },
    });
  }, [currentOption, dispatch, refresh]);
  return (
    <View style={styles.sortBarContainer}>
      <TouchableOpacity onPress={toggleSortBySheet} style={styles.row}>
        <Image source={Images.arrow_left} style={styles.icArrowDown2} />
        <Text style={styles.txtBold}>{currentOption.title}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setShowProductAsRows(!showProductAsRows);
          onChange(!showProductAsRows);
        }}
      >
        <Image
          source={showProductAsRows ? Images.sortRows : Images.sortSquares}
          style={styles.icSort}
        />
      </TouchableOpacity>
    </View>
  );
}
