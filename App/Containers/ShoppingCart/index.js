import React from 'react';
import {
  StatusBar,
  View,
  SafeAreaView,
  FlatList,
  SectionList,
} from 'react-native';
import Empty from './Empty';
import AddressBar from './AddressBar';
import styles from './styles';
import CartSummary from './CartSummary';
import CartItem from './Cartitem';
import { Button } from '../../Components';
import { s, vs } from 'react-native-size-matters';
import AppConfig from '../../Config/AppConfig';

const datas = () =>
  [0, 1, 2, 3, 4].map(() => ({
    name: 'iPhone 11',
    picture:
      'https://bizweb.dktcdn.net/100/116/615/products/12promax.png?v=1602751668000',
    rating: 3.0,
    ratingCount: 124,
    retailPrice: 2345,
    wholesalePrice: 1542,
    orderClose: '22/12/2020',
    inStock: 100,
    orderCount: 24,
  }));

function index(props) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView
        style={styles.mainContainer}
        edges={['top', 'left', 'right']}
      >
        <SectionList
          sections={[{ title: '', data: datas() }]}
          renderSectionHeader={() => (
            <View
              style={{
                paddingHorizontal: AppConfig.paddingHorizontal,
                backgroundColor: 'white',
              }}
            >
              <Button text="PROCEED TO CHECKOUT"></Button>
            </View>
          )}
          stickyHeaderIndices={0}
          ListHeaderComponent={() => (
            <View style={{ backgroundColor: 'white' }}>
              <AddressBar />
              <CartSummary />
            </View>
          )}
          renderItem={({ item }) => (
            <CartItem key={index.toString()} product={item} />
          )}
          keyExtractor={(item, index) => `lll${index}`}
        />
      </SafeAreaView>
    </View>
  );
}

export default index;
