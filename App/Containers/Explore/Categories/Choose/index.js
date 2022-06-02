import React, { Component, useEffect, useMemo, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import { AppBar } from "../../../../Components";
import NavigationService from "../../../../Navigation/NavigationService";
import { useMutation, useQuery } from "@apollo/client";
import * as aQM from "../../gql/explore_queries";

import { SAVE_PREFERRED_CATEGORIES } from "../../../../Apollo/mutations/mutations_product";
import { t } from "react-native-tailwindcss";
import { useNavigation } from "@react-navigation/native";
import { findIndex } from "lodash";

class OldChooseCategoriesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: this.props.selected,
      allCategories: this.props.allCategories,
    };
  }

  componentDidMount() {}

  checkSelected = (item) => {
    return (
      findIndex(
        this.state.categories ?? [],
        (item1) => item1.categoryId === item.categoryId
      ) >= 0
    );
  };

  onPress = (item, selected) => {
    let categories = [...this.state.categories];
    if (selected) {
      categories.push(item);
    } else {
      let index = categories.indexOf(item);
      categories.splice(index, 1);
    }
    this.props.onChanged(categories);
    this.setState({ categories });
  };

  renderBody() {
    return (
      <View style={styles.body}>
        <Text style={styles.txt2}>Choose your preferences</Text>
        <Text style={styles.txt1}>
          Choose which products interest you the most and we can offer you a
          more personalized offer
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.categoriesContainer}>
            {this.state.allCategories.map((item, index) => {
              let selected = this.checkSelected(item);
              return (
                <TouchableOpacity
                  onPress={() => this.onPress(item, !selected)}
                  style={
                    selected
                      ? styles.btnSelectedContainer
                      : styles.btnUnselectedContainer
                  }
                  key={index.toString()}
                >
                  <Text
                    style={selected ? styles.txtSelected : styles.txtUnselected}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }

  render() {
    return <View style={styles.container}>{this.renderBody()}</View>;
  }
}
export default function ChooseCategoriesScreen() {
  const { data: categories } = useQuery(aQM.GET_PREFERRED_CATEGORIES, {
    variables: {
      buyerId: global.buyerId,
    },
    context: {
      headers: {
        isPrivate: global.access_token ? true : false,
      },
    },
  });
  const { data: allCategories } = useQuery(aQM.GET_ALL_CATEGORIES);
  const [selected, setSelected] = useState([]);
  useEffect(() => {
    if (categories) {
      setSelected(categories?.getPreferredCategories);
    }
  }, [categories]);

  const selectedIds = useMemo(() => {
    return selected.map((item) => item.categoryId);
  }, [selected]);
  const [savePrefered] = useMutation(SAVE_PREFERRED_CATEGORIES, {
    variables: { buyerId: global.buyerId, categories: selectedIds },
    onCompleted: (res) => {
      NavigationService.goBack();
    },
    context: {
      headers: {
        isPrivate: true,
      },
    },
    onError: (res) => {},
  });
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={[t.mR6]}>
          <TouchableOpacity
            onPress={() => {
              savePrefered();
            }}
          >
            <Text style={styles.txtSave}>SAVE</Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);
  return (
    <View style={[t.hFull]}>
      {categories !== undefined && allCategories !== undefined && (
        <OldChooseCategoriesScreen
          selected={categories?.getPreferredCategories || []}
          allCategories={allCategories?.getAllCategories || []}
          onChanged={(items) => {
            setSelected(items);
          }}
        />
      )}
    </View>
  );
}
