import NavigationService from '../../Navigation/NavigationService';
import images from '../../Themes/Images';
import NoPurchase from './NoPurchase';

/**
 * @description: address test data
 * @param {*}
 * @return {*}
 */
export const AddressTestData = [
  {
    title: 'Home',
    subTitle: '4442 Brighton Circle Road, Saint Cloud MN MInesota 56303',
    isDefault: true,
  },
  {
    title: 'Work',
    subTitle: '4442 Brighton Circle Road, Saint Cloud MN MInesota 56303',
    isDefault: false,
  },
  {
    title: 'Home',
    subTitle: '4442 Brighton Circle Road, Saint Cloud MN MInesota 56303',
    isDefault: false,
  },
  {
    title: 'Work',
    subTitle: '4442 Brighton Circle Road, Saint Cloud MN MInesota 56303',
    isDefault: false,
  },
];
export const BillDetail = {
  firstName: 'John',
  lastName: 'Roots',
  phoneOrEmailNum: '1317272927@qq.com',
  streetName: 'Tamil Nadu Street, 12345',
  streetNum: '666',
  door: '7-703',
  city: 'QingDao',
  mstate: 'ShanDong',
  postcode: '27009',
  country: 'China',
  company: 'MaShangBan',
  taxid: 'dsds',
};
let replaceChars = function (str, length, fromBegin, mask) {
  mask = mask ? mask : '*';
  let replacement = '';
  for (var i = 0; i < length; i++) {
    replacement += mask;
  }
  if (fromBegin) {
    let regexp = new RegExp('.{1,' + length + '}');
    return str.replace(regexp, replacement);
  } else {
    let regexp = new RegExp(
      '.{' + (str.length - length) + ',' + str.length + '}'
    );
    return (
      str.substring(0, str.length - length) + str.replace(regexp, replacement)
    );
  }
};
export const PaymentTestData = [
  {
    title: replaceChars('s887765453433887', 10, true, '*'),
    subTitle: 'John Smith \nExpires 09/2022',
    type: 'credit',
    expires: 'Expires 09/2022',
    isDefault: true,
  },
  {
    title: replaceChars('s887765453433887', 10, true, '*'),
    subTitle: 'John Smith \nExpires 09/2022',
    type: 'credit',
    expires: 'Expires 09/2022',
    isDefault: false,
  },
  {
    title: replaceChars('s887765453433887', 10, true, '*'),
    subTitle: 'John Smith \nExpires 09/2022',
    type: 'credit',
    expires: 'Expires 09/2022',
    isDefault: false,
  },
];

export const MenuConfig = [
  {
    title: '1 Click Purchasing',
    icon: images.userPurchaseImage,
    textTip: "You haven't added a default \n purchase preference yet",
    subTextTip:
      'Select a default address and payment method to \n activate 1 click purchasing',
    needButton: true,
    btnMsg: 'ADD 1 CLICK PURCHASING PREFERENCES',
    selectedIcon: images.userPurchaseImage,
    screen: NoPurchase,
    key: 'Purchasing',
    onPress: (callback) => {
      NavigationService.navigate('OneClickPurchaseScreen', {
        callback,
      });
    },
  },
  {
    title: 'My Addresses',
    icon: images.userUAddressImage,
    selectedIcon: images.userAddressImage,
    key: 'Addresses',
    textTip: 'Your address list is empty',
    subTextTip: 'You haven´t add any personal address yet',
    needButton: true,
    btnMsg: 'ADD ADDRESS',
    onPress: (callback) => {
      NavigationService.navigate('AddNewAddressScreen', {
        callback,
        title: 'ADD NEW ADDRESS',
      });
    },
    extra: 'ADD NEW ADDRESS',
    itemActions: {
      setDefault: (item) => {},
      doEdit: (item) => {
        NavigationService.navigate('AddNewAddressScreen', {
          callback: (address) => {
            // setAddresses(testData);
          },
          title: 'EDIT ADDRESS',
          item,
        });
      },
      doDelete: (showRemoveSheet) => {
        showRemoveSheet();
      },
    },
  },
  {
    title: 'My Payment Methods',
    icon: images.userUPayImage,
    selectedIcon: images.userPayImage,
    key: 'Payment',
    textTip: "You haven't added any payment \n method yet",
    subTextTip:
      'Add a payment method to be able to use it in your next  purchases',
    needButton: true,
    btnMsg: 'ADD  NEW PAYMENT METHOD',
    onPress: (callback) => {
      NavigationService.navigate('AddPaymentMethodScreen', {
        callback,
      });
    },
    extra: 'ADD  NEW PAYMENT METHOD',
    itemActions: {
      setDefault: (item) => {},
      doEdit: (item) => {},
      doDelete: (item) => {},
    },
  },
  {
    title: 'My Billing Details',
    icon: images.userUBillingImage,
    selectedIcon: images.userBillingImage,
    key: 'Billing',
    textTip: 'You have not added \n billing details yet',
    subTextTip: 'Add your billing details to use in your next purchase',
    needButton: true,
    btnMsg: 'ADD BILLING DETAILS',
    onPress: (callback) => {
      NavigationService.navigate('AddBillingDetailsScreen', {
        callback,
        title: 'Please enter your billing details',
      });
    },
    extra: '',
    itemActions: {
      setDefault: (item) => {},
      doEdit: (item) => {},
      doDelete: (item) => {},
    },
  },
];
