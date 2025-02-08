import { Component, signal } from '@angular/core';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FilterComponent } from "./components/filter/filter.component";
import { FormsModule } from '@angular/forms';
import { GameService } from './services/game.service';
import { GameGridComponent } from "./components/game-grid/game-grid.component";
import { Game } from './interfaces/game.interface';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, FilterComponent, FormsModule, GameGridComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(private gameService: GameService) {}

  gameList: Game[] = [];

  onSearch(filter: any) {
    console.log("Filters received in AppComponent:", filter);
    this.gameService.getGames(filter).subscribe((data) => {
      console.log("Data received in AppComponent:", data);
      this.gameList = data;
    });
  }
}
