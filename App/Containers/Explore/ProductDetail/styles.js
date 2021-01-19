import { ScaledSheet } from 'react-native-size-matters'
import { ApplicationStyles, Colors, Fonts } from '../../../Themes'
import AppConfig from '../../../Config/AppConfig'
import { isIphoneX } from 'react-native-iphone-x-helper'

export default ScaledSheet.create({
    ...ApplicationStyles.screen,
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    mainContainer: {
        flex: 1,
    },
    imagesContainer: {
        width: '100%',
        height: '350@vs'
    },
    prodImage: {
        width: '100%',
        height: '100%'
    },
    btnRoundContainer: {
        width: '36@s',
        height: '36@s',
        borderRadius: '20@s',
        backgroundColor: Colors.grey10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnRoundIcon: {
        width: '22@s',
        height: '22@s',
        tintColor: Colors.grey80,
    },
    row1: {
        position: 'absolute',
        top: 0, left: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '15@s'
    },
    row2: {
        position: 'absolute',
        bottom: 0, left: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '15@s'
    },
    photoNumberTxt: {
        fontSize: '13@s',
        fontFamily: Fonts.primary,
        color: Colors.grey80,
        fontWeight: '600'
    },
    photoNumberContainer: {
        borderRadius: '20@s',
        backgroundColor: Colors.grey10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: '10@s',
        paddingVertical: '3@s'
    },
    v2: {
        paddingHorizontal: AppConfig.paddingHorizontal,
    },
    txtRetailPrice: {
        ...ApplicationStyles.screen.heading4Bold,
        fontSize: '16@s',
        color: Colors.grey60,
        textDecorationLine: 'line-through',
        marginTop: '2@vs'
    },
    txtWholesalePrice: {
        ...ApplicationStyles.screen.heading4Bold,
        fontSize: '16@s',
        color: Colors.primary,
        marginTop: '2@vs'
    },
    v3: {
        marginRight: '15@s'
    },
    percentOffContainer: {
        backgroundColor: Colors.secondary01,
        paddingHorizontal: '10@s',
        paddingVertical: '2@s',
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
        //justifyContent: 'space-between',
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
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoContainer: {
        marginTop: '13@vs',
        paddingBottom: '15@vs'
    },
    descriptionContainer: {
        paddingHorizontal: AppConfig.paddingHorizontal,
        marginTop: '10@vs'
    },
    optionContainer: {
        paddingVertical: AppConfig.paddingHorizontal,
        paddingHorizontal: AppConfig.paddingHorizontal,
        backgroundColor: Colors.background
    },
    noteContainer: {
        backgroundColor: Colors.grey10,
        paddingVertical: '10@vs',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '3@s'
    },
    picker: {
        marginTop: '15@vs'
    },
    headerTabsSafeArea: {
        position: 'absolute',
        top: 0,
        width: '100%',
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    headerTabsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: AppConfig.paddingHorizontal,
    },
    headerTabItem: {
        borderBottomWidth: 2,
        borderBottomColor: Colors.white,
        alignSelf: 'flex-end',
        height: '30@vs'
    },
    relatedProductsContainer: {
        backgroundColor: Colors.background
    },
    relatedProductsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        paddingHorizontal: AppConfig.paddingHorizontal
    },
    relatedProductsList: {
        paddingHorizontal: AppConfig.paddingHorizontal,
        marginVertical: '10@vs'
    },
    footerSafeArea: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: Colors.white,
        paddingHorizontal: AppConfig.paddingHorizontal,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        paddingTop: '15@vs',
        paddingBottom: isIphoneX() ? 0 : '10@vs'
    },
    rowSpaceBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    icCart: {
        width: '28@s',
        height: '28@s',
        tintColor: Colors.primary,
        marginRight: '5@s'
    },
    btnBuyNow: {
        width: '165@s',
        height: '48@vs',
        backgroundColor: Colors.primary,
        borderRadius: '30@s',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: '10@s'
    },
    priceContainer: {
        backgroundColor: Colors.primary01,
        paddingHorizontal: '7@s',
        paddingVertical: '4@vs',
        borderRadius: '20@s'
    },
    sellerAvatarContainer: {
        width: '30@s',
        height: '30@s',
        borderRadius: '15@s',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '10@s'
    },
    sellerAvatar: {
        width: '30@s',
        height: '30@s'
    },
    storeInfoContainer: {
        paddingHorizontal: AppConfig.paddingHorizontal,
        paddingTop: '10@vs',
        paddingBottom: '10@vs',
        backgroundColor: Colors.white
    },
    productReviewContainer: {
        paddingHorizontal: AppConfig.paddingHorizontal,
        paddingTop: '10@vs',
        paddingBottom: '10@vs',
        backgroundColor: Colors.white
    }
})