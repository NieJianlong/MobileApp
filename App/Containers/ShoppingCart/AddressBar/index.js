import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { Images } from '../../../Themes';
import styles from '../styles'
function index(props) {
  return (
    <View style={styles.addressBarContainer}>
      <View style={styles.row}>
        <Image source={Images.locationMed} style={styles.icLocation} />
        <Text style={styles.heading5Regular}>
          Deliver to - Tanil Nadu 12345
        </Text>
        <View style={styles.areaContainer}>
          <Text style={styles.heading6Bold}>Area 4</Text>
        </View>
      </View>

      <TouchableOpacity>
        <Image source={Images.arrow_left} style={styles.icArrowDown} />
      </TouchableOpacity>
    </View>
  );
}

export default index;
