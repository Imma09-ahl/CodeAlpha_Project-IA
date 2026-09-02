import json
import os
import nltk
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from google import genai
from google.genai import types

gemini_client = genai.Client()
GEMINI_MODEL = "gemini-2.5-flash"

# Télécharger les ressources NLTK nécessaires
# Sur Vercel, seul /tmp est accessible en écriture
nltk_data_dir = '/tmp/nltk_data' if os.environ.get('VERCEL') else None
if nltk_data_dir:
    os.makedirs(nltk_data_dir, exist_ok=True)
    nltk.data.path.append(nltk_data_dir)
    nltk.download('punkt', download_dir=nltk_data_dir, quiet=True)
    nltk.download('stopwords', download_dir=nltk_data_dir, quiet=True)
    nltk.download('wordnet', download_dir=nltk_data_dir, quiet=True)
else:
    nltk.download('punkt', quiet=True)
    nltk.download('stopwords', quiet=True)
    nltk.download('wordnet', quiet=True)
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer

# ===========================
# CHARGER LES FAQ$
# ===========================
def load_faqs():
    faq_path = os.path.join(os.path.dirname(__file__), 'faqs.json')
    with open(faq_path, 'r', encoding='utf-8') as f:
        return json.load(f)

# ===========================
# NETTOYER LE TEXTE
# ===========================
lemmatizer = WordNetLemmatizer()

import re

def clean_text(text):
    text = text.lower()
    # Remplacer les apostrophes pour bien séparer l', d', qu', c'...
    text = text.replace("'", " ").replace("'", " ")
    # Extraire uniquement les mots (lettres, accents inclus)
    tokens = re.findall(r"[a-zA-Zàâäéèêëïîôöùûüç0-9]+", text)
    stop_words = set(stopwords.words('french')) | set(stopwords.words('english'))
    # Mots de liaison/question qui polluent la comparaison
    extra_stopwords = {'quoi', 'cest', 'quest', 'qu', 'ce', 'un', 'une',
                        'les', 'la', 'le', 'de', 'du', 'des', 'est', 'ca', 'ça'}
    stop_words = stop_words | extra_stopwords
    tokens = [lemmatizer.lemmatize(t) for t in tokens if t not in stop_words]
    return ' '.join(tokens)
# ===========================
# TROUVER LA MEILLEURE REPONSE
# ===========================
import difflib

def ask_gemini_with_search(user_question: str) -> str:
    grounding_tool = types.Tool(google_search=types.GoogleSearch())

    config = types.GenerateContentConfig(
        tools=[grounding_tool],
        system_instruction=(
            "Tu es l'assistant du chatbot AIBot FAQ. "
            "Réponds toujours en français, de façon claire et concise "
            "(3 à 5 phrases maximum). Si tu utilises des informations "
            "trouvées sur internet, base-toi sur des sources fiables."
        ),
    )

    response = gemini_client.models.generate_content(
        model=GEMINI_MODEL,
        contents=user_question,
        config=config,
    )

    return response.text
def get_best_response(user_question: str):
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

    threshold = 0.3  # ajuste selon tes tests

    if best_score < threshold:
        try:
            gemini_answer = ask_gemini_with_search(user_question)
            return {
                'answer': gemini_answer,
                'score': None,
                'matched_question': None
            }
        except Exception as e:
            return {
                'answer': "Je suis désolé, je n'ai pas compris votre question.",
                'score': float(best_score),
                'matched_question': None
            }

    return {
        'answer': answers[best_index],
        'score': float(best_score),
        'matched_question': questions[best_index]
    }