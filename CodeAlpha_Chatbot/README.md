# 🤖 CodeAlpha Chatbot FAQ

Application web de chatbot intelligent basé sur le NLP et la Cosine Similarity, développée dans le cadre du programme d'internship CodeAlpha.

## 📋 Description

AIBot FAQ est un chatbot intelligent qui répond aux questions sur l'Intelligence Artificielle. Il utilise NLTK pour le traitement du langage naturel et la Cosine Similarity pour trouver la réponse la plus pertinente dans sa base de FAQ.

## ✨ Fonctionnalités

- 🤖 Réponses intelligentes basées sur la Cosine Similarity
- 💬 Interface chat moderne et élégante
- 🌙 Mode sombre / clair
- 📜 Historique des conversations dans MySQL
- 💡 Suggestions de questions
- 🗑️ Effacer la conversation
- 📱 Design responsive

## 🛠️ Technologies utilisées

- **Backend** : Python, Flask, NLTK, scikit-learn
- **Frontend** : HTML, CSS, JavaScript
- **Base de données** : MySQL
- **NLP** : Cosine Similarity, TF-IDF
- **Hébergement BDD** : Railway
- **Déploiement** : Render.com

## 📁 Structure du projet
CodeAlpha_Chatbot/
├── database/
│   └── schema.sql
├── chatbot/
│   ├── chatbot.py
│   └── faqs.json
├── models/
│   └── conversation_model.py
├── routes/
│   ├── main_routes.py
│   └── chatbot_routes.py
├── static/
│   ├── css/
│   │   ├── main.css
│   │   └── chat.css
│   └── js/
│       └── chat.js
├── templates/
│   └── index.html
├── app.py
├── config.py
├── run.py
└── requirements.txt
## 🚀 Installation

1. Cloner le dépôt :
```bash
git clone https://github.com/username/CodeAlpha_Project_IA.git
cd CodeAlpha_Project_IA/CodeAlpha_Chatbot
```

2. Créer un environnement virtuel :
```bash
python -m venv venv
venv\Scripts\activate
```

3. Installer les dépendances :
```bash
pip install -r requirements.txt
```

4. Configurer le fichier `.env` :
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=codealpha_chatbot
DB_PORT=3306
FLASK_SECRET_KEY=your_secret_key
5. Créer les tables MySQL :
```bash
mysql -u root codealpha_chatbot < database/schema.sql
```

6. Lancer l'application :
```bash
python run.py
```

7. Ouvrir dans le navigateur :
http://localhost:5001
## 👨‍💻 Auteur

Développé dans le cadre du programme d'internship **CodeAlpha**

## 📄 Licence

Ce projet est développé à des fins éducatives dans le cadre du programme CodeAlpha.