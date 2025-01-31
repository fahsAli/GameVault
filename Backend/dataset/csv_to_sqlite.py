import pandas as pd
import sqlite3

csv_file = 'Video_Games_Sales_as_at_22_Dec_2016.csv'
sqlite_db = 'video_games.db'

df = pd.read_csv(csv_file)

df.insert(0, 'id', range(1, len(df) + 1))

conn = sqlite3.connect(sqlite_db)
cursor = conn.cursor()

cursor.execute("""
DROP TABLE IF EXISTS games;
""")

cursor.execute("""
CREATE TABLE games (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT,
    Platform TEXT,
    Year_of_Release INTEGER,
    Genre TEXT,
    Publisher TEXT,
    NA_Sales REAL,
    EU_Sales REAL,
    JP_Sales REAL,
    Other_Sales REAL,
    Global_Sales REAL,
    Critic_Score REAL,
    Critic_Count REAL,
    User_Score TEXT,
    User_Count REAL,
    Developer TEXT,
    Rating TEXT
);
""")

df.drop(columns=['id'], inplace=True)  
df.to_sql('games', conn, if_exists='append', index=False)

conn.close()

print(f"CSV data has been successfully imported into {sqlite_db} with an auto-incrementing ID!")