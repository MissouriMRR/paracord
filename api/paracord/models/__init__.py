"""All models for the application are exported here"""
from .AirFrame import AirFrame
from .Flight import Flight
from .TestSession import TestSession

tables = [AirFrame, TestSession, Flight]