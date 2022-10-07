import React, { Component, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { t } from "react-native-tailwindcss";

import { SegmentedControl } from "../../Components";
import Privacy from "./Privacy";

import styles from "./styles";
import Terms from "./Terms";

function LegalScreen(props) {
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <View style={styles.container}>
      <View style={styles.bodyContainer}>
        <SegmentedControl
          label1={"TERMS & CONDITIONS"}
          label2={"PRIVACY POLICY"}
          onSwitch={(t) => setTabIndex(t)}
        />
        <Text style={styles.heading2Bold}>
          {tabIndex === 0 ? "Terms & Conditions" : "Privacy Policy"}
        </Text>
        <Text style={styles.heading4Bold}>Last updated: Apr 13, 2022</Text>
        <View style={styles.line} />
        <View style={[tabIndex === 0 ? t.flex1 : { height: 0, width: 0 }]}>
          <Terms />
        </View>
        <View style={[tabIndex === 1 ? t.flex1 : { height: 0, width: 0 }]}>
          <Privacy />
        </View>
        {/* {tabIndex === 0 ?  : <Privacy />} */}
      </View>
    </View>
  );
}

export default LegalScreen;
