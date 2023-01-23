import os
import json
from datetime import datetime, timedelta

import requests
from flask import Flask, send_file
from flask_cors import CORS
from satellite_czml import satellite_czml

URL = 'https://celestrak.org/NORAD/elements/gp.php?GROUP=active&FORMAT=tle'
DATA_DIR = os.getenv('DATA_DIR', '../data')
SATS = ['ORESAT0']


dt = datetime.utcnow()
czml = None

app = Flask(__name__)
CORS(app)


def get_czml():
    '''Fetch the TLE and make the CZML'''

    response = requests.get(URL)
    lines_raw = response.content.decode().split('\n')
    lines = [i.strip() for i in lines_raw]

    tle_list = []

    for name in SATS:
        index = -1
        for line in lines:
            if name.upper() == line:
                index = lines.index(line)
                tle_list.append(lines[index:index + 3])
                break

    global dt
    dt = datetime.utcnow()

    global czml
    czml_raw = satellite_czml(
        tle_list=tle_list,
        start_time=dt,
        end_time=dt + timedelta(days=3),
        speed_multiplier=1
    ).get_czml()

    # fix clock to be real time
    czml_json = json.loads(czml_raw)
    czml_json[0]['clock']['step'] = 'SYSTEM_CLOCK'
    czml = json.dumps(czml_json)


@app.route('/czml')
def get_sat_czml():

    # only update local czml only once a day, if fetched multiple times a day
    if not czml or datetime.utcnow() > dt + timedelta(days=1):
        get_czml()

    return czml


@app.route('/tiles/<int:zoom>/<int:x>/<int:y>.png')
def get_tile(zoom: int, x: int, y: int):

    return send_file(f'{DATA_DIR}/tiles/{zoom}/{x}/{y}.png')


if __name__ == '__main__':
    app.run()
