#!/bin/bash

mkdir -p dist/website/{css,src,assets,images}

npm run build
cp *.html dist/website/
cp *.svg dist/website/
cp favicon.ico  dist/website/
cp css/*.css dist/website/css/
cp src/*.js dist/website/src/
cp assets/*.glb dist/website/assets/
cp images/* dist/website/images/

(cd dist; tar zcvf website.tar.gz website)
