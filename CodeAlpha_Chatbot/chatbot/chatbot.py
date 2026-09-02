import json
import os
import re
import logging
import nltk
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from google import genai
from config import Config

logger = logging.getLogger(__name__)

# ===========================
# RESSOURCES NLTK (OPTIMISÉES VERCEL)
# ===========================
def ensure_nltk_resources():
    nltk_data_dir = '/tmp/nltk_data' if os.environ.get('VERCEL') else None
    if nltk_data_dir:
        os.makedirs(nltk_data_dir, exist_ok=True)
        if nltk_data_dir not in nltk.data.path:
            nltk.data.path.append(nltk_data_dir)

    resources = [
        ('tokenizers/punkt', 'punkt'),
        ('corpora/stopwords', 'stopwords'),
        ('corpora/wordnet', 'wordnet')
    ]
    for path, name in resources:
        try:
            nltk.data.find(path)
        except LookupError:
            try:
                if nltk_data_dir:
                    nltk.download(name, download_dir=nltk_data_dir, quiet=True)
                else:
                    nltk.download(name, quiet=True)
            except Exception as e:
                logger.warning(f"Impossible de télécharger la ressource NLTK {name}: {e}")

ensure_nltk_resources()

from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

lemmatizer = WordNetLemmatizer()

# ===========================
# CLIENT GEMINI
# ===========================
_gemini_client = None

def get_gemini_client():
    global _gemini_client
    if _gemini_client is None:
        api_key = Config.GEMINI_API_KEY or os.getenv('GEMINI_API_KEY')
        if not api_key:
            logger.error("GEMINI_API_KEY n'est pas configurée dans les variables d'environnement.")
            return None
        try:
            _gemini_client = genai.Client(api_key=api_key)
        except Exception as e:
            logger.error(f"Erreur lors de l'initialisation du client Gemini : {e}")
            return None
    return _gemini_client

# ===========================
# RECHERCHE WEB (OPTION B : GRATUITE & ILLIMITÉE)
# ===========================
def perform_web_search(query: str, max_results: int = 3) -> list:
    """Effectue une recherche Web sans frais via ddgs pour récupérer des faits récents."""
    try:
        from ddgs import DDGS
        ddgs = DDGS(timeout=8)
        results = list(ddgs.text(query, max_results=max_results))
        return results
    except Exception as e:
        logger.warning(f"Erreur lors de la recherche Web pour '{query}' : {e}")
        return []

# ===========================
# CHARGER LES FAQS
# ===========================
def load_faqs():
    faq_path = os.path.join(os.path.dirname(__file__), 'faqs.json')
    with open(faq_path, 'r', encoding='utf-8') as f:
        return json.load(f)

# ===========================
# NETTOYER LE TEXTE
# ===========================
def clean_text(text):
    text = text.lower()
    text = text.replace("'", " ").replace("’", " ")
    tokens = re.findall(r"[a-zA-Zàâäéèêëïîôöùûüç0-9]+", text)
    try:
        stop_words = set(stopwords.words('french')) | set(stopwords.words('english'))
    except Exception:
        stop_words = set()
    extra_stopwords = {'quoi', 'cest', 'quest', 'qu', 'ce', 'un', 'une',
                       'les', 'la', 'le', 'de', 'du', 'des', 'est', 'ca', 'ça'}
    stop_words = stop_words | extra_stopwords
    tokens = [lemmatizer.lemmatize(t) for t in tokens if t not in stop_words]
    return ' '.join(tokens)

