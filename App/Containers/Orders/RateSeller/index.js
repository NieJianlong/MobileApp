import React, { Component } from 'react'
import {
    View,
    StatusBar,
    Text,
    Image,
    TouchableOpacity
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import DraggableFlatList, {
    RenderItemParams,
} from 'react-native-draggable-flatlist'

import styles from './styles'

import {
    ProductSearchBox,
    AppBar
} from '../../../Components'
import { Colors, Images } from '../../../Themes'
import NavigationService from '../../../Navigation/NavigationService'

class OrderDetailScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            categories: categories
        }
    }

    componentDidMount() {
        console.log(this.props.navigation)
    }

    renderHeader() {
        return (
            <View style={styles.header}>
                <AppBar
                    title={'Edit Categories'}
                    rightButton={() =>
                        <TouchableOpacity>
                            <Text style={styles.txtSave}>SAVE</Text>
                        </TouchableOpacity>
                    }
                />
            </View>
        )
    }


    renderBody() {
        return (
            <View style={styles.body}>

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

export default OrderDetailScreen

const categories = ['All', 'Announcements', 'Electronics', 'Food & Beverage', 'Fashion']