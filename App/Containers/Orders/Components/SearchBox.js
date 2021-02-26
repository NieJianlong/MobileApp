import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    Dimensions
} from 'react-native'
import { ScaledSheet, s } from 'react-native-size-matters'
import PropTypes from 'prop-types'

import { Fonts, Colors, Images, ApplicationStyles } from '../../../Themes'
import AppConfig from '../../../Config/AppConfig'

const { width, height } = Dimensions.get('window')

const results = ['iphone 12', 'iphone 12 mini', 'iphone 12 pro', 'iphone 12 pro max']

class SearchBox extends Component {

    constructor(props) {
        super(props)
        this.state = {
            keyword: this.props.keyword ?? '',
            results: []
        }
    }

    getResults = (keyword) => {
        return results.filter(i => i.toLowerCase().includes(keyword.toLowerCase()))
    }

    render() {
        const {
            disabled,
            onPressDelete,
            onPressBack,
            onSelect,
        } = this.props

        return (
            <View>
                <View style={styles.container}>
                    <TouchableOpacity onPress={onPressBack}>
                        <Image source={Images.arrow_left} style={styles.icSearch} />
                    </TouchableOpacity>

                    <TextInput
                        autoFocus
                        editable={!disabled}
                        placeholder={'Search...'}
                        value={this.state.keyword}
                        style={styles.textInput}
                        onChangeText={(text) => {
                            this.setState({ keyword: text, results: this.getResults(text) })
                        }}
                    />
                    {
                        this.state.keyword !== '' &&
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({ keyword: '' })
                                onPressDelete && onPressDelete()
                            }}
                            style={styles.btnDelete}>
                            <Image source={Images.crossMedium} style={styles.icDelete} />
                        </TouchableOpacity>
                    }
                </View>
            </View>
        )
    }
}

SearchBox.propTypes = {

}

SearchBox.defaultProps = {

}

const styles = ScaledSheet.create({
    container: {
        height: '38@vs',
        backgroundColor: Colors.white,
        borderRadius: '20@s',
        borderWidth: 1,
        borderColor: Colors.grey20,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: '10@s',
        width: width - 2 * AppConfig.paddingHorizontal
    },
    icSearch: {
        width: '22@s',
        height: '22@s',
        tintColor: Colors.grey60
    },
    icDelete: {
        width: '13@s',
        height: '13@s',
        tintColor: Colors.grey80
    },
    btnDelete: {
        width: '18@s',
        height: '18@s',
        backgroundColor: Colors.grey10,
        borderRadius: '10@s',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        flex: 1,
        paddingLeft: '5@s',
        height: '100%',
        fontSize: s(13),
        fontFamily: Fonts.primary,
        color: Colors.black
    },
    textResult: {
        fontSize: s(13),
        fontFamily: Fonts.primary,
        color: Colors.black
    },
    itemResultContainer: {
        paddingVertical: '10@vs'
    },
    listResultContainer: {
        marginTop: '10@vs'
    },
    icAdd: {
        width: '22@s',
        height: '22@s',
        tintColor: Colors.secondary00,
        marginRight: '5@s'
    },
    addAddressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '7@vs'
    },
    txtAddAdress: {
        fontSize: '15@s',
        fontFamily: Fonts.primary,
        color: Colors.secondary00
    },
    noResultContainer: {
        marginTop: '25@vs',
        justifyContent: 'center',
    },
    txt1: {
        ...ApplicationStyles.screen.heading2Bold,
        textAlign: 'center',
        lineHeight: '32@s'
    },
    txt2: {
        ...ApplicationStyles.screen.heading4Regular,
        textAlign: 'center',
        color: Colors.grey80,
        marginTop: '10@vs',
        marginBottom: '20@vs'
    }
})
export default SearchBox