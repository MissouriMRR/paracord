from datetime import datetime, timedelta
from random import choice, randint
from typing import List

import requests

URL_HOSTNAME: str = "192.168.99.100" # If you are using Docker Toolbox, use '192.168.99.100' otherwise use 'localhost' 
URL_BASE: str = "http://"+URL_HOSTNAME+"/api/v1/"
words: List[str] = []

NUM_FLIGHTS_PER: int = 4


def make_frame(name: str) -> dict:
    return requests.post(URL_BASE + "frames/", json={"name": name}).json()


def make_session(frame_id: int, start_time: datetime, purpose: str) -> dict:
    return requests.post(
        URL_BASE + "sessions/",
        json={
            "air_frame": frame_id,
            "end_time": str(start_time + timedelta(minutes=randint(1, 30))),
            "location": "backroom",
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
            "pilot": "Peter",
            "pilot_in_command": "Clay",
            "populated_area": False,
            "preparer": "Nobody",
            "start_time": str(start_time),
            "terrain": "concrete",
            "test_purpose": purpose,
            "weather": "N/A"
        }).json()


def make_flight(session_id: int, start_time: datetime) -> dict:
    return requests.post(
        f"{URL_BASE}sessions/{session_id}/flights",
        json={
            "start_time": str(start_time),
            "end_time": str(start_time + timedelta(minutes=randint(1, 30))),
            "description": "doing stuff",
            "success": True,
            "outcome": "we did it"
        }).json()


def main():
    frames: List[dict] = []
    # Add frames
    for name in [
            "Michelangelo", "Raphael", "Donatello", "Leonardo", "Splinter"
    ]:
        new_frame: dict = make_frame(name)
        frames.append(new_frame)
        print(f"Frame {name}: {new_frame['id']}")

    sessions: List[dict] = []
    # Add sessions
    for purpose in ["to fly", "to scream", "to whine"]:
        frame_id: int = choice(frames)["id"]
        start_time: datetime = datetime.now()
        new_sess: dict = make_session(frame_id, start_time, purpose)
        sessions.append(new_sess)
        print(f"Session for {purpose}: {new_sess['id']}")

    flights: List[dict] = []
    for session in sessions:
        session_id: int = session["id"]
        for i in range(NUM_FLIGHTS_PER):
            start_time: datetime = datetime.now()
            new_flight: dict = make_flight(session_id, start_time)
            flights.append(new_flight)
            print(f"Flight {i} for Session {session_id}: {new_flight['id']}")


if __name__ == "__main__":
    main()
