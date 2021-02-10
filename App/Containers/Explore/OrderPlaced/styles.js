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
    body: {
        paddingVertical: '10@vs',
        flex: 1
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    textArea: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: AppConfig.paddingHorizontal,
    },
    txt1: {
        ...ApplicationStyles.screen.heading2Bold,
        textAlign: 'center',
        lineHeight: '30@s'
    },
    txt2: {
        ...ApplicationStyles.screen.heading4Regular,
        textAlign: 'center',
        color: Colors.grey80,
        marginTop: '10@vs'
    },
    txt3: {
        ...ApplicationStyles.screen.heading3Bold,
        marginVertical: '15@vs',
        paddingHorizontal: AppConfig.paddingHorizontal,
    },
    informContainer: {
        backgroundColor: Colors.white,
        paddingTop: '15@vs',
        paddingHorizontal: AppConfig.paddingHorizontal,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    productImage: {
        width: '60@s',
        height: '60@s',
        marginRight: '10@s'
    },
    line: {
        height: 1,
        width: '100%',
        backgroundColor: Colors.grey10,
        marginTop: '15@vs'
    },
    chatContainer: {
        borderTopWidth: 1,
        borderBottomWidth: 0,
        borderColor: Colors.grey10,
        paddingVertical: '15@vs',
        marginTop: '15@vs',
        alignItems: 'center',
    },
    chatIcon: {
        width: '16@s',
        height: '16@s',
        tintColor: Colors.white
    },
    chatButton: {
        width: '35@s',
        height: '35@s',
        borderRadius: '20@s',
        justifyContent: 'center',
        alignItems: 'center'
    },
    chatIconsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '280@s',
    },
    icAdd: {
        width: '26@s',
        height: '26@s',
        tintColor: Colors.grey80
    },
})