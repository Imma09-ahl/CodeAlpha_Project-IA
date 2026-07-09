from flask import Blueprint, render_template

# Créer le blueprint principal
main_bp = Blueprint('main', __name__)

@main_bp.route('/')
def index():
    return render_template('index.html')