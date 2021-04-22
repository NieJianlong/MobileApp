import React from 'react';
import { View, StatusBar, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppBar } from '../../Components';
import styles from './styles';
import images from '../../Themes/Images';
import { ScrollView } from 'react-native-gesture-handler';
import Nav from '../../Navigation/NavigationService';
import colors from '../../Themes/Colors';
import { useRoute } from '@react-navigation/native';

function AddPaymentMethod(props) {
  const payments = [
    {
      image: images.userPayMethod2Image,
    },
    {
      image: images.userPayMethod1Image,
    },
    {
      image: images.userPayMethod3Image,
    },
    {
      image: images.userPayMethod4Image,
    },
    {
      image: images.userPayMethod5Image,
    },
  ];

  const { params } = useRoute();
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <SafeAreaView
        style={styles.safeArea}
        edges={['top', 'right', 'left', 'bottom']}
      >
        <AppBar />
        <View style={styles.bodyContainer}>
          <Text style={styles.heading2Bold}> Add a payment method </Text>
          <ScrollView>
            {payments.map((item, index) => {
              return (
                <View
                  key={`paymengt${index}`}
                  style={{
                    maxHeight: 110,
                  }}
                >
                  <TouchableOpacity
                    onPress={(item) => {
                      Nav.navigate('AddCreditScreen', {
                        callback: () => {
                          Nav.pop(2);
                          if (typeof params.callback == 'function') {
                            params.callback();
                          }
                        },
                      });
                    }}
                  >
                    <Image source={item.image} style={styles.item} />
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default AddPaymentMethod;
