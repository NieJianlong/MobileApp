import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import { Fonts, Colors } from '../Themes'
import PropTypes from 'prop-types'

import AppConfig from '../Config/AppConfig'
import { Images } from '../Themes';
import NavigationService from '../Navigation/NavigationService';


class AppBar extends Component {
    render() {
        const {
            showLogo,
            rightButton,
            onPressBack,
        } = this.props
         
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={()=>{
                    if (onPressBack) {
                        onPressBack();
                    }else {
                        NavigationService.goBack();
                    }
                }}>
                    <Image style={styles.icBack} source={Images.arrow_left} />
                </TouchableOpacity>
                {
                    showLogo &&
                    <Image source={Images.logo3} style={styles.logo} resizeMode={'contain'} />
                }
                {
                    rightButton ?
                        rightButton() :
                        <View style={styles.icBack} />
                }
            </View>
        )
    }
}


AppBar.propTypes = {

}

AppBar.defaultProps = {

}

const styles = ScaledSheet.create({
    container: {
        height: '40@vs',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: AppConfig.paddingHorizontal
    },
    txt: {
        color: 'rgb(24,24,101)',
        fontSize: AppConfig.fontSize,
        fontFamily: Fonts.semibold,
    },
    icon: {
        width: '20@s',
        height: '20@s',
        marginRight: '5@s'
    },
    icBack: {
        width: '30@s',
        height: '30@s',
        tintColor: Colors.grey60
    },
    logo: {
        height: '40@s',
        width: '140@s',
        tintColor: Colors.primary,
    },
})
export default AppBar