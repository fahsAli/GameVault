import pandas as pd
import sqlite3

csv_file = 'Video_Games_Sales_as_at_22_Dec_2016.csv'  # Replace with your CSV file name

sqlite_db = 'video_games.db'

df = pd.read_csv(csv_file)

conn = sqlite3.connect(sqlite_db)

df.to_sql('games', conn, if_exists='replace', index=False)

conn.close()

print(f"CSV data has been successfully imported into {sqlite_db}!")