import { s, ScaledSheet } from "react-native-size-matters";
import Colors from "../../Themes/Colors";
import { ApplicationStyles } from "../../Themes";
import { Fonts } from "../../Themes";

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    rightButton: {
        ...ApplicationStyles.screen.heading5Bold,
        fontSize: s(14),
        color: Colors.grey40,
    },
    horizontalCenter: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        ...ApplicationStyles.screen.heading2Bold,
        fontSize: s(20),
        textAlign: 'center',
    },
    actionWrapper: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: s(24),
        paddingHorizontal: s(16),
    },
    switch: {
        fontFamily: Fonts.primary,
        fontSize: s(14),
        lineHeight: s(20),
        color: Colors.black,
    },
    saveAddress: {
        marginTop: s(24),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    addressIcon: {
        paddingLeft: s(11),
        paddingRight: s(19),
    },
    saveAddressText: {
        fontFamily: Fonts.primary,
        fontSize: s(14),
        lineHeight: s(20),
        color: Colors.black,
    },
    deliveryAddressSection: {
        marginTop: s(36),
        paddingHorizontal: s(16),
    },
    deliveryAddressSectionTitle: {
        fontSize: s(14),
        fontFamily: Fonts.primary,
        color: Colors.grey80,
        fontWeight: '700',
    },
    deliveryDescriptionBox: {
        marginTop: s(5),
        paddingHorizontal: s(33),
        borderColor: Colors.grey10,
        borderRadius: s(3),
        borderWidth: s(1),
        paddingVertical: s(20),
        backgroundColor: 'white'
    },
    deliveryDescriptionText: {
        fontSize: s(14),
        fontFamily: Fonts.primary,
        color: Colors.grey80,
        fontWeight: 'normal',
        marginTop: s(5),
    },
});

export default styles;