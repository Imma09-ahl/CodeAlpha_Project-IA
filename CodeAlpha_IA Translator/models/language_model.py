import pymysql
from config import Config

def get_connection():
    return pymysql.connect(
        host=Config.DB_HOST,
        user=Config.DB_USER,
        password=Config.DB_PASSWORD,
        database=Config.DB_NAME,
        port=Config.DB_PORT,
        cursorclass=pymysql.cursors.DictCursor
    )

def get_all_languages():
    connection = get_connection()
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM languages ORDER BY name ASC")
            return cursor.fetchall()
    finally:
        connection.close()

def insert_language(code, name):
    connection = get_connection()
    try:
        with connection.cursor() as cursor:
            sql = "INSERT IGNORE INTO languages (code, name) VALUES (%s, %s)"
            cursor.execute(sql, (code, name))
        connection.commit()
    finally:
        connection.close()