from datetime import datetime

from playhouse.postgres_ext import (BooleanField, CharField, ForeignKeyField,
                                    PrimaryKeyField, TimeField)

from .BaseModel import BaseModel
from .TestSession import TestSession


class Flight(BaseModel):
    id = PrimaryKeyField()
    start_time = TimeField()
    end_time = TimeField(default=datetime.now())
    description = CharField()
    success = BooleanField()
    outcome = CharField()
    session = ForeignKeyField(TestSession)
