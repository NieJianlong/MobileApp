import { ScaledSheet } from 'react-native-size-matters'
import { ApplicationStyles, Colors, Fonts } from '../../../Themes'
import AppConfig from '../../../Config/AppConfig'

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
    }
})