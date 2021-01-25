import React, { useState } from 'react'
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native'
import { ScaledSheet, s, vs } from 'react-native-size-matters'
import { Fonts, Colors } from '../Themes'

function Progress(props) {

    const [active, setActive] = useState(false)

    const {
        maximumValue,
        currentValue,
        style
    } = props

    const percentage = Math.round(currentValue * 100 / maximumValue) + '%'

    return (
        <View style={[styles.container, style]}>
            <View style={[styles.bar, { width: percentage }]} />
        </View>
    )
}


Progress.propTypes = {

}

Progress.defaultProps = {

}

const MAX_WIDTH = s(90)
const BAR_HEIGHT = vs(8)

const styles = ScaledSheet.create({
    container: {
        width: MAX_WIDTH,
        height: BAR_HEIGHT,
        borderRadius: '3@vs',
        backgroundColor: Colors.secondary01,
        flexDirection: 'row'
    },
    bar: {
        position: 'absolute',
        left: 0, top: 0,
        height: BAR_HEIGHT,
        borderRadius: '3@vs',
        backgroundColor: Colors.secondary00
    }
})

export default Progress