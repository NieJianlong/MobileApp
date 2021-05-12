import React, { useState, useEffect, useCallback } from 'react';
import { View, StatusBar, ScrollView, Dimensions, Image } from 'react-native';
import { s } from 'react-native-size-matters';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Alert, RadiusButton } from '../../Components';
import { Colors, Images } from '../../Themes';
import styles from './styles';
import AddressBar from './Components/AddressBar';
import ExploreHeader from './Components/ExploreHeader';
import ExploreSortBar from './Components/ExploreSortBar';
import CustomTabbar from './Components/CustomTabbar';
import ProductList from './Components/ProductList/ProductList';
import { TouchableOpacity } from 'react-native-gesture-handler';
import NavigationService from '../../Navigation/NavigationService';

const sliderWidth = Dimensions.get('window').width;

function Explore(props) {
  const [showProductAsRows, setShowProductAsRows] = useState(true);
  const productPage = useCallback(
    () => (
      <View style={{ paddingTop: 110 }}>
        <ProductList showProductAsRows={showProductAsRows} />
      </View>
    ),
    [showProductAsRows]
  );
  const announcementPage = useCallback(
    () => (
      <View style={{ paddingTop: 110 }}>
        <ProductList showProductAsRows={showProductAsRows} isAnnouncement />
      </View>
    ),
    [showProductAsRows]
  );
  // const [selectedCategory, setSelectedCategory] = useState(0);
  const renderScene = SceneMap({
    All: productPage,
    Announcements: announcementPage,
    Electronics: productPage,
    'Food & Beverage': productPage,
    Fashion: productPage,
  });
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'All', title: 'All' },
    { key: 'Announcements', title: 'Announcements' },
    { key: 'Electronics', title: 'Electronics' },
    { key: 'Food & Beverage', title: 'Food & Beverage' },
    { key: 'Fashion', title: 'Fashion' },
  ]);
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
        <ScrollView
          stickyHeaderIndices={[1]}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <ExploreHeader />
          <View
            style={{ height: 120, backgroundColor: 'white', marginTop: 50 }}
          >
            <AddressBar />
            <ExploreSortBar
              onChange={(showAsRow) => {
                setShowProductAsRows(showAsRow);
              }}
            />
            <View
              style={{
                backgroundColor: 'white',
                width: 60,
                height: 54,
                marginTop: -170,
                marginLeft: sliderWidth - 60,
              }}
            >
              <TouchableOpacity
                activeOpacity={1}
                onPress={() =>
                  NavigationService.navigate('EditCategoriesScreen')
                }
                style={[styles.btnAddContainer]}
              >
                <Image source={Images.add1} style={styles.icAdd} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ flexGrow: 1, marginTop: -180 }}>
            <TabView
              // lazy
              // renderLazyPlaceholder={<Text>refreshing</Text>}
              onSwipeStart={(event) => {
                console.log(event);
              }}
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={(index) => {
                setIndex(index);
              }}
              renderTabBar={(nprops) => <CustomTabbar {...nprops} />}
              initialLayout={{ width: sliderWidth }}
            />
          </View>
        </ScrollView>
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
