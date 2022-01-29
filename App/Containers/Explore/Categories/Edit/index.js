import React, { useContext, useMemo, useState } from "react";
import { View, StatusBar, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DraggableFlatList from "react-native-draggable-flatlist";

import styles from "./styles";

import { AppBar } from "../../../../Components";
import { Images } from "../../../../Themes";
import NavigationService from "../../../../Navigation/NavigationService";
import { useMutation, useQuery } from "@apollo/client";
import * as aQM from "../../gql/explore_queries";
import { useFocusEffect } from "@react-navigation/native";
import { SAVE_PREFERRED_CATEGORIES } from "../../../../Apollo/mutations/mutations_product";
import { AlertContext } from "../../../Root/GlobalContext";
import colors from "../../../../Themes/Colors";

export default function EditCategoriesScreen() {
  const [removed, setRemoved] = useState([]);
  const { dispatch } = useContext(AlertContext);
  const { data: categories, refetch } = useQuery(aQM.GET_PREFERRED_CATEGORIES, {
    variables: {
      buyerId: global.buyerId,
    },
    context: {
      headers: {
        isPrivate: true,
      },
    },
  });
  const selected = useMemo(() => {
    return categories?.getPreferredCategories.filter(
      (item) => removed.indexOf(item) < 0
    );
  }, [categories?.getPreferredCategories, removed]);
  const selectedIds = useMemo(() => {
    return selected.map((item) => item.categoryId);
  }, [selected]);
  const [savePrefered] = useMutation(SAVE_PREFERRED_CATEGORIES, {
    variables: { buyerId: global.buyerId, categories: selectedIds },
    context: {
      headers: {
        isPrivate: true,
      },
    },
    onCompleted: (res) => {
      dispatch({
        type: "changAlertState",
        payload: {
          visible: true,
          message: "Categories updated.",
          color: colors.success,
          title: "update favourite categories success",
        },
      });
      NavigationService.goBack();
    },
    onError: (res) => {},
  });
  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [refetch])
  );
  const renderItem = ({ item, index, drag, isActive }) => {
    const isRemoved = removed.indexOf(item);
    if (isRemoved >= 0) {
      return null;
    }
    return (
      <TouchableOpacity style={styles.itemContainer} onLongPress={drag}>
        <TouchableOpacity
          onPress={() => {
            setRemoved([...removed, item]);
          }}
        >
          <View style={styles.row}>
            <Image source={Images.trash} style={styles.icTrash} />
            <Text style={styles.txtCategory}>{item.name}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={drag}>
          <Image source={Images.move} style={styles.icMove} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <View style={styles.header}>
          <AppBar
            title={"Edit Categories"}
            rightButton={() => (
              <TouchableOpacity
                onPress={() => {
                  savePrefered();
                }}
              >
                <Text style={styles.txtSave}>SAVE</Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={styles.body}>
          <Text style={styles.txt1}>
            To reorder categories, hold down and move
          </Text>
          <DraggableFlatList
            data={categories?.getPreferredCategories || []}
            renderItem={renderItem}
            keyExtractor={(item, index) => `draggable-item-${index}`}
            onDragEnd={({ data }) => {}}
          />
        </View>
        <TouchableOpacity
          onPress={() =>
            NavigationService.navigate("ChooseCategoriesScreen", {
              returnCategories: {},
              categories: [],
            })
          }
          style={styles.btnAdd}
        >
          <Image source={Images.add2} style={styles.icAdd} />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}
