import React, { Component } from 'react'
import {
    View,
    StatusBar,
    Text,
    TouchableOpacity,
    ScrollView
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import {
    AppBar
} from '../../Components'

import styles from './styles'

class LegalScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tabIndex: 0
        }
    }

    componentDidMount() {

    }

    renderSegmentedControl() {
        const { tabIndex } = this.state
        return (
            <View style={styles.segmentedContainer}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => this.setState({ tabIndex: 0 })}
                    style={tabIndex === 0 ? styles.activeItem : styles.inactiveItem}>
                    <Text style={tabIndex === 0 ? styles.activeText : styles.inactiveText}>TERMS & CONDITIONS</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => this.setState({ tabIndex: 1 })}
                    style={tabIndex === 1 ? styles.activeItem : styles.inactiveItem}>
                    <Text style={tabIndex === 1 ? styles.activeText : styles.inactiveText}>PRIVACY POLICY</Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle='dark-content' />
                <SafeAreaView
                    style={styles.safeArea}
                    edges={['top', 'right', 'left', 'bottom']}
                >
                    <AppBar
                        showLogo={false}
                        onPressBack={() => this.props.navigation.goBack()}
                    />

                    <View style={styles.bodyContainer}>

                        {this.renderSegmentedControl()}

                        <Text style={styles.heading2Bold}>{this.state.tabIndex === 0 ? 'Terms & Conditions' : 'Privacy Policy'}</Text>
                        <Text style={styles.heading4Bold}>
                            Last updated: May 21, 2018
                        </Text>

                        <View style={styles.line} />

                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Text style={styles.txtRegular}>
                                Computers have become ubiquitous in almost every facet of our lives.
                                At work, desk jockeys spend hours in front of their desktops, while delivery
                                people scan bar codes with handhelds and workers in the field stay in touch
                                with the central office via their notebooks. At home, we rely on our desktops
                                and notebooks to do our shopping, to entertain us, and to keep us abreast of
                                world events. We may not see our email servers, but we count on them to deliver
                                our email whenever and wherever we want it.
                                Our PDAs keep track of our hectic schedules, our to-do lists, our contact lists,
                                and even entertain us with games while we’re waiting for an appointment or to board
                                a plane. Computer hardware weaves itself through the fabric of our lives.
                            {'\n'}
                            </Text>

                            <Text style={styles.heading3Bold}>
                                By using Salami Slicing Services you agree to these conditions. Please read them
                                carefully.
                        </Text>

                            <Text style={styles.txtRegular}>
                                Computers have become ubiquitous in almost every facet of our lives.
                                At work, desk jockeys spend hours in front of their desktops, while delivery
                                people scan bar codes with handhelds and workers in the field stay in touch
                                with the central office via their notebooks. At home, we rely on our desktops
                                and notebooks to do our shopping, to entertain us, and to keep us abreast of
                                world events. We may not see our email servers, but we count on them to deliver
                                our email whenever and wherever we want it.
                                Our PDAs keep track of our hectic schedules, our to-do lists, our contact lists,
                                and even entertain us with games while we’re waiting for an appointment or to board
                                a plane. Computer hardware weaves itself through the fabric of our lives.
                            {'\n'}
                            </Text>
                        </ScrollView>
                    </View>
                </SafeAreaView>
            </View>
        )
    }
}

export default LegalScreen