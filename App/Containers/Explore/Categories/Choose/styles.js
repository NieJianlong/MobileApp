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
    txt1: {
        ...ApplicationStyles.screen.heading4Regular,
        tintColor: Colors.grey80,
        marginBottom: '10@vs'
    },
    txt2: {
        ...ApplicationStyles.screen.heading2Bold,
    },
    txtSave: {
        ...ApplicationStyles.screen.heading5Bold,
        color: Colors.primary
    },
    btnUnselectedContainer: {
        width: '100@s',
        height: '100@s',
        borderRadius: '3@s',
        borderColor: Colors.grey10,
        borderWidth: 2,
        backgroundColor: Colors.white,
        marginBottom: '10@s',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: '10@s'
    },
    btnSelectedContainer: {
        width: '100@s',
        height: '100@s',
        borderRadius: '3@s',
        borderColor: Colors.secondary00,
        borderWidth: 2,
        backgroundColor: Colors.white,
        marginBottom: '10@s',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: '10@s'
    },
    txtUnselected: {
        ...ApplicationStyles.screen.heading6Bold,
        textAlign: 'center',
        color: Colors.grey40,
    },
    txtSelected: {
        ...ApplicationStyles.screen.heading6Bold,
        textAlign: 'center',
        color: Colors.secondary00,
    },
    categoriesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    }
})