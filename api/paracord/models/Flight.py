from datetime import datetime

from playhouse.postgres_ext import (BooleanField, DateTimeField,
                                    ForeignKeyField, PrimaryKeyField,
                                    TextField)

from .BaseModel import BaseModel
from .TestSession import TestSession


class Flight(BaseModel):
    id = PrimaryKeyField()
    start_time = DateTimeField()
    end_time = DateTimeField(default=datetime.now())
    description = TextField()
    success = BooleanField()
    outcome = TextField()
    session = ForeignKeyField(TestSession)
