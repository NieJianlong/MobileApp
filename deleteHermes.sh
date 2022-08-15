#!/bin/bash
echo $PWD
# sed -i 's/hermes/jsc/g' app.json
# sed -i 's/import "expo-dev-client";//g' index.js


echo `sed -n 152p ./android/app/build.gradle`
