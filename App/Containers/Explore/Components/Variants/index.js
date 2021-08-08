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
import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import { t } from "react-native-tailwindcss";

import Accordion from "react-native-collapsible/Accordion";
import ColorItem from "./ColorItem";
import { ScrollView } from "react-native-gesture-handler";
import SizeItem from "./SizeItem";
import images from "../../../../Themes/Images";

class AccordionView extends React.Component {
  state = {
    activeSections: [],
  };

  _renderHeader = (content, index, isActive, sections) => {
    const valueItem = this.props.currentVariant.options.find(
      (item) => item.key === content.title
    );
    return (
      <View
        style={[
          t.pX4,
          t.h13,
          t.pY2,
          t.itemsCenter,
          t.borderB,
          isActive ? t.borderTransparent : t.borderGray300,
          t.flexRow,
          t.justifyBetween,
        ]}
      >
        <View>
          <Text style={[t.textLg, t.fontPrimary]}>{content.title}:</Text>
          <Text style={[t.textLg, t.fontSemibold]}>{valueItem.value}</Text>
        </View>
        <View style={[t.flexRow, t.itemsCenter]}>
          {content.title === "Color" && (
            <Image
              source={{
                uri: this.props.currentVariant.fullPath,
              }}
              resizeMode="contain"
              style={[t.h12, t.w12]}
            />
          )}
          <Image
            source={images.userMoreRightImage}
            resizeMode="contain"
            style={[
              t.h6,
              t.w6,
              { transform: [{ rotateZ: isActive ? "-90deg" : "90deg" }] },
            ]}
          />
        </View>
      </View>
    );
  };

  _renderContent = (section) => {
    const currentArray = [];
    return (
      <ScrollView horizontal contentContainerStyle={[t.flexRow, t.pL4]}>
        {section.content.map((item, index) => {
          //防止显示重复
          if (currentArray.indexOf(item.value) < 0) {
            currentArray.push(item.value);
            if (section.title === "Color") {
              return (
                <ColorItem
                  item={item}
                  currentVariant={this.props.currentVariant}
                  onChangeVariant={this.props.onChangeVariant}
                />
              );
            }
            return (
              <SizeItem
                item={item}
                currentVariant={this.props.currentVariant}
                onChangeVariant={this.props.onChangeVariant}
              />
            );
          }
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
        sections={this.props.sections}
        activeSections={this.state.activeSections}
        underlayColor={"transparent"}
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
const ProductVariants = ({ variants }) => {
  // to do reduce number props if possible
  console.log(variants);
  const [currentVariant, setCurrentVariant] = useState(
    variants.length > 0
      ? variants.find((item) => item.defaultVariant === true)
      : null
  );
  const onChangeVariant = (value) => {
    setCurrentVariant(value);
  };
  if (variants.length === 0) {
    return null;
  }
  const sections = [];
  const colors = { title: "Color", content: [] };
  const sizes = { title: "Size", content: [] };
  const styles = { title: "Style", content: [] };
  sections.push(colors);
  sections.push(sizes);
  sections.push(styles);
  for (let index = 0; index < variants.length; index++) {
    const variant = variants[index];
    const options = variant.options;
    for (let jndex = 0; jndex < options.length; jndex++) {
      const option = options[jndex];
      const currentValue = { ...variant, value: option.value };
      if (
        option.key === "Color" &&
        colors.content.indexOf(currentValue) === -1
      ) {
        colors.content.push(currentValue);
      }
      if (option.key === "Size" && sizes.content.indexOf(currentValue) === -1) {
        sizes.content.push(currentValue);
      }
      if (
        option.key === "Style" &&
        colors.content.indexOf(currentValue) === -1
      ) {
        styles.content.push(currentValue);
      }
    }
  }
  return (
    <AccordionView
      sections={sections}
      currentVariant={currentVariant}
      onChangeVariant={onChangeVariant}
    />
  );
};

export default ProductVariants;
