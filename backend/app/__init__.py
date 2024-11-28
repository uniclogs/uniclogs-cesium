import json
import os
from dataclasses import dataclass
from datetime import datetime, timedelta

import requests
from flask import Flask, send_file
from flask_cors import CORS
from satellite_czml import satellite_czml

ACTIVAE_SAT_URL = "https://celestrak.org/NORAD/elements/gp.php?GROUP=active&FORMAT=tle"
INTDES_URL_BASE = "https://celestrak.org/NORAD/elements/gp.php?INTDES="

DATA_DIR = os.getenv("DATA_DIR", "../data")


@dataclass
class SatelliteInfo:
    name: str
    norad_catalog_number: int
    international_designator: str


SATS = [
    # SatelliteInfo("ORESAT0", 52017, "2022-026"),
    SatelliteInfo("ORESAT0.5", 60525, "2024-149"),
]

dt = datetime.utcnow()
czml = None

app = Flask(__name__)
CORS(app)


def fetch_tles(url: str) -> dict[int, list[str]]:
    """Fetch the TLEs from URL"""
    response = requests.get(url)
    lines_raw = response.content.decode().split("\n")
    lines = [i.strip() for i in lines_raw]
    lines = lines[:-1]  # remove trailing empty line
    tles = {}
    for i in range(0, len(lines), 3):
        cat_num = int(lines[i + 1][1:7])
        tles[cat_num] = lines[i : i + 3]
    return tles


def get_czml():
    """Fetch the TLEs and make the CZML"""

    tle_list = []

    act_sats_tles = fetch_tles(ACTIVAE_SAT_URL)
    for sat in SATS:
        if sat.norad_catalog_number in act_sats_tles:
            tle_list.append(act_sats_tles[sat.norad_catalog_number])
        else:
            intdes_tles = fetch_tles(INTDES_URL_BASE + sat.international_designator)
            if sat.norad_catalog_number in intdes_tles:
                tle_list.append(intdes_tles[sat.norad_catalog_number])

    global dt
    dt = datetime.utcnow()

    global czml
    czml_raw = satellite_czml(
        tle_list=tle_list,
        start_time=dt,
        end_time=dt + timedelta(days=7),
        speed_multiplier=1,
    ).get_czml()

    # fix clock to be real time
    czml_json = json.loads(czml_raw)
    czml_json[0]["clock"]["step"] = "SYSTEM_CLOCK"
    czml = json.dumps(czml_json)


@app.route("/czml")
def get_sat_czml():

    # only update local czml only once a day, if fetched multiple times a day
    if not czml or datetime.utcnow() > dt + timedelta(days=1):
        get_czml()

    return czml


@app.route("/tiles/<int:zoom>/<int:x>/<int:y>.png")
def get_tile(zoom: int, x: int, y: int):

    return send_file(f"{DATA_DIR}/tiles/{zoom}/{x}/{y}.png")


if __name__ == "__main__":
    app.run()
