/*
 * @Author: Jianlong Nie
 * @Date: 2021-01-07 21:43:46
 * @LastEditTime: 2021-01-07 22:09:36
 * @LastEditors: nav tool
 * @Description: In User Settings Edit
 * @FilePath: /MobileApp/App/Navigation/NavigationService.js
 */
import { NavigationActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}
// add other navigation functions that you need and export them
export default {
  navigate,
  setTopLevelNavigator,
};
