from playhouse.postgres_ext import PrimaryKeyField, TextField

from .BaseModel import BaseModel


class AirFrame(BaseModel):
    id = PrimaryKeyField()
    name = TextField()
