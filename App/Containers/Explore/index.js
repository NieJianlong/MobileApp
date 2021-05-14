import React, { useState, useEffect } from 'react';
import { View, StatusBar, Dimensions } from 'react-native';
import { s } from 'react-native-size-matters';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Alert, RadiusButton } from '../../Components';
import { Colors } from '../../Themes';
import styles from './styles';
import AddressBar from './Components/AddressBar';
import ExploreHeader from './Components/ExploreHeader';
import ProductList from './Components/ProductList/ProductList';
import { CollapsibleHeaderTabView } from 'react-native-scrollable-tab-view-collapsible-header';
import { ScrollableTabBar } from 'react-native-scrollable-tab-view';

function Explore(props) {
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
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'rgba(0,0,0,0.0)'}
      />
      <SafeAreaView
        style={styles.mainContainer}
        edges={['top', 'left', 'right']}
      >
        <CollapsibleHeaderTabView
          makeHeaderHeight={() => 60}
          initialPage={0}
          renderTabBar={(mprops) => {
            return (
              <View>
                <ScrollableTabBar {...mprops} />
                <AddressBar />
              </View>
            );
          }}
          renderScrollHeader={() => <ExploreHeader />}
        >
          <ProductList index={0} tabLabel="All" />
          <ProductList index={1} tabLabel="Announcements" />
          <ProductList index={2} tabLabel="Electronics" />
          <ProductList index={3} tabLabel="Food & Beverage" />
          <ProductList index={4} tabLabel="Fashion" />
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
