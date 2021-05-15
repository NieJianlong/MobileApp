/*
 * @Author: Jianlong Nie
 * @Date: 2021-01-07 21:43:46
 * @LastEditTime: 2021-01-08 17:24:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MobileApp/App/Navigation/NavigationService.js
 */
import { NavigationActions, StackActions } from '@react-navigation/native';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.navigate(routeName, params);
}

function goBack(routeName, params) {
  _navigator.goBack();
}
function pop(n) {
  _navigator.current?.dispatch(StackActions.pop({ n }));
}
// add other navigation functions that you need and export them
export default {
  navigate,
  goBack,
  setTopLevelNavigator,
  pop,
};
