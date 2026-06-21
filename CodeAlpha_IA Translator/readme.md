# 🌐 CodeAlpha IA Translator

Application web de traduction instantanée propulsée par l'Intelligence Artificielle, développée dans le cadre du programme d'internship CodeAlpha.

## 📋 Description

AI Translator est une application web qui permet de traduire du texte dans plus de 100 langues grâce à l'API LibreTranslate. L'application sauvegarde l'historique des traductions dans une base de données MySQL.

## ✨ Fonctionnalités

- 🌍 Traduction instantanée dans plus de 100 langues
- 🔊 Text-to-Speech pour écouter les traductions
- 📋 Copie rapide de la traduction
- ⇄ Inversion des langues en un clic
- 📜 Historique des 10 dernières traductions
- 🌙 Mode sombre / clair

## 🛠️ Technologies utilisées

- **Backend** : Python, Flask
- **Frontend** : HTML, CSS, JavaScript
- **Base de données** : MySQL
- **API** : LibreTranslate
- **Hébergement BDD** : Railway
- **Déploiement** : Render.com

## 📁 Structure du projet
CodeAlpha_IA Translator/

├── database/

│   └── schema.sql

├── models/

│   ├── language_model.py

│   └── translation_model.py

├── routes/

│   ├── main_routes.py

│   └── translation_routes.py

├── static/

│   ├── css/

│   │   ├── main.css

│   │   ├── index.css

│   │   └── translate.css

│   └── js/

│       ├── main.js

│       └── translate.js

├── templates/

│   ├── index.html

│   └── translate.html

├── app.py

├── config.py

├── run.py

├── wsgi.py

└── requirements.txt

## 🚀 Installation

1. Cloner le dépôt :
```bash
git clone https://github.com/username/CodeAlpha_Project_IA.git
cd CodeAlpha_Project_IA/CodeAlpha_IA\ Translator
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
DB_HOST=your_host

DB_USER=your_user

DB_PASSWORD=your_password

DB_NAME=your_database

DB_PORT=3306

LIBRETRANSLATE_URL=https://libretranslate.com

FLASK_SECRET_KEY=your_secret_key

5. Créer les tables MySQL :
```bash
mysql -u your_user -p your_database < database/schema.sql
```

6. Lancer l'application :
```bash
python run.py
```

7. Ouvrir dans le navigateur :
http://localhost:5000

## 👨‍💻 Auteur

Développé dans le cadre du programme d'internship **CodeAlpha**

## 📄 Licence

Ce projet est développé à des fins éducatives dans le cadre du programme CodeAlpha.