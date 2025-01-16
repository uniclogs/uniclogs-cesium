import os
import json
from flask_cors import CORS
from flask import Flask, send_file
from importlib.metadata import version
from .data import Data, GroundStation, Satellite

APP_NAME = "cesium-api"
APP_DESCRIPTION = "A supporting API for the CesiumJS App"
APP_VERSION = version(__name__)

DEFAULT_HOST = '0.0.0.0'
DEFAULT_PORT = 9000
DEFAULT_DATA_DIR = os.getenv("DATA_DIR", "../data")
DEFAULT_API_PREFIX = '/'

SATELLITES = [
    # Satellite('OreSat0', 52017, '2022-026'),
    Satellite("OreSat0.5", 60525, "2024-149"),
]

GROUND_STATIONS = [
    GroundStation("UniClOGS EB", 45.509054, -122.681394, 50, 0),
]
