#!/usr/bin/env bash

rm -rf target
rm jsar.zip

bower install

mkdir target
mkdir target/webcomponentsjs
cp bower_components/webcomponentsjs/webcomponents-lite.js target/webcomponentsjs/webcomponents-lite.js
cp -r bower_components/polymer target

mkdir target/report
cp src/report/report.html target/report/report.html
cp src/report/report.js target/report/report.js
cp src/report/report-style.html target/report/report-style.html

mkdir target/environment
cp environment-${STAGE}/variables.json target/environment/variables.json

cp src/index.html target/index.html

cd target
zip -r jsar.zip .
cd ..
mv target/jsar.zip .