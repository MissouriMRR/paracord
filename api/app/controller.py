"""Interactions with users happen on these routes"""
import logging

from flask import Blueprint, jsonify, request, url_for
from playhouse.shortcuts import model_to_dict

from app.models import AirFrame, Flight, TestSession

logger = logging.getLogger(__name__)

sessions = Blueprint('sessions', __name__, url_prefix='/api/v1/sessions/')


@sessions.route('/', methods=['GET'])
def list_all_sessions():
    try:
        res = [model_to_dict(x, recurse=False) for x in TestSession.select()]
        return jsonify(res), 200
    except:
        return "", 404  # TODO


@sessions.route('/<sess_id>/', methods=['GET'])
def get_session(sess_id):
    try:
        res = model_to_dict(
            TestSession.get(TestSession.id == sess_id), recurse=False)
        return jsonify(res), 200
    except Exception as e:
        logger.error("ERROR: %s", str(e))
        return "", 404  # TODO Make error


@sessions.route('/', methods=['POST'])
def post_session():
    data = request.get_json()
    try:
        sess_id = TestSession.create(**data).id
        response = jsonify()
        response.status_code = 201
        response.headers['location'] = '/api/v1/sessions/' + str(sess_id)
        return response
    except Exception as e:
        logger.error("ERROR: %s", str(e))
        return "", 404


flights = Blueprint('flights', __name__, url_prefix='/api/v1/flights/')


@flights.route('/', methods=['GET'])
def list_all_flights():
    # TODO Remove
    res = [model_to_dict(x, recurse=False) for x in Flight.select()]
    return jsonify(res), 200


@flights.route('/<flight_id>/', methods=['GET'])
def get_flight(flight_id):
    try:
        res = model_to_dict(Flight.get(Flight.id == flight_id), recurse=False)
        return jsonify(res), 200
    except:
        return "", 400  # TODO Make explicit error


@flights.route('/', methods=['POST'])
def post_flight():
    data = request.get_json()
    try:
        flight_id = Flight.create(**data).id
        response = jsonify()
        response.status_code = 201
        response.headers['location'] = '/api/v1/flights/' + str(flight_id)
        return response
    except Exception as e:
        logger.error("ERROR: %s", str(e))
        return "", 404  # TODO smart errors


frames = Blueprint('frames', __name__, url_prefix='/api/v1/frames/')


@frames.route('/', methods=['GET'])
def list_all_frames():
    res = [model_to_dict(x, recurse=False) for x in AirFrame.select()]
    return jsonify(res), 200


@frames.route('/<frame_id>/', methods=['GET'])
def get_frame(frame_id):
    try:
        res = model_to_dict(
            AirFrame.get(AirFrame.id == frame_id), recurse=False)
        return jsonify(res), 200
    except:
        return "", 400  # TODO Make error


@frames.route('/', methods=['POST'])
def post_frame():
    data = request.get_json()
    try:
        frame_id = AirFrame.create(**data).id
        response = jsonify()
        response.status_code = 201
        response.headers['location'] = '/api/v1/frames/' + str(frame_id)
        return response
    except Exception as e:
        logger.error("ERROR: %s", str(e))
        return "", 404  # TODO smart errors


"""
@users.route('/<user_id>', methods=['PATCH'])
def update_user(user_id):
    # TODO: add auth that only allows this user id to access
    data = request.get_json()
    phone_number = data.get("phone_number")
    display_name = data.get("display_name")

    if phone_number is None and display_name is None:
        return "", 204
    elif phone_number is not None and display_name is None:
        query = User.update(phone_number=phone_number).where(
            User.id == user_id)
        query.execute()
    elif phone_number is None and display_name is not None:
        query = User.update(display_name=display_name).where(
            User.id == user_id)
        query.execute()
    elif phone_number is not None and display_name is not None:
        query = User.update(
            display_name=display_name,
            phone_number=phone_number).where(User.id == user_id)
        query.execute()
    # TODO: Some error checking
    return "", 204


@users.route('/<user_id>/chats', methods=['GET'])
def list_user_chats(user_id):
    chats = []
    raw_chats = Participation.select().where(Participation.user == user_id)
    for item in raw_chats:
        chat = Chat.get(Chat.id == item.chat)
        chats.append(model_to_dict(chat))
    return jsonify(chats), 200


@users.route('/<user_id>/updates', methods=['GET'])
def chat_updates(user_id):
    chats = []
    raw_chats = Participation.select().where(Participation.user == user_id)
    for item in raw_chats:
        events = item.chat.events
        updates = events[item.cursor:]
        if updates:
            chats.append({"chat": int(item.chat.id), "events": updates})
    return jsonify(chats), 200
"""
