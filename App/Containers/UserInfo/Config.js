import NavigationService from '../../Navigation/NavigationService';
import images from '../../Themes/Images';
import NoPurchase from './NoPurchase';

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

 export const MenuConfig = [
    {
      title: '1 Click Purchasing',
      icon: images.userPurchaseImage,
      selectedIcon: images.userPurchaseImage,
      screen: NoPurchase,
      key: 'Purchasing',
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
          title:"ADD NEW ADDRESS"
        });
      },
      extra: "ADD NEW ADDRESS",
      itemActions: {
        setDefault: (item) => { },
        doEdit: (item) => {
          NavigationService.navigate('AddNewAddressScreen', {
            callback: (address) => {
              // setAddresses(testData);
            },
            title:"EDIT ADDRESS",
            item,
          });
        },
        doDelete: (item) => { }
      }
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
          callback
        });
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
      onPress: () => { },
    },
  ];