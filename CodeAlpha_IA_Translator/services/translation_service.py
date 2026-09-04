"""
Service de traduction multilingue haute fidélité.
Combine un traducteur neuronal direct et un fallback MyMemory filtré
pour garantir la cohérence textuelle, la gestion de la casse et le support de la détection automatique.
"""
import urllib.request
import urllib.parse
import json
import logging
import requests
from config import Config

logger = logging.getLogger(__name__)

def translate_google(text: str, source_lang: str = 'auto', target_lang: str = 'en'):
    """
    Traducteur neuronal direct (Google Translate GTX).
    Gère la ponctuation, la casse exacte, les accents et la détection 'auto'.
    """
    sl = 'auto' if not source_lang or source_lang == 'auto' else source_lang
    tl = target_lang or 'en'
    
    encoded_q = urllib.parse.quote(text.strip())
    url = f"https://translate.googleapis.com/translate_a/single?client=gtx&sl={sl}&tl={tl}&dt=t&q={encoded_q}"
    req = urllib.request.Request(
        url,
        headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
        }
    )
    with urllib.request.urlopen(req, timeout=8) as response:
        raw = response.read().decode('utf-8')
        data = json.loads(raw)
        
        translated_parts = []
        if data and len(data) > 0 and isinstance(data[0], list):
            for item in data[0]:
                if item and len(item) > 0 and item[0]:
                    translated_parts.append(item[0])
        
        translated_text = "".join(translated_parts).strip()
        detected_lang = data[2] if len(data) > 2 and isinstance(data[2], str) else (source_lang if source_lang != 'auto' else 'fr')
        return translated_text, detected_lang


def translate_mymemory(text: str, source_lang: str = 'fr', target_lang: str = 'en'):
    """
    Traducteur de secours MyMemory avec filtrage des segments corrompus 'Public Web'.
    """
    sl = 'fr' if not source_lang or source_lang == 'auto' else source_lang
    tl = target_lang or 'en'
    
    url = "https://api.mymemory.translated.net/get"
    params = {
        'q': text,
        'langpair': f"{sl}|{tl}",
        'de': 'translator@codealpha.project'
    }
    r = requests.get(url, params=params, timeout=8).json()
    default_trans = r.get('responseData', {}).get('translatedText', '')
    matches = r.get('matches', [])
    
    # Vérifier si la traduction par défaut provient d'un segment 'Public Web' corrompu
    if matches and len(matches) > 1:
        first_match = matches[0]
        if first_match.get('created-by') == 'Public Web':
            for m in matches[1:]:
                # Privilégier les entrées issues de MateCat, Public_Corpora ou Wikipedia
                if m.get('created-by') in ['MateCat', 'Public_Corpora', 'Wikipedia'] and float(m.get('match', 0)) >= 0.90:
                    trans = m.get('translation', '').strip()
                    if trans and trans.lower() != default_trans.lower():
                        return trans
                        
    return default_trans


def translate_libretranslate(text: str, source_lang: str = 'fr', target_lang: str = 'en'):
    """
    Traducteur LibreTranslate si configuré dans .env.
    """
    base_url = getattr(Config, 'LIBRETRANSLATE_URL', '').rstrip('/')
    if not base_url or 'libretranslate.com' in base_url:
        return None
        
    url = f"{base_url}/translate"
    payload = {
        'q': text,
        'source': 'auto' if source_lang == 'auto' else source_lang,
        'target': target_lang,
        'format': 'text'
    }
    r = requests.post(url, json=payload, timeout=8)
    if r.status_code == 200:
        data = r.json()
        return data.get('translatedText')
    return None


def translate_text(text: str, source_lang: str = 'auto', target_lang: str = 'en'):
    """
    Point d'entrée unifié pour la traduction.
    Priorise le choix explicite de l'utilisateur sur toute surdétection,
    et applique une stratégie de fallback robuste.
    """
    if not text or not text.strip():
        return "", source_lang
        
    clean_text = text.strip()
    
    # Si la langue source est explicitement identique à la langue cible
    if source_lang and target_lang and source_lang != 'auto' and source_lang.lower() == target_lang.lower():
        return clean_text, source_lang

    # 1. Moteur principal : Google Translate direct (haute précision, insensible aux mémoires polluées)
    try:
        translated, detected = translate_google(clean_text, source_lang, target_lang)
        if translated:
            return translated, detected
    except Exception as e:
        logger.warning(f"Le traducteur principal a rencontré une erreur : {e}. Tentative via le service de secours...")

    # 2. LibreTranslate si serveur local configuré
    try:
        lt_result = translate_libretranslate(clean_text, source_lang, target_lang)
        if lt_result:
            return lt_result, source_lang if source_lang != 'auto' else 'fr'
    except Exception as e:
        logger.debug(f"LibreTranslate non disponible : {e}")

    # 3. Fallback : MyMemory avec assainissement des segments
    try:
        mm_result = translate_mymemory(clean_text, source_lang, target_lang)
        if mm_result:
            return mm_result, source_lang if source_lang != 'auto' else 'fr'
    except Exception as e:
        logger.error(f"MyMemory a également échoué : {e}")

    raise RuntimeError("Impossible de traduire le texte : tous les services de traduction sont indisponibles.")
