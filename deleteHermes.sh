#!/bin/bash
echo $PWD
# sed -i 's/hermes/jsc/g' app.json
# sed -i 's/import "expo-dev-client";//g' index.js


orig=`sed -n 152p ./android/app/build.gradle`
text=`echo $orig | sed "s/\([^0-9]*\)\([0-9]*\)/\1/"`;
num=`echo $orig | sed "s/\([^0-9]*\)\([0-9]*\)/\2/"`;
echo $text $num
export finalText=`echo $text$(($num + 1))`
echo $text $num $finalText
sed -i "" "s/versionCode 7/${finalText}/g" ./android/app/build.gradle
