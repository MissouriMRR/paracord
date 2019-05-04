"""Stores info for a group chat"""
from datetime import datetime

from playhouse.postgres_ext import (BooleanField, DateTimeField,
                                    ForeignKeyField, JSONField,
                                    PrimaryKeyField, TextField)

from .AirFrame import AirFrame
from .BaseModel import BaseModel


class TestSession(BaseModel):
    id = PrimaryKeyField()
    preparer = TextField()  # Liable for the days flights
    location = TextField()  # Where did the flight tests occur
    air_frame = ForeignKeyField(AirFrame)  # Which drone is flying
    airspace_notified = BooleanField(null=True)  # FCC Approval
    test_purpose = TextField()  # Why are you flying
    start_time = DateTimeField(
        default=datetime.now)  # When did the tests begin
    end_time = DateTimeField()  # When did tests conclude
    pilot = TextField()  # Who is on the stick
    pilot_in_command = TextField()  # ?
    part_107 = TextField(null=True)  # FCC Approval
    weather = TextField()
    terrain = TextField()
    populated_area = BooleanField()  # Is the area populated
    other_hazards = TextField(null=True)

    pf_visual_frame = BooleanField()
    pf_visual_motors = BooleanField()
    pf_visual_props = BooleanField()
    pf_visual_batteries = BooleanField()
    pf_visual_sensors = BooleanField()

    pf_systems_ground_control = BooleanField()
    pf_systems_range_finder = BooleanField()
    pf_systems_optical_flow = BooleanField()
    pf_systems_onboard_cpu = BooleanField()
    pf_systems_flight_board = BooleanField()
    pf_systems_voltage_alarm = BooleanField()
    pf_systems_failsafe = BooleanField()
