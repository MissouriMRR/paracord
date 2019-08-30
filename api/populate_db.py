from datetime import datetime, timedelta
from random import randint
from typing import List

import requests

URL_HOSTNAME: str = "192.168.99.100" # If you are using Docker Toolbox, use '192.168.99.100' otherwise use 'localhost' 
URL_BASE: str = "http://"+URL_HOSTNAME+"/api/v1/"
words: List[str] = []

NUM_FRAMES: int = 10
NUM_SESSIONS: int = 20
NUM_FLIGHTS: int = 50

with open("./words.txt") as wlist:
    for line in wlist:
        words.append(line[:-1])


def rword():
    return words[randint(0, len(words))]


# Add frames
for _ in range(NUM_FRAMES):
    resp = requests.post(URL_BASE + "frames/", json={"name": rword()})

# Add sessions
for i in range(NUM_SESSIONS):
    resp = requests.post(
        URL_BASE + "sessions/",
        json={
            "air_frame": i,
            "end_time": str(datetime.now()),
            "location": rword(),
            "pf_systems_failsafe": True,
            "pf_systems_flight_board": True,
            "pf_systems_ground_control": True,
            "pf_systems_onboard_cpu": True,
            "pf_systems_optical_flow": True,
            "pf_systems_range_finder": True,
            "pf_systems_voltage_alarm": True,
            "pf_visual_batteries": True,
            "pf_visual_frame": True,
            "pf_visual_motors": True,
            "pf_visual_props": True,
            "pf_visual_sensors": True,
            "pilot": rword(),
            "pilot_in_command": rword(),
            "populated_area": False,
            "preparer": rword(),
            "start_time":
            str(datetime.now() + timedelta(minutes=randint(1, 30))),
            "terrain": rword(),
            "test_purpose": rword(),
            "weather": rword()
        })

for i in range(NUM_FLIGHTS):
    resp = requests.post(
        URL_BASE + "sessions/" + str(i % NUM_SESSIONS) + "/flights",
        json={
            "start_time": str(datetime.now()),
            "end_time":
            str(datetime.now() + timedelta(minutes=randint(1, 30))),
            "description": " ".join([rword() for _ in range(randint(6, 30))]),
            "success": True,
            "outcome": " ".join([rword() for _ in range(randint(6, 17))])
        })
