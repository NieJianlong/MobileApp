import React, { useContext, useCallback, useState } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { vs, s } from 'react-native-size-matters';
import { Colors, Images } from '../../../Themes';
import styles from '../styles';
import { AlertContext } from '../../Root/GlobalContext';
import CheckBox from './CheckBox';

const sortOptions = [
  'About to be completed',
  'Last added',
  'Price: low to high',
  'Price: high to low',
];

function SortSheetContent({ callback }) {
  const [sortOption, setSortOption] = useState(1);
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'flex-end' }}>
      {sortOptions.map((i, index) => {
        return (
          <View key={index.toString()}>
            <View style={{ height: vs(12) }} />
            <CheckBox
              defaultValue={sortOption === index}
              onSwitch={(t) => {
                setSortOption(index);
                callback(index);
              }}
              label={i}
            />
          </View>
        );
      })}
    </SafeAreaView>
  );
}
export default function ExploreSortBar() {
  const [showProductAsRows, setShowProductAsRows] = useState(true);
  const { dispatch } = useContext(AlertContext);
  const [currentOption, setCurrentOption] = useState(1);
  const toggleSortBySheet = useCallback(() => {
    dispatch({
      type: 'changSheetState',
      payload: {
        showSheet: true,
        height: 320,
        children: () => (
          <SortSheetContent callback={(index) => setCurrentOption(index)} />
        ),
        sheetTitle: 'Sorty by',
      },
    });
  }, [dispatch]);
  return (
    <View style={styles.sortBarContainer}>
      <TouchableOpacity onPress={toggleSortBySheet} style={styles.row}>
        <Image source={Images.arrow_left} style={styles.icArrowDown2} />
        <Text style={styles.txtBold}>{sortOptions[currentOption]}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setShowProductAsRows(!showProductAsRows);
        }}
      >
        <Image
          source={showProductAsRows ? Images.sortRows : Images.sortSquares}
          style={styles.icSort}
        />
      </TouchableOpacity>
    </View>
  );
}
