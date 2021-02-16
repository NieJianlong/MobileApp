import { ScaledSheet } from 'react-native-size-matters'
import { ApplicationStyles, Colors, Fonts } from '../../../Themes'
import { isIphoneX } from 'react-native-iphone-x-helper'
import AppConfig from '../../../Config/AppConfig'


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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.background,
        paddingHorizontal: AppConfig.paddingHorizontal,
        height: '50@vs'
    },
    icSearch: {
        width: '30@s',
        height: '30@s',
        tintColor: Colors.grey60
    },
    logo: {
        height: '40@s',
        width: '140@s',
        tintColor: Colors.primary,
    },
    txt1: {
        ...ApplicationStyles.screen.heading2Bold,
        textAlign: 'center'
    },
    txt2: {
        ...ApplicationStyles.screen.heading4Regular,
        textAlign: 'center',
        color: Colors.grey80
    },
    noOrderText: {
        marginTop: '60@vs',
        marginBottom: '50@vs'
    }
})