import React, { useState, useEffect } from 'react'
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
import { useMutation } from '@apollo/client';
import * as aQM from './gql/onboard_mutations'
import * as storage from '../../Apollo/local-storage'
import { getUniqueId } from 'react-native-device-info';


const iOS = Platform.OS === 'ios'

function OnboardingScreen(props) {

    /** this is enough to create a guest buyer */
    let BuyerProfileRequestForCreate = {
        guestBuyer: true,
    }

    let [isPlaying, setIsPlaying] = useState(true)

    // useMutation works here, I think when the code becomes to large the useMutation stops working
    // we can only use useMutation with public endpoints
    /**
     * CREATE_GUEST_BUYER is a public endpoint
     * see './gql/onboard_mutations'
     * 
     */
    const [guestBuyerId, { data, error }] = useMutation(aQM.CREATE_GUEST_BUYER, {
        onCompleted: (data) => onGetGuestBuyerId(data),
        onError: (error) => console.error("Error creating a guest Id", error),
    });


    useEffect(() => {


        return () => {
            // unmount here
        }
    }, [props]);

    /**
     * call back for the onCompleted CREATE_GUEST_BUYER mutation
     * update local storage and navigate
     */
    const onGetGuestBuyerId = async (data) => {
        let buyerId = data.createGuestBuyer.buyerId
        console.log("OnboardingScreen mutation createGuestBuyer" + buyerId)
        await storage.setLocalStorageValue(getUniqueId(), buyerId)
        NavigationService.navigate('MainScreen')
    }

    const togglePlayPauseVideo = () => {

        setIsPlaying(!isPlaying)

    }


    return (
        <View style={styles.container}>
            <StatusBar
                barStyle='light-content'
                translucent
                backgroundColor={'rgba(0,0,0,0.0)'}
            />
            <Video
                ref={(ref) => player = ref}
                source={{ uri: 'http://www.exit109.com/~dnn/clips/RW20seconds_1.mp4' }}
                style={styles.backgroundVideo}
                resizeMode={'cover'}
                repeat
                paused={!isPlaying}
                muted
            />
            <SafeAreaView
                style={styles.safeArea}
                edges={['top', 'right', 'left', 'bottom']}
            >
                <View style={styles.bodyContainer}>

                    <TouchableOpacity onPress={togglePlayPauseVideo} style={styles.playButton}>
                        <Image
                            style={styles.icon}
                            resizeMode={'contain'}
                            source={isPlaying ? Images.pause : Images.play} />
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
                        onPress={() => {
                            // call the CREATE_GUEST_BUYER mutation see onGetGuestBuyerId callback
                            guestBuyerId({ variables: { request: BuyerProfileRequestForCreate } })
                        }
                        }
                    />
                </View>
            </SafeAreaView>
        </View>
    )

}

export default OnboardingScreen