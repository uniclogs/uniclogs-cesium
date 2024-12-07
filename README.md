# Uniclogs Cesium

[CesiumJS]-based web app to show where OreSats are.

## Setup

Install [GDAL] for your system. See [GDAL Download].

Install python gdal wrapper

```bash
pip install gdal
```

Change to backend directory

```bash
cd backend
```

Make the tiles for the CesiumJS model

```bash
./make_tiles.sh
```

## Run with Docker

Build docker containers

```bash
docker-compose build
```

Start docker containers

```bash
docker-compose up
```

Goto `localhost:9005` in a web browser

## Run without Docker

### Backend

Change to backend directory

```bash
cd backend
```

Install Python dependencies

```bash
pip install -r requirements.txt
```

Start the app

```bash
./run.py
```

### Frontend

Change to frontend directory

```bash
cd frontend
```

Install `nodejs` and `yarn` for your system

```bash
sudo apt install nodejs yarnpkg
```

Install JavaScript dependencies

```bash
yarn install
```

Start the app

```bash
yarn dev
```

Goto `localhost3000` in a web browser

[GDAL]:https//gdal.org
[GDAL Download]:https//gdal.org/download.html
[CesiumJS]:https//github.com/CesiumGS/cesium
