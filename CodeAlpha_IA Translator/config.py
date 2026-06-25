import os
from dotenv import load_dotenv

# Charger les variables du fichier .env
load_dotenv()

class Config:
    # Base de données MySQL
    DB_HOST = os.getenv('DB_HOST', 'localhost')
    DB_USER = os.getenv('DB_USER', 'root')
    DB_PASSWORD = os.getenv('DB_PASSWORD', '')
    DB_NAME = os.getenv('DB_NAME', 'codealpha_translator')
    DB_PORT = int(os.getenv('DB_PORT', 3306))
    
    # LibreTranslate API
    LIBRETRANSLATE_URL = os.getenv('LIBRETRANSLATE_URL', 'https://libretranslate.com')
    
    # Flask
    SECRET_KEY = os.getenv('FLASK_SECRET_KEY', 'dev-secret-key-change-in-production')
    DEBUG = os.getenv('FLASK_DEBUG', 'True').lower() == 'true'