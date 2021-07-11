import React, { Component } from "react";
import { View, StatusBar, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";

import styles from "./styles";

import { ProductSearchBox, AppBar } from "../../../../Components";
import { Colors, Images } from "../../../../Themes";
import NavigationService from "../../../../Navigation/NavigationService";
import { useQuery } from "@apollo/client";
import * as aQM from "../../gql/explore_queries";

export default function EditCategoriesScreen() {
  const { data: categories } = useQuery(aQM.GET_PREFERRED_CATEGORIES, {
    variables: {
      buyerId: global.buyerId,
    },
    context: {
      headers: {
        isPrivate: false,
      },
    },
  });

  const renderItem = ({ item, index, drag, isActive }) => {
    return (
      <TouchableOpacity style={styles.itemContainer} onLongPress={drag}>
        <View style={styles.row}>
          <Image source={Images.trash} style={styles.icTrash} />
          <Text style={styles.txtCategory}>{item}</Text>
        </View>

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
              <TouchableOpacity>
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
              returnCategories: this.returnCategories,
              categories: this.state.categories,
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
