import { Dimensions } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import AppConfig from '../../Config/AppConfig'
import { ApplicationStyles, Colors, Fonts } from '../../Themes'

const { width, height } = Dimensions.get('window')

export default ScaledSheet.create({
    ...ApplicationStyles.screen,
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    mainContainer: {
        flex: 1,
        //paddingHorizontal: AppConfig.paddingHorizontal,
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
        alignItems: 'center',
        backgroundColor: Colors.white,
        paddingHorizontal: AppConfig.paddingHorizontal,
        height: '50@vs'
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
        paddingTop: '5@vs',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white
    },
    icAdd: {
        width: '25@s',
        height: '25@s',
        marginBottom: '5@vs'
    },
    btnAddContainer: {
        width: '100@s',
        alignItems: 'flex-end',
        paddingRight: AppConfig.paddingHorizontal

    },
    v1: {
        position: 'absolute',
        right: 0,
    },
    categoryListContainer: {
        paddingRight: '50@s',
        paddingLeft: '15@s'
    },
    addressBarContainer: {
        flexDirection: 'row',
        paddingHorizontal: '15@s',
        paddingVertical: '10@vs',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: Colors.grey10,
        backgroundColor: Colors.white,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icLocation: {
        width: '25@s',
        height: '25@s',
        tintColor: Colors.grey40,
        marginRight: '5@s'
    },
    areaContainer: {
        backgroundColor: '#F8F9FA',
        marginLeft: '7@s',
        paddingHorizontal: '8@s',
        paddingVertical: '3@s',
        borderRadius: '20@s'
    },
    icArrowDown: {
        width: '20@s',
        height: '20@s',
        transform: [{ rotate: '270deg' }]
    },
    icArrowDown2: {
        width: '20@s',
        height: '20@s',
        transform: [{ rotate: '270deg' }],
        tintColor: Colors.grey60,
        marginRight: '7@s'
    },
    sortBarContainer: {
        flexDirection: 'row',
        paddingHorizontal: '15@s',
        paddingVertical: '13@vs',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.background
    },
    icSort: {
        width: '20@s',
        height: '20@s',
        tintColor: Colors.grey80
    },
    prodListContainer: {
        flex: 1,
        backgroundColor: Colors.background
    },
    productContainer: {
        backgroundColor: Colors.white,
        paddingTop: '10@vs',
        paddingBottom: '10@vs',
        marginBottom: '16@vs'
    },
    productImage: {
        width: '88@s',
        height: '88@s'
    },
    productImageBig: {
        width: '300@s',
        height: '300@s'
    },
    v2: {
        justifyContent: 'space-between',
        height: '88@s'
    },
    txtRetailPrice: {
        ...ApplicationStyles.screen.heading4Bold,
        color: Colors.grey60,
        textDecorationLine: 'line-through',
        marginTop: '2@vs'
    },
    txtWholesalePrice: {
        ...ApplicationStyles.screen.heading4Bold,
        color: Colors.primary,
        marginTop: '2@vs'
    },
    v3: {
        marginRight: '20@s'
    },
    percentOffContainer: {
        backgroundColor: Colors.secondary01,
        paddingHorizontal: '10@s',
        paddingVertical: '5@s',
        borderRadius: '30@s'
    },
    txtOrderClose: {
        fontSize: '8@s',
        fontFamily: Fonts.primary,
        color: Colors.black,
    },
    v4: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: AppConfig.paddingHorizontal,
        borderTopWidth: 2,
        borderTopColor: Colors.grey10,
        marginTop: '5@vs',
        paddingTop: '10@vs'
    },
    icStock: {
        width: '22@s',
        height: '22@s',
        tintColor: Colors.grey60,
        marginRight: '5@s'
    },
    txtOrderNumber: {
        ...ApplicationStyles.screen.heading6Regular,
        fontSize: '13@s'
    },
    icInfo: {
        width: '22@s',
        height: '22@s',
        tintColor: Colors.secondary00,
        marginLeft: '5@s'
    },
    icShare: {
        width: '22@s',
        height: '22@s',
        tintColor: Colors.black,
        marginLeft: '5@s'
    },
})