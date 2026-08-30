import json
import os
import nltk
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

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
# CHARGER LES FAQ
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
    tokens = re.findall(r"[a-zàâäéèêëïîôöùûüç0-9]+", text)
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

def get_best_response(user_question, threshold=0.12):
    faqs = load_faqs()

    questions = [faq['question'] for faq in faqs]
    answers = [faq['answer'] for faq in faqs]

    cleaned_questions = [clean_text(q) for q in questions]
    cleaned_user_question = clean_text(user_question)

    all_texts = cleaned_questions + [cleaned_user_question]
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(all_texts)

    user_vector = tfidf_matrix[-1]
    faq_vectors = tfidf_matrix[:-1]
    similarities = cosine_similarity(user_vector, faq_vectors)[0]

    best_index = np.argmax(similarities)
    best_score = similarities[best_index]

    # Filet de sécurité : similarité de texte brut si TF-IDF est trop faible
    if best_score < threshold:
        ratios = [difflib.SequenceMatcher(None, cleaned_user_question, q).ratio() for q in cleaned_questions]
        alt_index = int(np.argmax(ratios))
        alt_score = ratios[alt_index]
        if alt_score > best_score:
            best_index = alt_index
            best_score = alt_score

    if best_score < threshold:
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