import React, { Component } from 'react'
import {
    View,
    StatusBar,
    Text,
    Image,
    ScrollView,
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
} from '../../../../Components'
import { Colors, Images } from '../../../../Themes'
import NavigationService from '../../../../Navigation/NavigationService'

class ChooseCategoriesScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            categories: this.props.route.params.categories
        }
    }

    componentDidMount() {
        
    }

    renderHeader() {
        return (
            <View style={styles.header}>
                <AppBar
                    rightButton={() =>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.route.params.returnCategories(this.state.categories)
                                NavigationService.goBack()
                            }}
                        >
                            <Text style={styles.txtSave}>SAVE</Text>
                        </TouchableOpacity>
                    }

                />
            </View>
        )
    }

    checkSelected = (item) => {
        return this.state.categories.includes(item)
    }

    onPress = (item, selected) => {
        let categories = [...this.state.categories]
        if (selected) {
            categories.push(item)
        } else {
            let index = categories.indexOf(item)
            categories.splice(index, 1)
        }
        this.setState({ categories })
    }

    renderBody() {
        return (
            <View style={styles.body}>
                <Text style={styles.txt2}>
                    Choose your preferences
                </Text>
                <Text style={styles.txt1}>
                    Choose which products interest you the most and we can offer you a more personalized offer
                </Text>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.categoriesContainer}>
                        {
                            allCategories.map((item, index) => {
                                let selected = this.checkSelected(item)
                                return (
                                    <TouchableOpacity
                                        onPress={() => this.onPress(item, !selected)}
                                        style={selected ? styles.btnSelectedContainer : styles.btnUnselectedContainer}
                                        key={index.toString()}>
                                        <Text style={selected ? styles.txtSelected : styles.txtUnselected}>{item}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </ScrollView>
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

export default ChooseCategoriesScreen

const allCategories = ['All', 'Announcements', 'Electronics', 'Food & Beverage', 'Fashion',
    'Category1', 'Category2', 'Category3', 'Category4', 'Category5', 'Category6', 'Category7', 'Category8',
    'Category9', 'Category10', 'Category11', 'Category12'
]