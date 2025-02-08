import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, Input  } from '@angular/core';
import { Game } from '../../interfaces/game.interface';
import { GameComponent } from "../game/game.component";

@Component({
  selector: 'app-game-grid',
  imports: [GameComponent],
  templateUrl: './game-grid.component.html',
  styleUrl: './game-grid.component.scss'
})
export class GameGridComponent {

  game : Game = {
    "Critic_Count": null,
    "Critic_Score": null,
    "Developer": null,
    "EU_Sales": 8.89,
    "Genre": "Role-Playing",
    "Global_Sales": 31.37,
    "JP_Sales": 10.22,
    "NA_Sales": 11.27,
    "Name": "Pokemon Red/Pokemon Blue",
    "Other_Sales": 1.0,
    "Platform": "GB",
    "Publisher": "Nintendo",
    "Rating": null,
    "User_Count": null,
    "User_Score": null,
    "Year_of_Release": 1996,
    "id": 5
  }

}
