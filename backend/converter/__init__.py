from flask import Flask
from .views import views
from flask_cors import CORS

# CORS(app)
class create_app():
    def create_app():
        app=Flask(__name__)
        CORS(app)
        app.register_blueprint(views,url_prefix="/")
        return app