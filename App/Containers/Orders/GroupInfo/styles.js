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
        marginVertical: '0@vs'
    },
    body: {
        //paddingHorizontal: AppConfig.paddingHorizontal,
        paddingVertical: '10@vs',
        flex: 1
    },
    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: AppConfig.paddingHorizontal,
        paddingVertical: '10@vs',
        backgroundColor: Colors.white,
        borderBottomWidth: 1,
        borderColor: Colors.grey10
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    actionIcon: {
        width: '17@s',
        height: '17@s',
        tintColor: Colors.grey40,
        marginRight: '10@s'
    },
    icArrow: {
        width: '20@s',
        height: '20@s',
        tintColor: Colors.grey60,
        transform: [{ rotate: '180deg' }]
    },
    sectionName: {
        ...ApplicationStyles.screen.heading4Bold,
        marginVertical: '15@vs',
        marginHorizontal: AppConfig.paddingHorizontal,
    },
    mediaItemContainer: {
        width: '100@s',
        height: '100@s',
        borderRadius: '10@s',
        marginRight: '10@s'
    }
})