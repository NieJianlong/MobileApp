# Slami Slice Mobile
## Requirements react-native newer version node, yarn
## Installs
- Local storage mock, needed for jest tests see  
 /__mocks__/@react-native-async-storage/async-storage.js  
run  
`react-native link @react-native-community/async-storage`  
this will update the android and ios modules with needed config  
- if ios LS issues check for this line in pod file  
` pod 'RNCAsyncStorage', :path => '../node_modules/@react-native-community/async-storage' `  
- if android LS issues check for these lines is settings.gradle  
`include ':@react-native-community_async-storage'
project(':@react-native-community_async-storage').projectDir = new File(rootProject.projectDir, '../node_modules/@react-native-community/async-storage/android')
include ':@react-native-community_async-storage'
project(':@react-native-community_async-storage').projectDir = new File(rootProject.projectDir, '../node_modules/@react-native-community/async-storage/android')`

- this project uses Apollo client v3+ see   App/Apollo/cache.js
- All components that include gql or state must be Functional components, this is a requirment of Apollo
- yarn install if depenency resolution issues
- see  __tests__/testInfo.txt for simple jest testing instructins
- see  /__tests__/api_tests.js for configuring Local Storage mocks

 