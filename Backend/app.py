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

@app.route('/allgames', methods=['GET'])
def get_all_games():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM games')
    games = cursor.fetchall()
    conn.close()
    return jsonify([dict(game) for game in games])

@app.route('/games', methods=['GET'])
def get_games():
    limit = request.args.get('limit', default=50, type=int)  
    offset = request.args.get('offset', default=0, type=int) 

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute('SELECT * FROM games LIMIT ? OFFSET ?', (limit, offset))
    games = cursor.fetchall()

    cursor.execute('SELECT COUNT(*) FROM games')
    total_games = cursor.fetchone()[0]

    conn.close()

    return jsonify({
        'games': [dict(game) for game in games],
        'total': total_games,
        'limit': limit,
        'offset': offset
    })

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