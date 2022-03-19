import os
import requests
from datetime import datetime, timedelta

from flask import Flask, send_file
from flask_cors import CORS
from satellite_czml import satellite_czml

app = Flask(__name__)
CORS(app)

URL = 'https://celestrak.com/NORAD/elements/gp.php?INTDES=2022-026'
DATA_DIR = os.getenv('DATA_DIR', '../data')
ORESAT0 = 'OreSat0'


@app.route('/czml/<string:sat>.czml')
def get_sat_czml(sat: str):
    response = requests.get(URL)
    lines_raw = response.content.decode().split('\n')
    lines = [i.strip() for i in lines_raw]

    single_tle = [[ORESAT0, lines[7], lines[8]]]

    return satellite_czml(
        tle_list=single_tle,
        start_time=datetime.utcnow(),
        end_time=datetime.utcnow() + timedelta(days=3),
        ).get_czml()


@app.route('/tiles/<int:zoom>/<int:x>/<int:y>.png')
def get_tile(zoom: int, x: int, y: int):
    return send_file(DATA_DIR + f'/tiles/{zoom}/{x}/{y}.png')


if __name__ == '__main__':
    app.run()
