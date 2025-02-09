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

  @Input() games : Game[] = [];

}
