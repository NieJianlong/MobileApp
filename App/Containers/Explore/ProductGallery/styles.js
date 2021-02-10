import { ScaledSheet } from 'react-native-size-matters'
import { ApplicationStyles, Colors } from '../../../Themes'

export default ScaledSheet.create({
    ...ApplicationStyles.screen,
    container: {
        flex: 1,
        backgroundColor: Colors.background
    },
    image: {
        width: '100%',
        height: '300@vs',
        marginTop: '15@vs'
    },
    indicatorContainer: {
        position: 'absolute',
        alignSelf: 'center',
        top: '20@vs'
    },
    indicator: {
        ...ApplicationStyles.screen.txtRegular
    }
})