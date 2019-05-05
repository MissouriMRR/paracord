from paracord.controller import flights, frames, sessions
from paracord.serve import paracord


@paracord.errorhandler(404)
def not_found(error):
    return error, 404


paracord.register_blueprint(sessions)
paracord.register_blueprint(flights)
paracord.register_blueprint(frames)
