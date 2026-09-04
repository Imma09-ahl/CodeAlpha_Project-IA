"""
Suite de tests de validation pour le moteur de traduction et les endpoints API.
Valide la correction du bug de casse ('Bonjour Monsieur' vs 'Bonjour monsieur'),
la fidélité du sens, les accents, la détection 'auto', et les paires de langues croisées.
"""
import unittest
import json
import sys
import os

# Ajouter le répertoire racine au PYTHONPATH
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app import app
from services.translation_service import translate_text


class TestTranslationEngine(unittest.TestCase):

    def setUp(self):
        self.app = app
        self.client = self.app.test_client()

    def test_case_sensitivity_bonjour_monsieur_titlecase(self):
        """Test 1: 'Bonjour Monsieur' (fr -> en)"""
        text = "Bonjour Monsieur"
        trans, _ = translate_text(text, source_lang="fr", target_lang="en")
        print(f"\n[Test 1] '{text}' -> '{trans}'")
        self.assertTrue(any(w in trans.lower() for w in ["hello", "good morning", "sir", "mister"]))
        self.assertNotIn("montreal", trans.lower())

    def test_case_sensitivity_bonjour_monsieur_mixedcase(self):
        """Test 2: 'Bonjour monsieur' (fr -> en) - Ne doit JAMAIS produire 'i'm in montreal'"""
        text = "Bonjour monsieur"
        trans, _ = translate_text(text, source_lang="fr", target_lang="en")
        print(f"[Test 2] '{text}' -> '{trans}'")
        self.assertTrue(any(w in trans.lower() for w in ["hello", "good morning", "sir", "mister"]))
        self.assertNotIn("montreal", trans.lower())
        self.assertNotIn("louise", trans.lower())

    def test_case_bonjour_madame(self):
        """Test 3: 'Bonjour Madame' (fr -> en)"""
        text = "Bonjour Madame"
        trans, _ = translate_text(text, source_lang="fr", target_lang="en")
        print(f"[Test 3] '{text}' -> '{trans}'")
        self.assertTrue(any(w in trans.lower() for w in ["hello", "madam", "mrs"]))

    def test_case_bonjour_monsieur_lowercase(self):
        """Test 4: 'bonjour monsieur' (fr -> en)"""
        text = "bonjour monsieur"
        trans, _ = translate_text(text, source_lang="fr", target_lang="en")
        print(f"[Test 4] '{text}' -> '{trans}'")
        self.assertTrue(any(w in trans.lower() for w in ["hello", "good morning", "sir", "mister"]))
        self.assertNotIn("montreal", trans.lower())

    def test_sentence_bonjour_monsieur_comment_allez_vous(self):
        """Test 5: 'Bonjour monsieur, comment allez-vous ?' (fr -> en)"""
        text = "Bonjour monsieur, comment allez-vous ?"
        trans, _ = translate_text(text, source_lang="fr", target_lang="en")
        print(f"[Test 5] '{text}' -> '{trans}'")
        self.assertTrue("how are you" in trans.lower())
        self.assertTrue(any(w in trans.lower() for w in ["hello", "good morning", "sir"]))

    def test_accents_and_special_chars(self):
        """Test 6: Texte avec accents 'Je suis très heureux de vous rencontrer.' (fr -> en)"""
        text = "Je suis très heureux de vous rencontrer."
        trans, _ = translate_text(text, source_lang="fr", target_lang="en")
        print(f"[Test 6] '{text}' -> '{trans}'")
        self.assertTrue(any(w in trans.lower() for w in ["glad to meet you", "pleased to meet you", "happy to meet you"]))

    def test_cross_language_combinations(self):
        """Test 7: Plusieurs combinaisons de langues"""
        combinations = [
            ("Bonjour", "fr", "en", ["hello", "good morning"]),
            ("Hello Sir", "en", "fr", ["bonjour", "monsieur"]),
            ("Olá Senhor", "pt", "en", ["hello", "sir", "mister"]),
            ("Hello Sir", "en", "pt", ["olá", "senhor", "bom dia"]),
            ("Buenos días señor", "es", "fr", ["bonjour", "monsieur"]),
            ("Bonjour monsieur", "fr", "pt", ["olá", "senhor", "bom dia"])
        ]
        for src_text, sl, tl, expected_keywords in combinations:
            res, _ = translate_text(src_text, source_lang=sl, target_lang=tl)
            print(f"[Test 7] [{sl}->{tl}] '{src_text}' -> '{res}'")
            self.assertTrue(
                any(kw in res.lower() for kw in expected_keywords),
                f"Échec pour [{sl}->{tl}] '{src_text}': reçu '{res}', attendu l'un de {expected_keywords}"
            )

    def test_auto_detection(self):
        """Test 8: Détection automatique de langue source"""
        text = "Bonjour monsieur"
        res, detected = translate_text(text, source_lang="auto", target_lang="en")
        print(f"[Test 8] Auto-detect '{text}' -> '{res}' (detecté: {detected})")
        self.assertEqual(detected, "fr")
        self.assertTrue(any(w in res.lower() for w in ["hello", "sir", "good morning"]))

    def test_api_translate_endpoint(self):
        """Test 9: Endpoint HTTP POST /api/translate"""
        payload = {
            "source_text": "Bonjour monsieur",
            "source_lang": "fr",
            "target_lang": "en"
        }
        response = self.client.post(
            "/api/translate",
            data=json.dumps(payload),
            content_type="application/json"
        )
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertTrue(data["success"])
        self.assertIn("translated_text", data)
        self.assertNotIn("montreal", data["translated_text"].lower())
        print(f"[Test 9] API Endpoint response: {data}")


if __name__ == "__main__":
    unittest.main()
