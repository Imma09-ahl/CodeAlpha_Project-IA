import logging
from flask import Blueprint, request, jsonify
from chatbot.chatbot import get_best_response
from models.conversation_model import save_conversation, get_conversation_history, clear_conversation_history

logger = logging.getLogger(__name__)

# Créer le blueprint chatbot
chatbot_bp = Blueprint('chatbot', __name__)

# ===========================
# ROUTE : POSER UNE QUESTION
# ===========================
@chatbot_bp.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json() or {}
    user_message = data.get('message', '').strip()

    if not user_message:
        return jsonify({
            'success': False,
            'error': 'Message vide'
        }), 400

    try:
        # Obtenir la meilleure réponse
        result = get_best_response(user_message)

        # Sauvegarder dans MySQL (non-bloquant pour l'utilisateur en cas d'erreur de connexion BDD)
        try:
            save_conversation(
                user_message,
                result['answer'],
                result['score']
            )
        except Exception as db_err:
            logger.error(f"Erreur de sauvegarde MySQL : {db_err}")

        return jsonify({
            'success': True,
            'answer': result['answer'],
            'score': result['score'],
            'matched_question': result['matched_question']
        })

    except Exception as e:
        logger.error(f"Erreur inattendue dans /api/chat : {e}")
        return jsonify({
            'success': False,
            'error': "Une erreur interne s'est produite lors du traitement du message."
        }), 500

# ===========================
# ROUTE : HISTORIQUE
# ===========================
@chatbot_bp.route('/api/history')
def history():
    try:
        conversations = get_conversation_history()
        return jsonify(conversations)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ===========================
# ROUTE : EFFACER L'HISTORIQUE
# ===========================
@chatbot_bp.route('/api/history/clear', methods=['DELETE'])
def clear_history():
    try:
        clear_conversation_history()
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500