import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { Images } from '../../../Themes';
import styles from '../styles';
import { userProfileVar } from '../../../Apollo/cache'
function index(props) {
  return (
    <View style={styles.addressBarContainer}>
      <View style={styles.row}>
        <Image source={Images.locationMed} style={styles.icLocation} />
        <Text style={styles.heading5Bold}>Deliver to -</Text>
        <Text style={styles.heading5Regular}>{userProfileVar().addressId && userProfileVar().addressLine1}</Text>
        <View style={styles.areaContainer}>
          <Text style={styles.heading6Bold}>{userProfileVar().addressId && userProfileVar().addressLine2}</Text>
        </View>
      </View>

      <TouchableOpacity>
        <Image source={Images.arrow_left} style={styles.icArrowDown} />
      </TouchableOpacity>
    </View>
  );
}

export default index;
