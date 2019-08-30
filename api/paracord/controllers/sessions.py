import logging
from typing import Any, List

from flask import Blueprint, jsonify, request, url_for

from paracord.models import AirFrame, Flight, TestSession
from playhouse.shortcuts import model_to_dict

logger = logging.getLogger(__name__)

sessions = Blueprint('sessions', __name__, url_prefix='/api/v1/sessions/')

# COLLECTION SESSION


@sessions.route('/', methods=['GET'])
def list_all_sessions():
    """
    Lists all sessions
    """
    try:
        res: List[dict] = [
            model_to_dict(x, recurse=False) for x in TestSession.select()
        ]
        return jsonify(res), 200
    except Exception as e:
        logger.error("ERROR: %s", str(e))
        return "", 404  # TODO


@sessions.route('/', methods=['POST'])
def post_session():
    """
    Creates a new session
    """
    try:
        data: dict = request.get_json()
        sess: dict = model_to_dict(TestSession.create(**data), recurse=False)
        response: Any = jsonify(sess)
        response.status_code = 200
        response.headers['location'] = '/api/v1/sessions/' + str(sess["id"])
        return response
    except Exception as e:
        logger.error("ERROR: %s", str(e))
        return "", 404


# SPECIFIC SESSION


@sessions.route('/<sess_id>', methods=['GET'])
def show_session(sess_id):
    """
    Gets information about specific session
    """
    try:
        res: dict = model_to_dict(
            TestSession.get(TestSession.id == sess_id), recurse=False)
        return jsonify(res), 200
    except Exception as e:
        logger.error("ERROR: %s", str(e))
        return "", 404  # TODO Make error


@sessions.route('/<sess_id>', methods=['PATCH'])
def update_session(sess_id):
    """
    Modify information about specific session
    """
    try:
        data: dict = request.get_json()
        query = TestSession.update(**data).where(TestSession.id == sess_id)
        query.execute()
        return "", 200
    except Exception as e:
        logger.error("ERROR: %s", str(e))
        return "", 404  # TODO Make error


@sessions.route('/<sess_id>', methods=['DELETE'])
def delete_session(sess_id):
    """
    Delete specific session
    """
    try:
        sess = TestSession.get(TestSession.id == sess_id)
        sess.delete_instance(recursive=True)
        return "", 200
    except Exception as e:
        logger.error("ERROR: %s", str(e))
        return "", 404  # TODO Make error


# SPECIFIC SESSION COLLECTION FLIGHT


@sessions.route('/<sess_id>/flights', methods=['GET'])
def list_session_flights(sess_id):
    try:
        res: List[dict] = [
            model_to_dict(x, recurse=False)
            for x in Flight.select().where(Flight.session == sess_id)
        ]
        if res:
            return jsonify(res), 200
        else:
            raise Exception()
    except Exception as e:
        logger.error("ERROR: %s", str(e))
        return "", 404


@sessions.route('/<sess_id>/flights', methods=['POST'])
def post_flight(sess_id):
    try:
        data: dict = request.get_json()
        flight: dict = model_to_dict(
            Flight.create(session=sess_id, **data), recurse=False)
        response = jsonify(flight)
        response.status_code = 200
        response.headers[
            'location'] = '/api/v1/sessions/<sess_id>/flights/' + str(
                flight["id"])
        return response
    except Exception as e:
        logger.error("ERROR: %s", str(e))
        return "", 404  # TODO smart errors


# SPECIFIC SESSION SPECIFIC FLIGHT


@sessions.route('/<sess_id>/flights/<flight_id>', methods=['GET'])
def show_flight(sess_id, flight_id):
    try:
        res: dict = model_to_dict(
            Flight.get(Flight.id == flight_id), recurse=False)
        return jsonify(res), 200
    except Exception as e:
        logger.error("ERROR: %s", str(e))
        return "", 400  # TODO Make explicit error


@sessions.route('/<sess_id>/flights/<flight_id>', methods=['PATCH'])
def update_flight(sess_id, flight_id):
    try:
        data: dict = request.get_json()
        query = Flight.update(**data).where(Flight.id == flight_id)
        query.execute()
        return "", 200
    except Exception as e:
        logger.error("ERROR: %s", str(e))
        return "", 400  # TODO Make explicit error


@sessions.route('/<sess_id>/flights/<flight_id>', methods=['DELETE'])
def delete_flight(sess_id, flight_id):
    try:
        flight = Flight.get(Flight.id == flight_id)
        flight.delete_instance()
        return "", 200
    except Exception as e:
        logger.error("ERROR: %s", str(e))
        return "", 400  # TODO Make explicit error
