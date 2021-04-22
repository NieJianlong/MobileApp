import React, { Component } from 'react'
import {
    View,
    StatusBar,
    Image,
    TouchableOpacity,
    Platform
} from 'react-native'
import Video from 'react-native-video'
import { SafeAreaView } from 'react-native-safe-area-context'

import Button from '../../Components/Button'

import { Colors, Images } from '../../Themes'
import styles from './styles'
import { vs } from 'react-native-size-matters'
import NavigationService from '../../Navigation/NavigationService'

const iOS = Platform.OS === 'ios'

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
                <StatusBar 
                    barStyle='light-content' 
                    translucent 
                    backgroundColor={'rgba(0,0,0,0.0)'}
                />
                <Video
                    ref={(ref) => {
                        this.player = ref
                    }}
                    source={{ uri: 'http://www.exit109.com/~dnn/clips/RW20seconds_1.mp4' }}
                    style={styles.backgroundVideo}
                    resizeMode={'cover'}
                    repeat
                    paused={!this.state.isPlaying}
                    muted
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
                            onPress={() => NavigationService.navigate('LoginScreen')}
                        />

                        <View style={{ height: vs(12) }} />

                        <Button
                            text={'CONTINUE'}
                            backgroundColor={Colors.white}
                            textColor={Colors.black}
                            onPress={() => NavigationService.navigate('MainScreen')}
                        />
                    </View>
                </SafeAreaView>
            </View>
        )
    }
}

export default OnboardingScreen