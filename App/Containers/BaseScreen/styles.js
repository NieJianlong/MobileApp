import { StatusBar, Platform } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import colors from "../../Themes/Colors";

export default ScaledSheet.create({
    root: {
        flex: 1,
        backgroundColor: colors.background,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderColor: '#f00'
    },
    safeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
});