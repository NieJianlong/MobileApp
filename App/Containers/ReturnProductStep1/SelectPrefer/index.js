import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  SafeAreaView,
  StatusBar,
  FlatList,
} from 'react-native';
import AppConfig from '../../../Config/AppConfig';
import { vs, s, ScaledSheet } from 'react-native-size-matters';
import fonts from '../../../Themes/Fonts';
import colors from '../../../Themes/Colors';
import { AppBar, SearchBox } from '../../../Components';
import NavigationService from '../../../Navigation/NavigationService';
import metrics from '../../../Themes/Metrics';
import CheckBox from '../../Explore/Components/CheckBox';
import { ApplicationStyles } from '../../../Themes';

const countries = [
  `Return the product and get a refund`,
  'Ask for a replacement',
];

function index(props) {
  const [selectValue, setSelectValue] = useState(countries[0]);
  return (
    <FlatList
      contentContainerStyle={{ paddingBottom: vs(44) }}
      ListHeaderComponent={() => {
        return (
          <View style={{ height: 70, justifyContent: 'center' }}>
            <Text
              style={[
                ApplicationStyles.screen.heading4Bold,
                { fontSize: s(18) },
              ]}
            >
              Select which option you prefer
            </Text>
          </View>
        );
      }}
      data={countries}
      renderItem={({ item }, index) => {
        return (
          <View>
            <View style={{ height: vs(12) }} />
            <CheckBox
              defaultValue={selectValue == item}
              onSwitch={(t) => {
                setSelectValue(item);
                if (typeof props.onChangeValue == 'function') {
                  props.onChangeValue(item);
                }
              }}
              label={item}
            />
          </View>
        );
      }}
      keyExtractor={(item, index) => `ass${index}`}
    />
  );
}

export default index;
const styles = ScaledSheet.create({
  title: {
    fontFamily: fonts.primary,
    fontSize: '16@s',
    color: colors.black,
    fontWeight: '600',
  },
});
