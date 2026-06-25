from flask import Blueprint, render_template, request, jsonify
import requests
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
        response = requests.get(
            'https://api.mymemory.translated.net/get',
            params={
                'q': source_text,
                'langpair': f'{source_lang}|{target_lang}'
            }
        )
        result = response.json()
        translated_text = result['responseData']['translatedText']
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
    languages = [
        {"code": "fr", "name": "Français"},
        {"code": "en", "name": "Anglais"},
        {"code": "es", "name": "Espagnol"},
        {"code": "de", "name": "Allemand"},
        {"code": "it", "name": "Italien"},
        {"code": "pt", "name": "Portugais"},
        {"code": "ar", "name": "Arabe"},
        {"code": "zh", "name": "Chinois"},
        {"code": "ja", "name": "Japonais"},
        {"code": "ru", "name": "Russe"},
        {"code": "nl", "name": "Néerlandais"},
        {"code": "pl", "name": "Polonais"},
        {"code": "tr", "name": "Turc"},
        {"code": "ko", "name": "Coréen"},
        {"code": "sv", "name": "Suédois"},
        {"code": "da", "name": "Danois"},
        {"code": "fi", "name": "Finnois"},
        {"code": "el", "name": "Grec"},
        {"code": "he", "name": "Hébreu"},
        {"code": "hi", "name": "Hindi"}
    ]
    return jsonify(languages)

@translation_bp.route('/api/history')
def history():
    translations = get_translation_history()
    return jsonify(translations)
@translation_bp.route('/api/history/clear', methods=['DELETE'])
def clear_history():
    try:
        from models.translation_model import clear_all_translations
        clear_all_translations()
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500