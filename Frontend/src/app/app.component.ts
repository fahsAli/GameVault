import { Component, HostListener } from '@angular/core';
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

  constructor(private gameService: GameService) {
    this.loadInitialGames();
  }

  gameList: Game[] = [];

  offset: number = 0;
  limit: number = 50;
  searchActive: boolean = false;
  loading: boolean = false; 
  totalGames: number = 0;

  loadInitialGames() {
    this.gameService.getGames(this.limit, this.offset).subscribe((data) => {
      console.log("Initial games loaded:", data);
      this.gameList = data.games;
      this.totalGames = data.total;
      this.offset += this.limit; 
    });
  }

  onSearch(filter: any) {
    this.searchActive = true;
    console.log("Filters received in AppComponent:", filter);
    this.gameService.getFilteredGames(filter).subscribe((data) => {
      console.log("Data received in AppComponent:", data);
      this.gameList = data;
    });
  }

  @HostListener("window:scroll", [])
  onScroll(): void {
    if (this.searchActive || this.loading) return;

    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 200) {
      if (this.offset < this.totalGames) {
        this.loading = true;
        this.loadMoreGames();
      }
    }
  }

  loadMoreGames() {
    this.gameService.getGames(this.limit, this.offset).subscribe((data) => {
      console.log("More games loaded:", data);
      this.gameList = [...this.gameList, ...data.games];
      this.offset += this.limit;
      this.loading = false;
    });
  }

}