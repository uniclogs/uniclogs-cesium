#!/bin/bash -e

URL=https://eoimages.gsfc.nasa.gov/images/imagerecords/74000/74218/world.200412.3x21600x10800.png

mkdir -p data

#wget $URL -O data/world.png

gdal_translate -of GTiff -a_srs EPSG:4326 -a_ullr -180 90 180 -90 data/world.png data/world.tif

gdal2tiles.py data/world.tif data/tiles -p geodetic --tmscompatible --process=4
