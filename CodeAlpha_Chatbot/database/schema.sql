-- Création de la base de données
CREATE DATABASE IF NOT EXISTS codealpha_chatbot;
USE codealpha_chatbot;

-- Table de l'historique des conversations
CREATE TABLE IF NOT EXISTS conversations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_message TEXT NOT NULL,
    bot_response TEXT NOT NULL,
    similarity_score FLOAT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);