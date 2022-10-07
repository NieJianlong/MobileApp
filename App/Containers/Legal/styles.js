import { ScaledSheet } from 'react-native-size-matters'
import { ApplicationStyles, Colors, Fonts } from '../../Themes'
import { isIphoneX } from 'react-native-iphone-x-helper'
import AppConfig from '../../Config/AppConfig'

export default ScaledSheet.create({
    ...ApplicationStyles.screen,
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        justifyContent: 'center',
        alignItems: 'center'
    },
    safeArea: {
        flex: 1,
        width: '100%',
    },
    bodyContainer: {
        flex: 1,
        paddingHorizontal: '15@s',
        paddingBottom: isIphoneX() ? '5@vs' : '20@vs'
    },
    segmentedContainer: {
        backgroundColor: Colors.white,
        height: '40@vs',
        borderRadius: '40@vs',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: '2@s',
        borderColor: Colors.white,
        padding: '2@s',
        marginBottom: '24@vs'
    },
    activeItem: {
        width: '50%',
        backgroundColor: Colors.secondary00,
        height: '100%',
        borderRadius: '20@vs',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inactiveItem: {
        width: '50%',
        backgroundColor: Colors.white,
        height: '100%',
        borderRadius: '20@vs',
        justifyContent: 'center',
        alignItems: 'center'
    },
    activeText: {
        ...ApplicationStyles.screen.heading5Bold,
        color: Colors.white
    },
    inactiveText: {
        ...ApplicationStyles.screen.heading5Bold,
        color: Colors.grey40
    },
    line: {
        height: '2@s',
        backgroundColor: Colors.grey10,
        marginVertical: '7@vs'
    }
})