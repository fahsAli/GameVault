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

@app.route('/games/filter', methods=['GET'])
def filter_games():
    name = request.args.get('name', default=None, type=str) 
    year = request.args.get('year', default=None, type=int)
    genre = request.args.get('genre', default=None, type=str) 
    platform = request.args.get('platform', default=None, type=str)
    rating = request.args.get('rating', default=None, type=str) 

    query = 'SELECT * FROM games WHERE 1=1'
    params = []

    if name:
        query += ' AND Name LIKE ?'
        params.append(f'%{name}%')
    if year:
        query += ' AND Year_of_Release = ?'
        params.append(year)
    if genre:
        query += ' AND Genre = ?'
        params.append(genre)
    if platform:
        query += ' AND Platform LIKE ?'
        params.append(f'%{platform}%')
    if rating:
        query += ' AND Rating = ?'
        params.append(rating)

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(query, params)
    games = cursor.fetchall()
    conn.close()

    return jsonify([dict(game) for game in games])


@app.route('/genres', methods=['GET'])
def get_genres():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT DISTINCT Genre FROM games')
    genres = cursor.fetchall()
    conn.close()
    return jsonify([genre[0] for genre in genres])

@app.route('/platforms', methods=['GET'])
def get_platforms():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT DISTINCT Platform FROM games')
    platforms = cursor.fetchall()
    conn.close()
    return jsonify([platform[0] for platform in platforms])

@app.route('/ratings', methods=['GET'])
def get_ratings():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT DISTINCT Rating FROM games')
    ratings = cursor.fetchall()
    conn.close()
    return jsonify([rating[0] for rating in ratings])


if __name__ == '__main__':
    app.run(debug=True)