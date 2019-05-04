"""Runs the server"""
import argparse
import logging

from app import app

DEFAULT_HOST: str = "localhost"
DEFAULT_PORT: int = 3000

logger = logging.getLogger(__name__)


def main() -> None:
    parser = argparse.ArgumentParser(
        description="paracord, MissouriMRR's flight logger")
    parser.add_argument('--host', type=str)
    parser.add_argument('--port', type=int)
    args = parser.parse_args()
    host: str = args.host or DEFAULT_HOST
    port: int = args.port or DEFAULT_PORT

    app.run(host=host, port=port, use_reloader=False)
    logger.info("Starting server on %s:%d", host, port)


if __name__ == "__main__":
    main()
