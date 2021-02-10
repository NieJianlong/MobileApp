import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import { Fonts, Colors, Images, ApplicationStyles } from '../../../Themes'
import {
    Button
} from '../../../Components'

class ShareOptionList extends Component {
    render() {
        return (
            <View>
                <TouchableOpacity style={styles.optionContainer}>
                    <View style={[styles.chatButton, { backgroundColor: Colors.facebook }]}>
                        <Image source={Images.facebook} style={styles.chatIcon} />
                    </View>

                    <Text style={styles.text}>Facebook</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.optionContainer}>
                    <View style={[styles.chatButton, { backgroundColor: Colors.whatsapp }]}>
                        <Image source={Images.whatsapp} style={styles.chatIcon} />
                    </View>

                    <Text style={styles.text}>Whatsapp</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.optionContainer}>
                    <View style={[styles.chatButton, { backgroundColor: Colors.google }]}>
                        <Image source={Images.google} style={styles.chatIcon} />
                    </View>

                    <Text style={styles.text}>Google</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.optionContainer}>
                    <View style={[styles.chatButton, { backgroundColor: Colors.twitter }]}>
                        <Image source={Images.twitter} style={styles.chatIcon} />
                    </View>

                    <Text style={styles.text}>Twitter</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.optionContainer}>
                    <View style={[styles.chatButton, { backgroundColor: Colors.grey80 }]}>
                        <Image source={Images.link} style={styles.chatIcon} />
                    </View>

                    <Text style={styles.text}>Link</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.optionContainer, { borderBottomColor: Colors.background }]}>
                    <View style={[styles.chatButton, { backgroundColor: Colors.grey80 }]}>
                        <Image source={Images.qr} style={styles.chatIcon} />
                    </View>

                    <Text style={styles.text}>QR Code</Text>
                </TouchableOpacity>

                <View style={styles.v1}>
                    <View style={styles.line} />
                    <Text style={styles.txtOr}>OR</Text>
                    <View style={styles.line} />
                </View>

                <Button 
                    backgroundColor={Colors.grey80}
                    text={'MORE OPTIONS'} />
            </View>
        )
    }
}


ShareOptionList.propTypes = {

}

ShareOptionList.defaultProps = {

}

const styles = ScaledSheet.create({
    container: {
        height: '48@vs',
        backgroundColor: '#7FFFD4',
        borderRadius: '20@s',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    chatIcon: {
        width: '16@s',
        height: '16@s',
        tintColor: Colors.white
    },
    chatButton: {
        width: '38@s',
        height: '38@s',
        borderRadius: '20@s',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '15@s'
    },
    chatIconsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '280@s',
    },
    optionContainer: {
        paddingVertical: '12@vs',
        borderBottomColor: Colors.grey10,
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        ...ApplicationStyles.screen.heading4Regular
    },
    txtOr: {
        ...ApplicationStyles.screen.heading6Regular,
        color: Colors.grey60
    },
    v1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20@vs'
    },
    line: {
        width: '120@s',
        height: 1,
        backgroundColor: Colors.grey20
    }
})
export default ShareOptionList