import { Component, Input, signal } from '@angular/core';
import { Game } from '../../interfaces/game.interface';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent {
  @Input() game!: Game;

  get name() { return this.game.Name; }
  get platform() { return this.game.Platform; }
  get genre() { return this.game.Genre; }
  get release() { return this.game.Year_of_Release; }
  get rating() { return this.game.Rating; }

}
