import pymysql
from config import Config

# ===========================
# CONNEXION A LA BASE DE DONNEES
# ===========================
def get_connection():
    return pymysql.connect(
        host=Config.DB_HOST,
        user=Config.DB_USER,
        password=Config.DB_PASSWORD,
        database=Config.DB_NAME,
        port=Config.DB_PORT,
        cursorclass=pymysql.cursors.DictCursor
    )

# ===========================
# SAUVEGARDER UNE CONVERSATION
# ===========================
def save_conversation(user_message, bot_response, similarity_score):
    connection = get_connection()
    try:
        with connection.cursor() as cursor:
            sql = """INSERT INTO conversations 
                     (user_message, bot_response, similarity_score) 
                     VALUES (%s, %s, %s)"""
            cursor.execute(sql, (user_message, bot_response, similarity_score))
        connection.commit()
    finally:
        connection.close()

# ===========================
# RECUPERER L'HISTORIQUE
# ===========================
def get_conversation_history():
    connection = get_connection()
    try:
        with connection.cursor() as cursor:
            cursor.execute("""SELECT * FROM conversations 
                            ORDER BY created_at DESC LIMIT 10""")
            return cursor.fetchall()
    finally:
        connection.close()

# ===========================
# EFFACER L'HISTORIQUE
# ===========================
def clear_conversation_history():
    connection = get_connection()
    try:
        with connection.cursor() as cursor:
            cursor.execute("DELETE FROM conversations")
        connection.commit()
    finally:
        connection.close()