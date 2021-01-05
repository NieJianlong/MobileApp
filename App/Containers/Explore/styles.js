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
    },
    categoryItemContainer: {
        paddingHorizontal: '12@s',
        paddingBottom: '5@vs',

        borderBottomColor: Colors.primary,
        borderBottomWidth: 2
    },
    selectedCategoryIndicator: {
        width: '100%', 
        height: 2, 
        backgroundColor: Colors.primary,
        marginTop: '5@vs'
    },
    categryContainer: {
        marginTop: '3@vs',
        flexDirection: 'row',
        alignItems: 'center'
    },
    icAdd: {
        width: '25@s',
        height: '25@s',
        marginBottom: '5@vs'
    },
    btnAddContainer: {
        width: '100@s',
        alignItems: 'flex-end'
    },
    v1: {
        position: 'absolute',
        right: 0,
    }
})