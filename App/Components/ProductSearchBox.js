import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
} from 'react-native'
import { ScaledSheet, s } from 'react-native-size-matters'
import PropTypes from 'prop-types'

import Highlighter from './Highlighter'

import { Fonts, Colors, Images } from '../Themes'
import NavigationService from '../Navigation/NavigationService'

const results = ['street Jump', 'street Boro', 'street Bleard', 'street Laurence']

class ProductSearchBox extends Component {

    constructor(props) {
        super(props)
        this.state = {
            keyword: ''
        }
    }

    render() {
        const {
            onPressAddAddressManually
        } = this.props

        return (
            <View>
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => NavigationService.goBack()}>
                        <Image source={Images.arrow_left} style={styles.icSearch} />
                    </TouchableOpacity>

                    <TextInput
                        placeholder={'Search products'}
                        value={this.state.keyword}
                        style={styles.textInput}
                        onChangeText={(text) => {
                            this.setState({ keyword: text })
                        }}
                    />
                    {
                        this.state.keyword !== '' &&
                        <TouchableOpacity
                            onPress={() => this.setState({ keyword: '' })}
                            style={styles.btnDelete}>
                            <Image source={Images.crossMedium} style={styles.icDelete} />
                        </TouchableOpacity>
                    }
                </View>

                {
                    this.state.keyword !== '' &&
                    <View style={styles.listResultContainer}>
                        {
                            results.map((item, index) =>
                                <TouchableOpacity key={index.toString()} style={styles.itemResultContainer}>
                                    <Highlighter
                                        style={styles.textResult}
                                        highlightStyle={{ fontWeight: '600' }}
                                        searchWords={[this.state.keyword]}
                                        textToHighlight={item} />
                                </TouchableOpacity>
                            )
                        }
                    </View>
                }
            </View>
        )
    }
}

ProductSearchBox.propTypes = {

}

ProductSearchBox.defaultProps = {

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
        paddingHorizontal: '10@s'
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
    }
})
export default ProductSearchBox