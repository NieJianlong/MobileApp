import { ScaledSheet } from 'react-native-size-matters'
import AppConfig from '../../../../Config/AppConfig'
import { ApplicationStyles, Colors } from '../../../../Themes'

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
        paddingHorizontal: AppConfig.paddingHorizontal,
        paddingVertical: '10@vs',
        flex: 1
    },
    txtSave: {
        ...ApplicationStyles.screen.heading5Bold,
        color: Colors.primary
    },
    txt1: {
        ...ApplicationStyles.screen.heading4Regular,
        tintColor: Colors.grey80,
        marginBottom: '10@vs'
    },
    itemContainer: {
        backgroundColor: Colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: AppConfig.paddingHorizontal,
        paddingVertical: '15@vs',
        borderRadius: '15@s',
        borderWidth: 1,
        borderColor: Colors.grey10,
        marginBottom: '12@vs'
    },
    txtCategory: {
        ...ApplicationStyles.screen.heading5Bold,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icTrash: {
        width: '15@s', height: '15@s',
        tintColor: Colors.grey40,
        marginRight: '15@s',
    },
    icMove: {
        width: '15@s', height: '15@s',
        tintColor: Colors.secondary00,
    },
    btnAdd: {
        width: '56@s',
        height: '56@s',
        borderRadius: '30@s',
        backgroundColor: Colors.primary,
        alignSelf: 'flex-end',
        marginRight: AppConfig.paddingHorizontal,
        marginBottom: AppConfig.paddingHorizontal,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icAdd: {
        width: '20@s',
        height: '20@s',
        tintColor: Colors.white
    }
})