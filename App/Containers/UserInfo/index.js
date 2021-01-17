/*
 * @Author: Jianlong Nie
 * @Date: 2021-01-08 15:54:53
 * @LastEditTime: 2021-01-09 14:57:59
 * @LastEditors: Please set LastEditors
 * @Description: UserInfo Screen
 * @FilePath: /MobileApp/App/Containers/UserInfo/index.js
 */
import React, { useState } from 'react';
import { View } from 'react-native';
import UserHeader from '../UserCenter/UserHeader';
import { ScaledSheet, s, vs } from 'react-native-size-matters';
import AppConfig from '../../Config/AppConfig';
import { AppBar, Alert } from '../../Components';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../Themes/Colors';
import HorizontalMenu from './HorizontalMenu';
export const AlertContext = React.createContext('AlertContext');
function index(props) {
  const [visible, setVisible] = useState(false);

  return (
    <AlertContext.Provider value={'ddd'}>
      <View style={styles.container}>
        <SafeAreaView style={{ maxHeight: 64 }}>
          <AppBar></AppBar>
        </SafeAreaView>

        <View>
          <UserHeader needEdit></UserHeader>
        </View>
        <Alert
          visible={visible}
          message={'Your account has been activated successfully'}
          color={colors.success}
          // onDismiss={this.toggleAccountActivatedSuccessfullyAlert}
        />
        <HorizontalMenu></HorizontalMenu>
      </View>
    </AlertContext.Provider>
  );
}

export default index;
const styles = ScaledSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
});
