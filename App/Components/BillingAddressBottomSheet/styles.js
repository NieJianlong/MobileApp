import { s, ScaledSheet } from "react-native-size-matters";
import Colors from "../../Themes/Colors";
import { ApplicationStyles } from "../../Themes";
import { Fonts } from "../../Themes";

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    button: {
      width: s(164)
    },
});

export default styles;