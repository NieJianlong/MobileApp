import { ScaledSheet } from 'react-native-size-matters'
import AppConfig from '../../../Config/AppConfig'
import { ApplicationStyles, Colors } from '../../../Themes'

export default ScaledSheet.create({
    ...ApplicationStyles.screen,
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    image: {
        width: '100%',
        height: '300@vs',
        marginTop: '15@vs'
    },
    header: {
        paddingHorizontal: AppConfig.paddingHorizontal,
        marginVertical: '15@vs'
    },
    body: {
        paddingHorizontal: AppConfig.paddingHorizontal,
        paddingVertical: '10@vs'
    },
    recentSearchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: '10@vs'
    },
    v1: {
        flexDirection: 'row',
        //alignItems: 'center'
    },
    icClock: {
        width: '15@s',
        height: '15@s',
        tintColor: Colors.grey60,
        marginRight: '8@s',
        marginTop: '2@s'
    },
    txtSearch: {
        ...ApplicationStyles.screen.heading5Regular,
        color: Colors.grey80,
        maxWidth: '250@s'
    },
    icDelete: {
        width: '20@s',
        height: '20@s',
        tintColor: Colors.grey60,
    }
})