"""All served objects needed at beginning of app runtime"""
import logging
import os
import sys

from flask import Flask

import coloredlogs
from dotenv import load_dotenv
from playhouse.postgres_ext import PostgresqlExtDatabase

load_dotenv(dotenv_path='./.docker/web.env')

logger = logging.getLogger(__name__)
coloredlogs.install(level='DEBUG')

DB_NAME = os.getenv("DB_NAME")
DB_HOST = os.getenv("DB_HOST")
DB_USER = os.getenv("DB_USER")
DB_PASS = os.getenv("DB_PASS")

paracord = Flask(__name__)
paracord.config.from_object('config')

logger.debug("Attempting to connect to %s at %s:%s@%s:%d", DB_NAME, DB_USER,
             DB_PASS, DB_HOST, 5432)
db = PostgresqlExtDatabase(
    DB_NAME, host=DB_HOST, user=DB_USER, password=DB_PASS)
try:
    db.connect()
    logger.info("Established connection to database %s", DB_NAME)
except:
    logger.critical("Failed to connect to database %s", DB_NAME)
    sys.exit(1)
