import React, { Component } from 'react'
import {
    View,
    StatusBar,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    ImageBackground,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { s, vs } from 'react-native-size-matters'

import styles from './styles'

import {
    AppBar,
    StarRating,
    TextInput,
    Picker,
    Selector
} from '../../../Components'
import { Colors, Images } from '../../../Themes'
import NavigationService from '../../../Navigation/NavigationService'

class ReportScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            images: []
        }
    }

    componentDidMount() {

    }

    onSubmit = () => {
        this.props.navigation.state.params.onSubmit()
        NavigationService.goBack()
    }

    renderHeader() {
        return (
            <View style={styles.header}>
                <AppBar
                    rightButton={() =>
                        <TouchableOpacity onPress={this.onSubmit}>
                            <Text style={styles.txtSave}>SUBMIT</Text>
                        </TouchableOpacity>
                    }
                />
            </View>
        )
    }

    renderBody() {
        return (
            <View style={styles.body}>

                <Selector
                    style={{ marginBottom: vs(10) }}
                    placeholder={'Problem reason goes here'}
                    data={['AAA', 'BBB', 'CCC']}
                />

                <TextInput
                    style={styles.reviewInput}
                    multiline
                    placeholder={'Write here your review'}
                />
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle='dark-content' />
                <SafeAreaView
                    style={styles.container}
                    edges={['top', 'left', 'right']}>

                    {this.renderHeader()}

                    {this.renderBody()}

                </SafeAreaView>
            </View>
        )
    }
}

export default ReportScreen