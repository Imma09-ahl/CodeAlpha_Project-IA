-- Création de la base de données
CREATE DATABASE IF NOT EXISTS codealpha_translator;
USE codealpha_translator;

-- Table des langues disponibles
CREATE TABLE IF NOT EXISTS languages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(10) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table de l'historique des traductions
CREATE TABLE IF NOT EXISTS translations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    source_text TEXT NOT NULL,
    translated_text TEXT NOT NULL,
    source_language VARCHAR(10) NOT NULL,
    target_language VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertion des langues de base
INSERT INTO languages (code, name) VALUES
('en', 'Anglais'),
('fr', 'Français'),
('es', 'Espagnol'),
('de', 'Allemand'),
('it', 'Italien'),
('pt', 'Portugais'),
('ar', 'Arabe'),
('zh', 'Chinois'),
('ja', 'Japonais'),
('ru', 'Russe');