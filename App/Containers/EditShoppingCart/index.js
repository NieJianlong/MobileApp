import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  StatusBar,
  SectionList,
} from 'react-native';
import AppConfig from '../../Config/AppConfig';
import { vs, s, ScaledSheet } from 'react-native-size-matters';
import fonts from '../../Themes/Fonts';
import colors from '../../Themes/Colors';
import { AppBar, RightButton } from '../../Components';
import NavigationService from '../../Navigation/NavigationService';
import CheckBox from '../Explore/Components/CheckBox';
import metrics from '../../Themes/Metrics';
import { ApplicationStyles } from '../../Themes';

function EditShoppingCart(props) {
  const [state, setState] = useState({
    selected: {
      Size: '256GB',
      Style: 'OnePlus 8',
      Color: 'Onyx Black',
    },
    datas: [
      {
        title: 'Size',
        data: [
          { title: '256GB', price: '+$145' },
          { title: '128GB', price: '-$45' },
        ],
      },
      {
        title: 'Style',
        data: [
          { title: 'OnePlus 8 Pro', price: '+$125' },
          { title: 'OnePlus 8', price: '-$45' },
        ],
      },
      {
        title: 'Color',
        data: [
          { title: 'Onyx Black', price: '+$125', color: '#292929' },
          { title: 'Glaciar Green', price: '-$45', color: '#96E9E0' },
          { title: 'Ultramarine Blue', price: '-$45', color: '#9CACE5' },
        ],
      },
    ],
  });
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <SafeAreaView
        style={styles.safeArea}
        edges={['top', 'right', 'left', 'bottom']}
      >
        <AppBar
          title={`Edit details`}
          rightButton={() => {
            return (
              <RightButton
                title="SAVE"
                onPress={() => {
                  NavigationService.goBack();
                }}
              />
            );
          }}
        />
        <View style={{ height: metrics.screenHeight - vs(64) }}>
          <SectionList
            extraData={state}
            contentContainerStyle={{ paddingBottom: vs(44) }}
            sections={state.datas}
            renderSectionHeader={({ section: { title } }) => (
              <View
                style={{
                  paddingHorizontal: s(18),
                  height: 50,
                  justifyContent: 'center',
                  backgroundColor: '#F8F9FA',
                }}
              >
                <Text
                  style={[
                    ApplicationStyles.screen.heading4Bold,
                    { marginTop: 20 },
                  ]}
                >
                  {title}
                </Text>
              </View>
            )}
            renderItem={({ item, section, separators }, index) => {
              const sectionTitle = section.title;
              const selectedValue = state.selected[sectionTitle];

              return (
                <View
                  style={{
                    paddingHorizontal: AppConfig.paddingHorizontal,
                  }}
                >
                  <View style={{ height: vs(12) }} />
                  <CheckBox
                    defaultValue={selectedValue === item.title}
                    onSwitch={(t) => {
                      const selectedDic = state.selected;
                      selectedDic[sectionTitle] = item.title;
                      console.log({ ...state, selected: { ...selectedDic } });
                      setState({ ...state, selected: { ...selectedDic } });
                    }}
                    hasIcon={section.title === 'Color'}
                    iconColor={item.color}
                    label={item.title}
                  />
                  {selectedValue !== item.title && (
                    <Text
                      style={[
                        { position: 'absolute', top: vs(25), right: 40 },
                        {
                          color: colors.grey40,
                          fontSize: vs(14),
                          fontFamily: fonts.primary,
                        },
                      ]}
                    >
                      {item.price}
                    </Text>
                  )}
                </View>
              );
            }}
            keyExtractor={(item, index) => `ass${index}`}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

export default EditShoppingCart;
const styles = ScaledSheet.create({
  title: {
    fontFamily: fonts.primary,
    fontSize: '16@s',
    color: colors.black,
    fontWeight: '600',
  },
});
