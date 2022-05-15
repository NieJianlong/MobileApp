![image.png](https://upload-images.jianshu.io/upload_images/9126595-ad81fa4368f7342c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
this page used endpoints:
if current buyer is loged in buyer,we will call this one:

```
  mutation CreateAddress($request: AddressRequestForCreate!) {
    createAddress(request: $request) {
      addressId
      flat
      floor
      defaultAddress
      block
      building
      houseNumber
      streetAddress1
      streetAddress2
      streetAddress3
      townCity
      villageArea
      district
      provinceState
      country
      areaCode
      landMark
      pinCode
      addressType
      referenceId
      createdAt
      updatedAt
    }
  }
```

else:

```
  mutation CreateAddressForGuestBuyer($request: AddressRequestForCreate!) {
    createAddressForGuestBuyer(request: $request) {
      addressId
      flat
      floor
      defaultAddress
      block
      building
      houseNumber
      streetAddress1
      streetAddress2
      streetAddress3
      townCity
      villageArea
      district
      provinceState
      country
      areaCode
      landMark
      pinCode
      addressType
      referenceId
      createdAt
      updatedAt
    }
  }
```

![image.png](https://upload-images.jianshu.io/upload_images/9126595-c53d9600446036a4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
when user click "CONTINUE AS GUEST"
we will call:

```
  mutation CreateGuestBuyer($request: BuyerProfileRequestForCreate!) {
    createGuestBuyer(request: $request) {
      buyerId
      userName
      firstName
      lastName
      email
      phoneNumber
      userType
      createdAt
      updatedAt
      oneClickPurchaseOn
      guestBuyer
      geoLocation
      country
      languages
      currencies
      applicationSettings
      paymentOptions
    }
  }
```

![fc cd](https://upload-images.jianshu.io/upload_images/9126595-30f42bed92369187.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```
mutation RegisterBuyer($request: BuyerProfileRequestForCreate!) {
  registerBuyer(request: $request) {
    buyerId
    userId
  }
}
```

if user register successfully,we should use username and user password to get accesstoken,
![image.png](https://upload-images.jianshu.io/upload_images/9126595-7e132ce6af7c23ac.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```
mutation ValidateCode($request: ValidateCodeRequest!) {
  validateCode(request: $request) {
    status
    message
  }
}
```

if user click "i dont receive a code",we will call:

```
mutation SendOTPCode($sendCodeRequest: SendCodeRequest!) {
  sendOTPCode(sendCodeRequest: $sendCodeRequest) {
    status
    message
  }
}
```

![image.png](https://upload-images.jianshu.io/upload_images/9126595-39d5dae2f803e7ae.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```
mutation ForgotPasswordStep1SendNotificationEmail($email: String!) {
  forgotPasswordStep1SendNotificationEmail(email: $email) {
    email
    phoneNumber
    message
  }
}
```

```
mutation ForgotPasswordStep1SendNotificationSms($sms: String!) {
  forgotPasswordStep1SendNotificationSms(sms: $sms) {
    email
    phoneNumber
    message
  }
}
```

![image.png](https://upload-images.jianshu.io/upload_images/9126595-0d1c2d0efe6ce4cf.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```
mutation ForgotPasswordStep2VerifyTokenSms($sms: String!, $tokenCode: String) {
  forgotPasswordStep2VerifyTokenSms(sms: $sms, tokenCode: $tokenCode) {
    message
    actionToken
  }
}
```

```
 mutation forgotPasswordStep2VerifyTokenEmail(
    $email: String!
    $tokenCode: String
  ) {
    forgotPasswordStep2VerifyTokenEmail(email: $email, tokenCode: $tokenCode) {
      message
      actionToken
    }
  }
```

```

  mutation forgotPasswordStep3ChangeByEmail(
    $actionTokenValue: String!
    $newPassword: String!
    $confirmPassword: String!
  ) {
    forgotPasswordStep3ChangeByEmail(
      actionTokenValue: $actionTokenValue
      newPassword: $newPassword
      confirmPassword: $confirmPassword
    ) {
      message
    }
```

```
mutation ForgotPasswordStep3ChangeBySms(
  $actionTokenValue: String!
  $newPassword: String!
  $confirmPassword: String!
) {
  forgotPasswordStep3ChangeBySms(
    actionTokenValue: $actionTokenValue
    newPassword: $newPassword
    confirmPassword: $confirmPassword
  ) {
    message
  }
}
```
