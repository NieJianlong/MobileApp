import { s, ScaledSheet } from "react-native-size-matters";
import Colors from "../../Themes/Colors";
import { ApplicationStyles } from "../../Themes";
import { Fonts } from "../../Themes";

const styles = ScaledSheet.create({
    container: {
        width: '100%',
        borderRadius: s(16),
        borderWidth: s(1),
        borderColor: Colors.grey10,
        marginHorizontal: s(16),
        marginTop: s(16),
        paddingHorizontal: s(20),
        paddingVertical: s(12),
    },
    touch: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    addressImg: {
        tintColor: Colors.grey40,
        width: s(14.4),
        height: s(22),
    },
    content: {
        marginLeft: s(16),
    },
    title: {
        fontFamily: Fonts.primary,
        fontWeight: '600',
        fontSize: s(14),
        lineHeight: s(24),
        color: Colors.grey80,
    },
    address: {
        fontFamily: Fonts.primary,
        fontWeight: '400',
        fontSize: s(14),
        lineHeight: s(20),
        color: Colors.grey80,
    },
});

export default styles;