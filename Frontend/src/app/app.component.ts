import { Component, signal } from '@angular/core';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FilterComponent } from "./components/filter/filter.component";

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, FilterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = signal('Game Vault');
}
