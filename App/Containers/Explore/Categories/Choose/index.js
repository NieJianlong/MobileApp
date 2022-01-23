import React, { Component, useMemo } from "react";
import {
  View,
  StatusBar,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import { AppBar } from "../../../../Components";
import NavigationService from "../../../../Navigation/NavigationService";
import { useMutation, useQuery } from "@apollo/client";
import * as aQM from "../../gql/explore_queries";

import { SAVE_PREFERRED_CATEGORIES } from "../../../../Apollo/mutations/mutations_product";
import { t } from "react-native-tailwindcss";

function Header({ selected }) {
  const selectedIds = useMemo(() => {
    return selected.map((item) => item.categoryId);
  }, [selected]);
  const [savePrefered] = useMutation(SAVE_PREFERRED_CATEGORIES, {
    variables: { buyerId: global.buyerId, categories: selectedIds },
    onCompleted: (res) => {
      NavigationService.goBack();
    },
    onError: (res) => {},
  });
  return (
    <View style={styles.header}>
      <AppBar
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
  );
}

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
    return this.state.categories.includes(item);
  };

  onPress = (item, selected) => {
    let categories = [...this.state.categories];
    if (selected) {
      categories.push(item);
    } else {
      let index = categories.indexOf(item);
      categories.splice(index, 1);
    }
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
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
          <Header selected={this.state.categories} />

          {this.renderBody()}
        </SafeAreaView>
      </View>
    );
  }
}
export default function ChooseCategoriesScreen() {
  const { data: categories } = useQuery(aQM.GET_PREFERRED_CATEGORIES, {
    variables: {
      buyerId: global.buyerId,
    },
    context: {
      headers: {
        isPrivate: true,
      },
    },
  });
  const { data: allCategories } = useQuery(aQM.GET_ALL_CATEGORIES);
  return (
    <View style={[t.hFull]}>
      {categories !== undefined && allCategories !== undefined && (
        <OldChooseCategoriesScreen
          selected={categories?.getPreferredCategories || []}
          allCategories={allCategories?.getAllCategories || []}
        />
      )}
    </View>
  );
}
