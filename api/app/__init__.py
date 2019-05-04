from app.controller import flights, frames, sessions
from app.serve import app


@app.errorhandler(404)
def not_found(error):
    return error, 404


app.register_blueprint(sessions)
app.register_blueprint(flights)
app.register_blueprint(frames)
