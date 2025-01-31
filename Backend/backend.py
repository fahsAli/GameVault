from flask import Flask, jsonify, request
import sqlite3

app = Flask(__name__)

DATABASE = 'dataset/video_games.db'

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/')
def home():
    return "Welcome to the Video Game API!"

@app.route('/games', methods=['GET'])
def get_games():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM games')
    games = cursor.fetchall()
    conn.close()
    return jsonify([dict(game) for game in games])

@app.route('/games/<int:id>', methods=['GET'])
def get_game(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM games WHERE id = ?', (id,))
    game = cursor.fetchone()
    conn.close()
    return jsonify(dict(game))


if __name__ == '__main__':
    app.run(debug=True)