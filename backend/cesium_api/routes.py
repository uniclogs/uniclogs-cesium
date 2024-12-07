@app.route("/czml")
def get_czml():
    return data.czml


@app.route("/tiles/<int:zoom>/<int:x>/<int:y>.png")
def get_tile(zoom: int, x: int, y: int):
    return send_file(f"{DATA_DIR}/tiles/{zoom}/{x}/{y}.png")


@app.route("/sat")
def get_sat_names():
    return json.dumps([s.name for s in SATELLITES])


@app.route("/sat/<name>")
def get_sat_info(name: str):
    return SATELLITES[name].to_json()


@app.route("/gs")
def get_gs_names():
    return json.dumps([gs.name for gs in GROUND_STATIONS])


@app.route("/gs/<name>")
def get_gs_info(name: str):
    return GROUND_STATIONS[name].to_json()


@app.route("/passes/<gs>/<sat>")
def get_passes(gs: str, sat: str):
    passes = {}
    try:
        passes = json.dumps([p.to_dict() for p in data.passes[gs][sat]])
    except Exception:
        pass
    return passes