#!/bin/bash
echo $PWD
# sed -i 's/hermes/jsc/g' app.json
# sed -i 's/import "expo-dev-client";//g' index.js


orig=`sed -n 1p ./App/updates.ts`
text=`echo $orig | sed "s/\([^0-9]*\)\([0-9]*\)/\1/"`;
text1=`echo $text | sed "s/;//g"`;
echo $text1
num=`echo $orig | sed "s/\([^0-9]*\)\([0-9]*\)/\2/"`;
num1=`echo $num | sed "s/;//g"`;
echo $num1
export finalText=`echo $text1$(($num1 + 1))`
echo $text1 $num1 $finalText
sed -i "" "s/${num1}/$(($num1 + 1))/g" ./App/updates.ts
