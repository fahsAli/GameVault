import { Component, signal } from '@angular/core';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FilterComponent } from "./components/filter/filter.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, FilterComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  onSearch(filter: any) {
    console.log("Filters received in AppComponent:", filter);
  }
}
