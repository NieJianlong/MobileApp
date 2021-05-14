import React, { useContext, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from '../styles';
import { AlertContext } from '../../Root/GlobalContext';
import { Images } from '../../../Themes';
import AddressSheetContent from './AddressSheetContent';

export default function AddressBar() {
  const { dispatch } = useContext(AlertContext);
  const toggleAddressSheet = useCallback(() => {
    // dispatch({
    //   type: 'changSheetState',
    //   payload: {
    //     showSheet: true,
    //     height: 380,
    //     children: () => <AddressSheetContent />,
    //     sheetTitle: 'Add your delivery address',
    //   },
    // });
  }, [dispatch]);
  useEffect(() => {
    toggleAddressSheet();
  }, [toggleAddressSheet]);

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

      <TouchableOpacity onPress={toggleAddressSheet}>
        <Image source={Images.arrow_left} style={styles.icArrowDown} />
      </TouchableOpacity>
    </View>
  );
}
