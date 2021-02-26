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
        //paddingHorizontal: '15@s',
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
    },
    v1: {
        paddingHorizontal: AppConfig.paddingHorizontal,
    },
    filterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '10@vs'
    },
    icArrow: {
        width: '16@s',
        height: '16@s',
        tintColor: Colors.grey60,
        transform: [{ rotate: '270deg' }],
        marginRight: '10@s'
    },
    txtFilter: {
        ...ApplicationStyles.screen.txtBold,
    },
    itemContainer: {
        paddingHorizontal: AppConfig.paddingHorizontal,
        paddingVertical: AppConfig.paddingHorizontal,
        backgroundColor: Colors.white,
        marginBottom: '10@vs',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemAvatar: {
        width: '40@s',
        height: '40@s'
    },
    txt3: {
        ...ApplicationStyles.screen.heading6Regular,
        color: Colors.grey80
    },
    v2: {
        marginLeft: '5@s'
    },
    annoucementContainer: {
        backgroundColor: Colors.secondary01,
        paddingHorizontal: '7@s',
        paddingVertical: '4@s',
        borderRadius: '30@s',
        marginLeft: '10@s',
        justifyContent: 'center',
        alignItems: 'center'
    },
    annoucementText: {
        ...ApplicationStyles.screen.heading6Bold,
        color: Colors.secondary00
    },
    unreadContainer: {
        width: '16@s',
        height: '16@s',
        borderRadius: '20@s',
        backgroundColor: Colors.secondary00,
        marginTop: '5@s',
        justifyContent: 'center',
        alignItems: 'center'
    },
    v3: {
        alignItems: 'flex-end',
    },
    unreadNumber: {
        ...ApplicationStyles.screen.txtNoteBold,
        color: Colors.white,
    }
})