import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import { Fonts, Colors, Images, ApplicationStyles } from '../Themes'
import PropTypes from 'prop-types'
import AppConfig from '../Config/AppConfig'

class StarRating extends Component {
    render() {
        const {
            rating,
            ratingCount,
            style,
            fullMode
        } = this.props

        return (
            <View style={[styles.container, style]}>
                <Image source={Images.starFilled} style={rating >= 1 ? styles.filledStar : styles.emptyStar} />
                <Image source={Images.starFilled} style={rating >= 2 ? styles.filledStar : styles.emptyStar} />
                <Image source={Images.starFilled} style={rating >= 3 ? styles.filledStar : styles.emptyStar} />
                <Image source={Images.starFilled} style={rating >= 4 ? styles.filledStar : styles.emptyStar} />
                <Image source={Images.starFilled} style={rating == 5 ? styles.filledStar : styles.emptyStar} />

                {
                    fullMode ?
                        <Text style={styles.txtRatingCount}>{rating} ({ratingCount} Reviews)</Text>
                        :
                        <Text style={styles.txtRatingCount}>{ratingCount}</Text>
                }


            </View>
        )
    }
}


StarRating.propTypes = {

}

StarRating.defaultProps = {

}

const styles = ScaledSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    filledStar: {
        width: '14@s',
        height: '14@s',
        marginRight: '0@s',
        tintColor: Colors.star
    },
    emptyStar: {
        width: '14@s',
        height: '14@s',
        marginRight: '0@s',
        tintColor: Colors.grey20
    },
    txtRatingCount: {
        ...ApplicationStyles.screen.heading6Regular,
        color: Colors.black,
        marginLeft: '3@s'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})
export default StarRating