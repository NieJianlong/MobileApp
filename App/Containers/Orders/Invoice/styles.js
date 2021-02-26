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
        paddingVertical: '10@vs',
        flex: 1
    },
    sectionContainer: {
        backgroundColor: Colors.white,
        paddingHorizontal: '10@s',
        paddingVertical: '10@s',
        borderRadius: '20@s',
        marginHorizontal: AppConfig.paddingHorizontal,
        marginBottom: '20@vs',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        width: '20@s',
        height: '20@s',
        tintColor: Colors.grey60,
        marginRight: '6@s'
    },
    productContainer: {
        paddingHorizontal: AppConfig.paddingHorizontal
    },
    v1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '10@vs'
    },
    productIcon: {
        width: '50@s',
        height: '50@s'
    },
    productName: {
        ...ApplicationStyles.screen.heading6Regular,
        maxWidth: '150@s',
        lineHeight: '16@s'
    },
    productDetail: {
        ...ApplicationStyles.screen.heading6Regular,
        color: Colors.grey80
    },
    txtPrice: {
        ...ApplicationStyles.screen.heading4Bold,
        color: Colors.primary
    },
    priceContainer: {
        backgroundColor: Colors.white,
        marginTop: '20@vs',
        paddingHorizontal: AppConfig.paddingHorizontal,
        paddingVertical: '20@vs',
        borderTopLeftRadius: '25@s',
        borderTopRightRadius: '25@s'
    },
    v2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: '10@vs'
    },
    icDownload: {
        width: '20@s',
        height: '20@s'
    },
    txtOrder: {
        ...ApplicationStyles.screen.heading6Bold,
        color: Colors.grey60,
    },
    txtName: {
        ...ApplicationStyles.screen.heading5Bold,
    },
    txtAddress: {
        ...ApplicationStyles.screen.txtRegular,
        maxWidth: '135@s'
    },
    totalContainer: {
        paddingVertical: '10@s',
        paddingHorizontal: '15@s',
        backgroundColor: '#F8F9FA',
        borderRadius: '15@s',
        width: '140@s'
    },
    txtMoney: {
        ...ApplicationStyles.screen.heading2Bold,
        marginBottom: '10@vs'
    },
    sellerContainer: {
        paddingHorizontal: AppConfig.paddingHorizontal,
        marginTop: '5@vs',
        marginBottom: '10@vs'
    },
    amountContainer: {
        paddingHorizontal: '10@s'
    },
    productOptionText: {
        ...ApplicationStyles.screen.heading6Regular,
        color: Colors.grey80
    },
    txt1: {
        ...ApplicationStyles.screen.heading4Bold,
        marginTop: '10@vs'
    },
    line: {
        height: 1,
        backgroundColor: Colors.grey10,
        marginBottom: '15@vs'
    }
})