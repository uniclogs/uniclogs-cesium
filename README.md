# Uniclogs Cesium

Cesium-based app to show where OreSat0 currently is.

## Backend

- `$ cd backend`
- Install [GDAL] for your system. See [GDAL Download].
- Install dependencies: `$ pip install -r Backend/requirements.txt`
- Make tiles: `$ ./backend/make_tiles.sh`
- Run: `$ flask run`

## Frontend

- `$ cd frontend`
- Install `yarn` for your system
- Install dependencies: `$ yarn install`
- Run: `$ yarn dev`
- Goto `localhost:9000` in a web browser

[GDAL]:https://gdal.org
[GDAL Download]:https://gdal.org/download.html
