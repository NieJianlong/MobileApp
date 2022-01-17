import { ScaledSheet } from 'react-native-size-matters';
import { ApplicationStyles, Colors, Fonts } from '../../Themes';
import AppConfig from '../../Config/AppConfig'

export default ScaledSheet.create({
    ...ApplicationStyles.screen,
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: Colors.background,
        alignItems: 'center'
    }
})