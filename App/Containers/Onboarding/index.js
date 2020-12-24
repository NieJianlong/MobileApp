import React, { Component } from 'react'
import {
    View,
    StatusBar,
    Image,
    TouchableOpacity
} from 'react-native'
import Video from 'react-native-video'
import { SafeAreaView } from 'react-native-safe-area-context'

import Button from '../../Components/Button'

import { Colors, Images } from '../../Themes'
import styles from './styles'
import { vs } from 'react-native-size-matters'

class OnboardingScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isPlaying: true,
        }
    }

    componentDidMount() {

    }

    togglePlayPauseVideo = () => {
        this.setState({
            isPlaying: !this.state.isPlaying
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle='light-content' />
                <Video
                    ref={(ref) => {
                        this.player = ref
                    }}
                    source={Images.videoOnboarding}
                    style={styles.backgroundVideo}
                    resizeMode={'cover'}
                    repeat
                    paused={!this.state.isPlaying}
                />
                <SafeAreaView
                    style={styles.safeArea}
                    edges={['top', 'right', 'left', 'bottom']}
                >
                    <View style={styles.bodyContainer}>

                        <TouchableOpacity onPress={this.togglePlayPauseVideo} style={styles.playButton}>
                            <Image
                                style={styles.icon}
                                resizeMode={'contain'}
                                source={this.state.isPlaying ? Images.pause : Images.play} />
                        </TouchableOpacity>

                        <Button
                            text={'SIGN IN'}
                            onPress={() => this.props.navigation.navigate('LoginScreen')}
                        />

                        <View style={{ height: vs(12) }} />

                        <Button
                            text={'CONTINUE'}
                            backgroundColor={Colors.white}
                            textColor={Colors.black}
                            onPress={() => this.props.navigation.navigate('ExploreScreen')}
                        />
                    </View>
                </SafeAreaView>
            </View>
        )
    }
}

export default OnboardingScreen