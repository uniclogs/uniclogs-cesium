from argparse import ArgumentParser, Namespace
from .data import Data
from . import APP_NAME, APP_DESCRIPTION, APP_VERSION, SATELLITES, GROUND_STATIONS


def parse_args() -> Namespace:
    parser = ArgumentParser(prog=APP_NAME, description=APP_DESCRIPTION)
    parser.add_argument(
        '--version', '-v',
        dest='version',
        action='store_true',
        default=False,
        help='Print version.'
    )
    return parser.parse_args()

def main():
    args = parse_args()

    if args.version:
        print(f'{APP_NAME} v{APP_VERSION}: {APP_DESCRIPTION}')
        return

    data = Data.get_instance(SATELLITES, GROUND_STATIONS)

    app = Flask(__name__)
    CORS(app)
    app.run(debug=True)


if __name__ == "__main__":
    main()
