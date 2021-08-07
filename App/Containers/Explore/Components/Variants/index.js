/**
 * Under Construction
 * @nsavage
 * The remote data type for Variants is missing attributes like
 * title wich we could use for the header
 *
 * code is to conform to RNative guidelines
 * see https://reactnative.dev/docs/intro-react
 *
 */
import React, {
  useState,
  useCallback,
  useContext,
  useMemo,
  useEffect,
} from "react";
import { Button, View, Text, FlatList } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
// import { Text, View, Image, TouchableOpacity } from "react-native";
import { useQuery } from "@apollo/client";
import * as gqlMappers from "../../gql/gql_mappers";
import * as aQM from "../../gql/explore_queries";
import { theme } from "react-native-tailwindcss";

import Accordion from "react-native-collapsible/Accordion";
import ColorItem from "./ColorItem";
import { ScrollView } from "react-native-gesture-handler";

const SECTIONS = [
  {
    title: "Color Name",
    content: [
      "Astral White",
      "Astral Black",
      "Astral Yellow",
      "Astral Yellowq",
      "Astral White",
      "Astral Black",
      "Astral Yellow",
      "Astral Yellowq",
    ],
  },
  {
    title: "Size Name",
    content: ["16GB RAM 128GB", "8GB RAM 128GB", "4GB RAM 128GB"],
  },
  {
    title: "Style Name",
    content: ["OnePlus 9"],
  },
];

class AccordionView extends React.Component {
  state = {
    activeSections: [],
  };

  _renderSectionTitle = (section) => {
    return (
      <View style={[theme.pX4]}>
        <Text>{section.content}</Text>
      </View>
    );
  };

  _renderHeader = (section) => {
    return (
      <View style={[theme.pX4, theme.h8, theme.justifyCenter]}>
        <Text style={[theme.textLg]}>{section.title}:</Text>
      </View>
    );
  };

  _renderContent = (section) => {
    return (
      <ScrollView horizontal contentContainerStyle={[theme.flexRow]}>
        {section.content.map(() => {
          return <ColorItem />;
        })}
      </ScrollView>
    );
  };

  _updateSections = (activeSections) => {
    this.setState({ activeSections });
  };

  render() {
    return (
      <Accordion
        sections={SECTIONS}
        activeSections={this.state.activeSections}
        underlayColor={"transparent"}
        // renderSectionTitle={this._renderSectionTitle}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
        onChange={this._updateSections}
      />
    );
  }
}
/**
 *
 *  props.product.prodVariants
 *  array of variants for this product
 */
const ProductVariants = ({ listingVariants }) => {
  // to do reduce number props if possible

  return <AccordionView />;
};

const styles = ScaledSheet.create({
  pageContainer: {
    flex: 0,
    flexDirection: "column",
    // height: "80@vs",
    flexWrap: "wrap",
    margin: 8,
    borderColor: "red",
    borderWidth: 2,
    borderRadius: 15,
    padding: 8,
  },
});

export default ProductVariants;
