# AI Language Translator 🌐

Une application web de traduction multilingue alimentée par l'Intelligence Artificielle, développée avec Flask et LibreTranslate.

## 🚀 Fonctionnalités

- ✨ Traduction instantanée entre plus de 100 langues
- 🎨 Interface moderne avec mode sombre/clair
- 🔊 Text-to-Speech pour écouter les traductions
- 📋 Historique des traductions
- 🔄 Inversion rapide des langues
- 📱 Design responsive

## 📋 Prérequis

- Python 3.8 ou supérieur
- MySQL 5.7 ou supérieur
- pip (gestionnaire de paquets Python)

## 🛠️ Installation

### 1. Cloner le projet

```bash
git clone <votre-repo>
cd CodeAlpha_IA Translator
```

### 2. Créer un environnement virtuel

```bash
python -m venv venv

# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

### 3. Installer les dépendances

```bash
pip install -r requirements.txt
```

### 4. Configurer la base de données

Créez la base de données MySQL :

```bash
mysql -u root -p < database/schema.sql
```

Ou manuellement :

```sql
CREATE DATABASE codealpha_translator;
USE codealpha_translator;
-- Puis exécutez le contenu de database/schema.sql
```

### 5. Configurer les variables d'environnement

Modifiez le fichier `.env` avec vos informations :

```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=votre_mot_de_passe
DB_NAME=codealpha_translator
DB_PORT=3306

# LibreTranslate API
LIBRETRANSLATE_URL=https://libretranslate.com

# Flask Configuration
FLASK_SECRET_KEY=votre-clé-secrète-unique
FLASK_DEBUG=True
```

## 🚀 Lancement de l'application

### Mode développement

```bash
python run.py
```

L'application sera accessible sur : `http://localhost:5000`

### Mode production (avec Gunicorn)

```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 wsgi:app
```

## 📁 Structure du projet

```
CodeAlpha_IA Translator/
├── app.py                  # Application Flask principale
├── config.py              # Configuration
├── run.py                 # Point d'entrée développement
├── wsgi.py                # Point d'entrée production
├── requirements.txt       # Dépendances Python
├── .env                   # Variables d'environnement
├── .flaskenv             # Configuration Flask
├── database/
│   └── schema.sql        # Schéma de la base de données
├── models/
│   ├── __init__.py
│   ├── language_model.py # Modèle des langues
│   └── translation_model.py # Modèle des traductions
├── routes/
│   ├── __init__.py
│   ├── main_routes.py    # Routes principales
│   └── translation_routes.py # Routes de traduction
├── static/
│   ├── css/
│   │   ├── main.css      # Styles globaux
│   │   ├── index.css     # Styles page d'accueil
│   │   └── translate.css # Styles page traduction
│   └── js/
│       ├── main.js       # JavaScript global
│       └── translate.js  # JavaScript traduction
└── templates/
    ├── index.html        # Page d'accueil
    └── translate.html    # Page de traduction
```

## 🔧 Configuration

### API LibreTranslate

Par défaut, l'application utilise l'API publique de LibreTranslate (`https://libretranslate.com`).

Pour utiliser votre propre instance :

1. Installez LibreTranslate localement : https://github.com/LibreTranslate/LibreTranslate
2. Modifiez `LIBRETRANSLATE_URL` dans `.env`

### Base de données

La base de données contient deux tables principales :

- `languages` : Liste des langues disponibles
- `translations` : Historique des traductions

## 🎨 Personnalisation

### Thèmes

Les thèmes (clair/sombre) sont définis dans `static/css/main.css` avec les variables CSS.

### Langues

Pour ajouter des langues, modifiez `database/schema.sql` ou utilisez l'interface d'administration.

## 🐛 Dépannage

### Erreur de connexion à la base de données

Vérifiez :
- MySQL est démarré
- Les identifiants dans `.env` sont corrects
- La base de données existe

### Erreur API LibreTranslate

Vérifiez :
- Votre connexion internet
- L'URL de l'API dans `.env`
- Les limites de taux de l'API publique

## 📝 Licence

Ce projet est développé dans le cadre du programme CodeAlpha.

## 👨‍💻 Auteur

Développé avec ❤️ pour CodeAlpha

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 📞 Support

Pour toute question ou problème, veuillez ouvrir une issue sur GitHub.