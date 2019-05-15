import logging
from typing import List

from flask import Blueprint, jsonify, request
from playhouse.shortcuts import model_to_dict

from paracord.models import AirFrame

logger = logging.getLogger(__name__)

frames = Blueprint('frames', __name__, url_prefix='/api/v1/frames/')

# COLLECTION FRAME


@frames.route('/', methods=['GET'])
def list_all_frames():
    try:
        res: List[dict] = [
            model_to_dict(x, recurse=False) for x in AirFrame.select()
        ]
        return jsonify(res), 200
    except Exception as e:
        logger.error("ERROR: %s", str(e))
        return "", 400


@frames.route('/', methods=['POST'])
def create_frame():
    try:
        data: dict = request.get_json()
        frame_id: int = AirFrame.create(**data).id
        response = jsonify()
        response.status_code = 201
        response.headers['location'] = '/api/v1/frames/' + str(frame_id)
        return response
    except Exception as e:
        logger.error("ERROR: %s", str(e))
        return "", 404  # TODO smart errors


# SPECIFIC FRAME


@frames.route('/<frame_id>', methods=['GET'])
def show_frame(frame_id):
    try:
        res: dict = model_to_dict(
            AirFrame.get(AirFrame.id == frame_id), recurse=False)
        return jsonify(res), 200
    except Exception as e:
        logger.error("ERROR: %s", str(e))
        return "", 404  # TODO Make error


@frames.route('/<frame_id>', methods=['PATCH'])
def update_frame(frame_id):
    try:
        data: dict = request.get_json()
        query = AirFrame.update(**data).where(AirFrame.id == frame_id)
        query.execute()
        return "", 200
    except Exception as e:
        logger.error("ERROR: %s", str(e))
        return "", 404  # TODO Make error


@frames.route('/<frame_id>', methods=['DELETE'])
def delete_frame(frame_id):
    try:
        frame = AirFrame.get(AirFrame.id == frame_id)
        frame.delete_instance(recursive=True)
        return "", 200
    except Exception as e:
        logger.error("ERROR: %s", str(e))
        return "", 404  # TODO Make error
