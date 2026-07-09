from flask import Flask
from flask_cors import CORS
from config import Config
from routes.main_routes import main_bp
from routes.chatbot_routes import chatbot_bp

def create_app():
    app = Flask(__name__)
    app.secret_key = Config.SECRET_KEY

    # Activer CORS
    CORS(app)

    # Enregistrer les blueprints
    app.register_blueprint(main_bp)
    app.register_blueprint(chatbot_bp)

    return app

app = create_app()