import React, { useState } from 'react'
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import { act } from 'react-test-renderer'
import { Fonts, Colors, ApplicationStyles } from '../Themes'

//description text component which can expand and collapse
function DescriptionText(props) {

    const [active, setActive] = useState(false)

    const {
        text,
        style,
        previewLength
    } = props

    return (
        <TouchableOpacity
            onPress={() => setActive(!active)}
            style={style}>
            <Text style={styles.text}>
                {active ? text : text.substring(0, previewLength ?? 105) + '...'}
                <Text style={{ color: Colors.secondary00 }}>{active ? ' Less' : ' Read more'}</Text>
            </Text>
        </TouchableOpacity>
    )
}


DescriptionText.propTypes = {

}

DescriptionText.defaultProps = {

}

const WIDTH = '44@s'
const HEIGHT = '22@s'

const styles = ScaledSheet.create({
    text: {
        ...ApplicationStyles.screen.txtRegular
    }
})

export default DescriptionText