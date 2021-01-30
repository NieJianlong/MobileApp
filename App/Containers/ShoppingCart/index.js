import React from 'react';
import { StatusBar, View, SafeAreaView, FlatList } from 'react-native';
import Empty from './Empty';
import AddressBar from './AddressBar';
import styles from './styles';
import CartSummary from './CartSummary';
import CartItem from './Cartitem';

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
        <AddressBar />
        <CartSummary />
        <FlatList
          data={datas()}
          renderItem={({ item }) => (
            <CartItem key={index.toString()} product={item} size={'M'} />
          )}
        />
      </SafeAreaView>
    </View>
  );
}

export default index;