# ===========================
# APPEL GEMINI AVEC RECHERCHE WEB
# ===========================
def ask_gemini_with_search(user_question: str) -> str:
    client = get_gemini_client()
    if not client:
        return "Le service d'intelligence artificielle n'est pas configuré (clé GEMINI_API_KEY absente)."

    # 1. Recherche Web pour obtenir des informations à jour
    web_results = perform_web_search(user_question, max_results=3)

    # 2. Construction du prompt enrichi avec les données Web
    if web_results:
        snippets = []
        for i, res in enumerate(web_results, 1):
            title = res.get('title', '').strip()
            body = res.get('body', '').strip()
            if title or body:
                snippets.append(f"Source {i} ({title}): {body}")
        
        context_str = "\n\n".join(snippets)
        prompt = (
            f"Tu es l'assistant intelligent du chatbot AIBot FAQ.\n"
            f"Voici des informations récentes et vérifiées issues d'une recherche sur Internet :\n"
            f"---\n{context_str}\n---\n\n"
            f"Question de l'utilisateur : {user_question}\n\n"
            f"Consignes de réponse :\n"
            f"1. Réponds toujours en français, avec courtoisie, clarté et concision (3 à 5 phrases maximum).\n"
            f"2. Utilise prioritairement les informations trouvées sur Internet ci-dessus pour donner une réponse précise et actualisée.\n"
            f"3. Si la question porte sur une actualité ou une situation actuelle, intègre ces faits récents."
        )
    else:
        # Si la recherche Web ne retourne rien ou n'est pas nécessaire, Gemini répond avec ses connaissances
        prompt = (
            f"Tu es l'assistant intelligent du chatbot AIBot FAQ.\n"
            f"Question de l'utilisateur : {user_question}\n\n"
            f"Consignes de réponse :\n"
            f"1. Réponds toujours en français, avec clarté et concision (3 à 5 phrases maximum).\n"
            f"2. Fournis des explications pédagogiques et fiables."
        )

    # 3. Génération de contenu avec Gemini
    model_name = Config.GEMINI_MODEL or os.getenv('GEMINI_MODEL', 'gemini-3.6-flash')
    try:
        response = client.models.generate_content(
            model=model_name,
            contents=prompt,
        )
        if response and response.text:
            return response.text.strip()
        return "Je n'ai pas pu obtenir de réponse satisfaisante pour le moment."
    except Exception as e:
        logger.error(f"Erreur lors de l'appel à l'API Gemini ({model_name}) : {e}")
        return "Désolé, une difficulté technique est survenue lors de la communication avec l'IA. Veuillez réessayer dans quelques instants."

# ===========================
# DÉTECTION DE REQUÊTE D'ACTUALITÉ / RECHERCHE EXTERNE
# ===========================
def requires_current_info(text: str) -> bool:
    """Détecte si la question de l'utilisateur porte explicitement sur l'actualité ou des faits récents/externes."""
    keywords = [
        'actualite', 'actualites', 'actualité', 'actualités',
        'nouvelle', 'nouvelles', 'recent', 'recents', 'recente', 'recentes',
        'récent', 'récents', 'récente', 'récentes',
        'derniere', 'dernieres', 'dernier', 'derniers',
        'dernière', 'dernières',
        'actuel', 'actuelle', 'actuels', 'actuelles', 'actuellement',
        'aujourd hui', 'aujourdhui', "aujourd'hui",
        'en ce moment', 'cette annee', 'cette année',
        'president actuel', 'président actuel', 'qui est le president', 'qui est le président'
    ]
    text_lower = text.lower()
    return any(k in text_lower for k in keywords)

# ===========================
# TROUVER LA MEILLEURE REPONSE
# ===========================
def get_best_response(user_question: str):
    # 1. Si la question demande explicitement des actualités ou des informations récentes,
    # on active directement la recherche Web + Gemini pour obtenir des faits actuels
    if requires_current_info(user_question):
        try:
            gemini_answer = ask_gemini_with_search(user_question)
            return {
                'answer': gemini_answer,
                'score': None,
                'matched_question': None
            }
        except Exception as e:
            logger.error(f"Erreur lors de la recherche d'actualités pour '{user_question}' : {e}")

    # 2. Sinon, on compare avec la base FAQ locale
    faqs = load_faqs()
    questions = [faq['question'] for faq in faqs]
    answers = [faq['answer'] for faq in faqs]

    cleaned_questions = [clean_text(q) for q in questions]
    cleaned_user_question = clean_text(user_question)

    vectorizer = TfidfVectorizer()
    vectors = vectorizer.fit_transform(cleaned_questions + [cleaned_user_question])

    cosine_sim = cosine_similarity(vectors[-1], vectors[:-1])
    best_index = np.argmax(cosine_sim)
    best_score = cosine_sim[0][best_index]

    threshold = 0.35  # Seuil de pertinence FAQ

    if best_score < threshold:
        try:
            gemini_answer = ask_gemini_with_search(user_question)
            return {
                'answer': gemini_answer,
                'score': None,
                'matched_question': None
            }
        except Exception as e:
            logger.error(f"Erreur lors du traitement Gemini pour '{user_question}' : {e}")
            return {
                'answer': "Je suis désolé, je n'ai pas pu comprendre votre question. Pouvez-vous la reformuler ?",
                'score': float(best_score),
                'matched_question': None
            }

    return {
        'answer': answers[best_index],
        'score': float(best_score),
        'matched_question': questions[best_index]
    }