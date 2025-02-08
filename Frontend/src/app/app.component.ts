import { Component, signal } from '@angular/core';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FilterComponent } from "./components/filter/filter.component";
import { FormsModule } from '@angular/forms';
import { GameService } from './services/game.service';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, FilterComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(private gameService: GameService) {}


  onSearch(filter: any) {
    console.log("Filters received in AppComponent:", filter);
    this.gameService.getGames(filter).subscribe((data) => {
      console.log("Data received in AppComponent:", data);
    });
  }
}
