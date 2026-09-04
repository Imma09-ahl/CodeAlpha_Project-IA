import logging
from flask import Blueprint, render_template, request, jsonify
from services.translation_service import translate_text
from models.translation_model import save_translation, get_translation_history
from models.language_model import get_all_languages

logger = logging.getLogger(__name__)

translation_bp = Blueprint('translation', __name__)

@translation_bp.route('/translate')
def translate_page():
    languages = []
    try:
        languages = get_all_languages()
    except Exception as e:
        logger.warning(f"Impossible de récupérer les langues depuis la base de données : {e}")
    return render_template('translate.html', languages=languages)

@translation_bp.route('/api/translate', methods=['POST'])
def translate():
    data = request.get_json() or {}
    source_text = data.get('source_text', '').strip()
    source_lang = data.get('source_lang', 'auto')
    target_lang = data.get('target_lang', 'en')

    if not source_text:
        return jsonify({
            'success': False,
            'error': 'Le texte source ne peut pas être vide.'
        }), 400

    try:
        translated_text, detected_lang = translate_text(source_text, source_lang, target_lang)

        # Enregistrement en base de données non-bloquant
        try:
            effective_src = detected_lang if source_lang == 'auto' else source_lang
            save_translation(source_text, translated_text, effective_src, target_lang)
        except Exception as db_err:
            logger.warning(f"Erreur non-bloquante lors de la sauvegarde MySQL : {db_err}")

        return jsonify({
            'success': True,
            'translated_text': translated_text,
            'detected_lang': detected_lang
        })
    except Exception as e:
        logger.error(f"Erreur lors de la traduction : {e}")
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
    try:
        translations = get_translation_history()
        return jsonify(translations)
    except Exception as e:
        logger.warning(f"Erreur lors de la récupération de l'historique : {e}")
        return jsonify([])

@translation_bp.route('/api/history/clear', methods=['DELETE'])
def clear_history():
    try:
        from models.translation_model import clear_all_translations
        clear_all_translations()
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500