export interface Game {
    id: number;
    Name: string;
    Platform: string | null;
    Year_of_Release: number | null;
    Genre: string | null;
    Publisher: string | null;
    NA_Sales: number | null;
    EU_Sales: number | null;
    JP_Sales: number | null;
    Other_Sales: number | null;
    Global_Sales: number | null;
    Critic_Score: number | null;
    Critic_Count: number | null;
    User_Score: string | null;
    User_Count: number | null;
    Developer: string | null;
    Rating: string | null;
}