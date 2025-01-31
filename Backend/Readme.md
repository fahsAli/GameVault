# Video Games API

## Overview
This is a Flask-based REST API that provides access to a video games database. The API allows users to retrieve information about video games, including their sales data, ratings, and other metadata.

## Database Schema
The database contains the following information for each game:

| Field | Type | Description |
|-------|------|-------------|
| id | INTEGER | Primary Key, Auto-incrementing |
| Name | TEXT | Name of the video game |
| Platform | TEXT | Gaming platform (e.g., PS, Xbox) |
| Year_of_Release | INTEGER | Release year of the game |
| Genre | TEXT | Game genre |
| Publisher | TEXT | Game publisher |
| NA_Sales | REAL | Sales in North America (in millions) |
| EU_Sales | REAL | Sales in Europe (in millions) |
| JP_Sales | REAL | Sales in Japan (in millions) |
| Other_Sales | REAL | Sales in other regions (in millions) |
| Global_Sales | REAL | Total worldwide sales (in millions) |
| Critic_Score | REAL | Aggregate critic score |
| Critic_Count | REAL | Number of critics reviewed |
| User_Score | TEXT | Aggregate user score |
| User_Count | REAL | Number of user reviews |
| Developer | TEXT | Game developer |
| Rating | TEXT | Game rating (e.g., E, T, M) |

## Setup and Installation

1. Ensure you have Python and Flask installed
2. Clone the repository
3. Install required dependencies:
```bash
pip install flask sqlite3
```
4. Make sure the database file is in the correct location: `dataset/video_games.db`

## Running the Application

Run the application using:
```bash
python app.py
```

The server will start on `http://localhost:5000` in debug mode.

## API Endpoints

### 1. Home
- **URL:** `/`
- **Method:** `GET`
- **Description:** Welcome message
- **Response:** Text message welcoming users to the API

### 2. Get All Games
- **URL:** `/allgames`
- **Method:** `GET`
- **Description:** Retrieves all games in the database
- **Response:** Array of game objects
- **Note:** Use with caution on large datasets as it returns all records

### 3. Get Games (Paginated)
- **URL:** `/games`
- **Method:** `GET`
- **Parameters:**
  - `limit` (optional): Number of records to return (default: 50)
  - `offset` (optional): Number of records to skip (default: 0)
- **Description:** Retrieves games with pagination support
- **Response:** JSON object containing:
  - `games`: Array of game objects
  - `total`: Total number of games in database
  - `limit`: Current limit value
  - `offset`: Current offset value
- **Example:** `/games?limit=10&offset=20`

### 4. Get Game by ID
- **URL:** `/games/<id>`
- **Method:** `GET`
- **Parameters:**
  - `id`: Game ID (integer)
- **Description:** Retrieves a specific game by its ID
- **Response:** Single game object
- **Example:** `/games/1`

## Response Format
Game objects are returned in JSON format with all fields from the database schema.

Example response:
```json
{
    "id": 1,
    "Name": "Super Mario Bros",
    "Platform": "NES",
    "Year_of_Release": 1985,
    "Genre": "Platform",
    "Publisher": "Nintendo",
    "NA_Sales": 29.08,
    "EU_Sales": 3.58,
    "JP_Sales": 6.81,
    "Other_Sales": 0.77,
    "Global_Sales": 40.24,
    "Critic_Score": 95,
    "Critic_Count": 28,
    "User_Score": "9.2",
    "User_Count": 3250,
    "Developer": "Nintendo",
    "Rating": "E"
}
```