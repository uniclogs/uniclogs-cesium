

docker:
	python -m pip wheel . -w build --no-deps
	docker compose build --build-arg VERSION=`grep -i 'version' pyproject.toml | cut -d'"' -f2`

hub:
	docker image tag backend-cesium-api oresat/cesium-api:latest
	docker image tag backend-cesium-api oresat/cesium-api:`grep -i 'version' pyproject.toml | cut -d'"' -f2`
	docker push --all-tags oresat/cesium-api

tiles:
	mkdir -p data
	wget https://eoimages.gsfc.nasa.gov/images/imagerecords/74000/74218/world.200412.3x21600x10800.png -O data/world.png
	gdal_translate -of GTiff -a_srs EPSG:4326 -a_ullr -180 90 180 -90 data/world.png data/world.tif
	gdal2tiles.py data/world.tif data/tiles -p geodetic --tmscompatible --process=4
	chmod 700 data
	chmod 600 data/*

clean:
	rm -rf build cesium_api.egg-info
	pyclean