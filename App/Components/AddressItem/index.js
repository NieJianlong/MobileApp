import React from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity as RNTouchableOpacity,
    Platform,
} from "react-native";
import { TouchableOpacity as GHTouchableOpacity } from "react-native-gesture-handler";
const TouchableOpacity = Platform.OS === "ios" ? RNTouchableOpacity : GHTouchableOpacity;

import images from "../../Themes/Images";

import styles from "./styles";

export default function AddressItem({ id, name, number, street, area, onPress }) {

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.touch} onPress={() => onPress(id)}>
                <Image source={images.locationMed} style={styles.addressImg}></Image>
                <View style={styles.content}>
                    <Text style={styles.title}>
                        {name} {number}
                    </Text>
                    <Text style={styles.address}>
                        {street} {area}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}