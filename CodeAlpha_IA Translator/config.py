import os
from dotenv import load_dotenv

# Charger les variables du fichier .env
load_dotenv()

class Config:
    # Base de données MySQL
    DB_HOST = os.getenv('DB_HOST')
    DB_USER = os.getenv('DB_USER')
    DB_PASSWORD = os.getenv('DB_PASSWORD')
    DB_NAME = os.getenv('DB_NAME')
    DB_PORT = int(os.getenv('DB_PORT', 3306))
    
    # LibreTranslate API
    LIBRETRANSLATE_URL = os.getenv('LIBRETRANSLATE_URL')
    
    # Flask
    SECRET_KEY = os.getenv('FLASK_SECRET_KEY')
    DEBUG = os.getenv('FLASK_DEBUG', 'False').lower() == 'true'