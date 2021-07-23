import React, { Component } from "react";
import { View, StatusBar, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { vs } from "react-native-size-matters";
import { useRoute } from "@react-navigation/native";

import styles from "./styles";

import { AppBar, TextInput, Selector } from "../../../Components";
import NavigationService from "../../../Navigation/NavigationService";

function Report(props) {
  const { params } = useRoute();

  const onSubmit = () => {
    params.onSubmit();
    NavigationService.goBack();
  };

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <AppBar
          rightButton={() => (
            <TouchableOpacity onPress={onSubmit}>
              <Text style={styles.txtSave}>SUBMIT</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };

  const renderBody = () => {
    return (
      <View style={styles.body}>
        <Selector
          style={{ marginBottom: vs(10) }}
          placeholder={"Problem reason goes here"}
          //   value={mstate}
          data={["AAA", "BBB", "CCC"]}
          onValueChange={(text) => setMstate(text)}
        />

        <TextInput
          style={styles.reviewInput}
          multiline
          placeholder={"Write here your review"}
          textAlignVertical={"top"}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        {renderHeader()}

        {renderBody()}
      </SafeAreaView>
    </View>
  );
}

export default Report;
