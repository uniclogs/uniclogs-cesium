# Uniclogs Cesium

[CesiumJS]-based web app to show where OreSats are.

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
- Goto `localhost:3000` in a web browser

[GDAL]:https://gdal.org
[GDAL Download]:https://gdal.org/download.html
[CesiumJS]:https://github.com/CesiumGS/cesium
