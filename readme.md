# Slami Slice Mobile

## Requirements react-native newer version node, yarn

## Installs

- Local storage mock, needed for jest tests see  
   /**mocks**/@react-native-async-storage/async-storage.js  
  run  
  `react-native link @react-native-community/async-storage`  
  this will update the android and ios modules with needed config
- if ios LS issues check for this line in pod file  
  `pod 'RNCAsyncStorage', :path => '../node_modules/@react-native-community/async-storage'`
- if android LS issues check for these lines is settings.gradle  
  `include ':@react-native-community_async-storage' project(':@react-native-community_async-storage').projectDir = new File(rootProject.projectDir, '../node_modules/@react-native-community/async-storage/android') include ':@react-native-community_async-storage' project(':@react-native-community_async-storage').projectDir = new File(rootProject.projectDir, '../node_modules/@react-native-community/async-storage/android')`

- this project uses Apollo client v3+ see App/Apollo/cache.js
- All components that include gql or state must be Functional components, this is a requirment of Apollo
- yarn install if depenency resolution issues
- see **tests**/testInfo.txt for simple jest testing instructins
- see /**tests**/api_tests.js for configuring Local Storage mocks

## Production Build Android

### development only

### we will have 2 keystores dev and production, so we set them up secure somewhere and exclude from git

### then we copy them into the android/app for a dev or deploy to production build

Step 1
keytool -genkey -v -keystore salami.keystore -alias salami -keyalg RSA -keysize 2048 -validity 10000
// password must be 6 chars
salami6
// whatever you want for remaining keytool options

Step 2
copy dev keystore to android/app

Step 3
app\build.gradle config
signingConfigs ....
release {
keyAlias 'salami'
keyPassword 'salami'
storeFile file("salami.keystore")
storePassword 'salami'
}

buildTypes ...
release {
...
signingConfig signingConfigs.release
...

Step 4
if your mergeReleaseResources task is failing then you need to delete all the drawable-xxx and res from  
MobileApp/android/app/src/main/res  
seems crazy I know
then ./gradlew clean

Step 5
cd android
./gradlew assembleRelease

APK at android/app/build/outputs/apk/app-release.apk.

## Production Build IOS (xcode)

terminal 1
npx react-native start
npx react-native start > ~/temp.log
tail -f temp.log | grep --line-buffered LOG

terminal 2
npx react-native run-android

cd ~/Downloads/genymotion/
./genymotion

npx react-native start --port=5555
npx react-native run-android --port=5555

get-graphql-schema https://stage-api.salamislicing.in/pm/graphql > ./App/schemas/schemaPM.graphql

get-graphql-schema https://stage-api.salamislicing.in/um/graphql > ./App/schemas/schemaUM.graphql

get-graphql-schema https://stage-api.salamislicing.in/om/graphql > ./App/schemas/schemaOM.graphql

get-graphql-schema https://stage-api.salamislicing.in/pay/graphql > ./App/schemas/schemaPayM.graphql
