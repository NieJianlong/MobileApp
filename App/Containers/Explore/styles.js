import { ScaledSheet } from 'react-native-size-matters'
import AppConfig from '../../Config/AppConfig'
import { ApplicationStyles, Colors, Fonts } from '../../Themes'

export default ScaledSheet.create({
    ...ApplicationStyles.screen,
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    mainContainer: {
        flex: 1,
        paddingHorizontal: AppConfig.paddingHorizontal
    },
    greyBackground: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(29,29,29,0.5)'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    icSearch: {
        width: '30@s',
        height: '30@s'
    },
    logo: {
        height: '40@s',
        width: '140@s',
        tintColor: Colors.primary,
    },
    popupHeader: {
        flexDirection: 'row',
        paddingVertical: '20@vs',
        alignItems: 'center'
    },
    popupTitle: {
        color: Colors.black,
        fontSize: AppConfig.fontSize,
        fontFamily: Fonts.semibold,
        textAlign: 'center',
        flex: 1
    },
    txtSave: {
        color: Colors.grey40,
        fontSize: '13@s',
        fontFamily: Fonts.semibold,
    },
    textInput: {
        marginBottom: '20@vs'
    }
})