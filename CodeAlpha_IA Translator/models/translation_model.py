import pymysql
from models.language_model import get_connection

def save_translation(source_text, translated_text, source_language, target_language):
    connection = get_connection()
    try:
        with connection.cursor() as cursor:
            sql = """INSERT INTO translations 
                     (source_text, translated_text, source_language, target_language) 
                     VALUES (%s, %s, %s, %s)"""
            cursor.execute(sql, (source_text, translated_text, source_language, target_language))
        connection.commit()
    finally:
        connection.close()

def get_translation_history():
    connection = get_connection()
    try:
        with connection.cursor() as cursor:
            cursor.execute("""SELECT * FROM translations 
                            ORDER BY created_at DESC LIMIT 10""")
            return cursor.fetchall()
    finally:
        connection.close()