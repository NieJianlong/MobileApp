import React, { useState, useEffect } from 'react';
import { View, StatusBar, Image, TouchableOpacity } from 'react-native';
import { s } from 'react-native-size-matters';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Alert, RadiusButton } from '../../Components';
import { Colors, Images } from '../../Themes';
import styles from './styles';
import AddressBar from './Components/AddressBar';
import ExploreHeader from './Components/ExploreHeader';
import ProductList from './Components/ProductList/ProductList';
import { CollapsibleHeaderTabView } from 'react-native-scrollable-tab-view-collapsible-header';
import { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import colors from '../../Themes/Colors';
import fonts from '../../Themes/Fonts';

import NavigationService from '../../Navigation/NavigationService';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';

function Explore(props) {
  const screenWidth = useWindowDimensions().width;
  const [
    showAccountActivatedSuccessfullyAlert,
    setShowAccountActivatedSuccessfullyAlert,
  ] = useState(false);
  const [showAccountActivateAlert, setShowAccountActivateAlert] = useState(
    false
  );
  useEffect(() => {
    if (showAccountActivatedSuccessfullyAlert) {
      setTimeout(() => {
        setShowAccountActivatedSuccessfullyAlert(false);
      }, 5000);
    }
  }, [showAccountActivatedSuccessfullyAlert]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <SafeAreaView
        style={styles.mainContainer}
        edges={['top', 'left', 'right']}
      >
        <CollapsibleHeaderTabView
          makeHeaderHeight={() => 60}
          tabBarActiveTextColor={colors.primary}
          renderTabBar={(mprops) => {
            return (
              <View style={{ flex: 1, backgroundColor: 'white' }}>
                <ScrollableTabBar
                  {...mprops}
                  underlineStyle={{
                    backgroundColor: colors.primary,
                  }}
                  style={{ borderWidth: 0 }}
                  textStyle={{ fontFamily: fonts.primary }}
                />
                <AddressBar />
                <View
                  style={{
                    backgroundColor: 'white',
                    width: 60,
                    height: 46,
                    marginTop: -100,
                    marginBottom: 60,
                    zIndex: 1000,
                    marginLeft: screenWidth - 60,
                  }}
                >
                  <TouchableOpacity
                    // activeOpacity={1}
                    onPress={() => {
                      NavigationService.navigate('EditCategoriesScreen');
                    }}
                    style={[styles.btnAddContainer]}
                  >
                    <Image source={Images.add1} style={styles.icAdd} />
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
          renderScrollHeader={() => <ExploreHeader />}
        >
          <ProductList index={0} tabLabel="All" />
          <ProductList
            index={1}
            tabLabel="Announcements"
            isAnnouncement={true}
          />
          <ProductList index={2} tabLabel="Electronics" />
          <ProductList index={3} tabLabel="Food & Beverage" />
          <ProductList index={4} tabLabel="Fashion            kk" />
        </CollapsibleHeaderTabView>
        {/* </View> */}
      </SafeAreaView>
      {showAccountActivatedSuccessfullyAlert && (
        <Alert
          visible={showAccountActivatedSuccessfullyAlert}
          message={'Your account has been activated successfully'}
          color={Colors.success}
          onDismiss={() => setShowAccountActivatedSuccessfullyAlert(false)}
        />
      )}
      {showAccountActivateAlert && (
        <Alert
          visible={showAccountActivateAlert}
          title={'Activate First'}
          message={
            "You've successfully registered your account. Please check your email for the activation link so can make full use of your account."
          }
          color={Colors.secondary00}
          onDismiss={() => setShowAccountActivateAlert(false)}
          action={() => (
            <View style={{ width: s(120) }}>
              <RadiusButton text={'RESEND EMAIL'} />
            </View>
          )}
        />
      )}
    </View>
  );
}
export default Explore;
