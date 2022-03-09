import React from "react";
import { View, SafeAreaView, StatusBar } from "react-native";
import colors from "../../Themes/Colors";
import styles from "./styles";

function BaseScreen(props) {
    const {barStyle = "dark-content", barColor = colors.background} = props;
    return (
        <View style={styles.root}>
            <StatusBar barStyle={barStyle} backgroundColor={barColor} />
            <SafeAreaView
                style={styles.safeArea}
                edges={["top", "right", "left", "bottom"]}
            >
                {props.children}
            </SafeAreaView>
        </View>
    );
}

export default BaseScreen;