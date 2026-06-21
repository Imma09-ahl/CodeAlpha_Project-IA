from flask import Blueprint, render_template, request, jsonify
import requests
from config import Config
from models.translation_model import save_translation, get_translation_history
from models.language_model import get_all_languages

translation_bp = Blueprint('translation', __name__)

@translation_bp.route('/translate')
def translate_page():
    languages = get_all_languages()
    return render_template('translate.html', languages=languages)

@translation_bp.route('/api/translate', methods=['POST'])
def translate():
    data = request.get_json()
    source_text = data.get('source_text')
    source_lang = data.get('source_lang')
    target_lang = data.get('target_lang')

    try:
        response = requests.post(
            f"{Config.LIBRETRANSLATE_URL}/translate",
            json={
                "q": source_text,
                "source": source_lang,
                "target": target_lang,
                "format": "text"
            }
        )
        result = response.json()
        translated_text = result.get('translatedText', '')
        save_translation(source_text, translated_text, source_lang, target_lang)
        return jsonify({
            'success': True,
            'translated_text': translated_text
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@translation_bp.route('/api/languages')
def get_languages():
    try:
        response = requests.get(f"{Config.LIBRETRANSLATE_URL}/languages")
        return jsonify(response.json())
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@translation_bp.route('/api/history')
def history():
    translations = get_translation_history()
    return jsonify(translations)