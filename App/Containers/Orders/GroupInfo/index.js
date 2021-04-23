import React from 'react';
import {
  View,
  StatusBar,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import { AppBar } from '../../../Components';
import ProductInfo from '../Components/ProductInfo';
import ProductItem from '../../Explore/Components/ProductItem';
import { Images } from '../../../Themes';
import NavigationService from '../../../Navigation/NavigationService';
import { useRoute } from '@react-navigation/core';
import { s } from 'react-native-size-matters';

function GroupInfoScreen(props) {
  const { params } = useRoute();
  function renderAction(icon, text, action) {
    return (
      <TouchableOpacity onPress={action} style={styles.actionContainer}>
        <View style={styles.row}>
          <Image
            resizeMode={'contain'}
            source={icon}
            style={styles.actionIcon}
          />

          <Text style={styles.heading5Bold}>{text}</Text>
        </View>

        <Image source={Images.arrow_left} style={styles.icArrow} />
      </TouchableOpacity>
    );
  }
  function renderActions() {
    return (
      <View>
        {renderAction(Images.packageMed, 'Order details', () =>
          NavigationService.navigate('OrderDetailScreen')
        )}
        {renderAction(Images.invoice, 'Invoice', () =>
          NavigationService.navigate('InvoiceScreen')
        )}
        {renderAction(Images.star, 'Write a review about the product', () =>
          NavigationService.navigate('RateOrderScreen')
        )}
        {renderAction(Images.user, 'Evaluate the seller', () =>
          NavigationService.navigate('RateSellerScreen')
        )}
        {/* when order status is reached,user can track order */}
        {params &&
          params.type === 'reached' &&
          renderAction(Images.orderTrackImage, 'Track order', () =>
            NavigationService.navigate('TrackOrderScreen', { type: 'track' })
          )}
        {/* when order status is received,user can return product */}
        {params &&
          params.type === 'received' &&
          renderAction(Images.orderReturnImage, 'Return product', () =>
            NavigationService.navigate('ReturnProductStep1Screen')
          )}
        {/* when order status is uncompleted,user can cancel the order */}
        {params &&
          params.type === 'incompleted' &&
          renderAction(Images.orderCancelImage, 'Cancel order', () =>
            NavigationService.navigate('CancelOrderScreen')
          )}
        {params &&
          params.type === 'returnstatus' &&
          renderAction(Images.orderTrackImage, 'Return status', () =>
            NavigationService.navigate('TrackOrderScreen', { type: 'return' })
          )}
      </View>
    );
  }
  function renderMediaItem({ item, index }) {
    return (
      <ImageBackground
        borderRadius={s(5)}
        source={{ uri: item.url }}
        style={styles.mediaItemContainer}
      ></ImageBackground>
    );
  }
  function renderMediaSection() {
    return (
      <View>
        <Text style={styles.sectionName}>Media, Links and Docs</Text>

        <FlatList
          data={media}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderMediaItem}
          contentContainerStyle={{ paddingHorizontal: s(15) }}
        />
      </View>
    );
  }
  function renderRelatedProducts() {
    return (
      <View>
        <Text style={styles.sectionName}>
          Who bought this items also bought below items:
        </Text>

        {products.map((item, index) => (
          <ProductItem size={'M'} product={item} />
        ))}
      </View>
    );
  }
  function renderBody() {
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
        <ProductInfo product={product} />

        {renderActions()}

        {renderMediaSection()}

        {renderRelatedProducts()}
      </ScrollView>
    );
  }
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <View style={styles.header}>
          <AppBar title={'Group Info'} />
        </View>
        {renderBody()}
      </SafeAreaView>
    </View>
  );
}

export default GroupInfoScreen;

const product = {
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
};

const media = [
  {
    type: 'image',
    url:
      'https://cdn.pocket-lint.com/r/s/1200x/assets/images/142227-phones-review-iphone-x-review-photos-image1-ahdsiyvum0.jpg',
  },
  {
    type: 'image',
    url:
      'https://cdn.pocket-lint.com/r/s/1200x/assets/images/142227-phones-review-iphone-x-review-photos-image1-ahdsiyvum0.jpg',
  },
  {
    type: 'image',
    url:
      'https://cdn.pocket-lint.com/r/s/1200x/assets/images/142227-phones-review-iphone-x-review-photos-image1-ahdsiyvum0.jpg',
  },
  {
    type: 'image',
    url:
      'https://cdn.pocket-lint.com/r/s/1200x/assets/images/142227-phones-review-iphone-x-review-photos-image1-ahdsiyvum0.jpg',
  },
  {
    type: 'image',
    url:
      'https://cdn.pocket-lint.com/r/s/1200x/assets/images/142227-phones-review-iphone-x-review-photos-image1-ahdsiyvum0.jpg',
  },
];

const products = [
  {
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
  },
  {
    name: 'iPhone 11',
    picture:
      'https://bizweb.dktcdn.net/100/116/615/products/12promax.png?v=1602751668000',
    rating: 4.0,
    ratingCount: 124,
    retailPrice: 2345,
    wholesalePrice: 1542,
    orderClose: '22/12/2020',
    inStock: 100,
    orderCount: 24,
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
];
