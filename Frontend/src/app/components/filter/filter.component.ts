import { Component, inject } from '@angular/core';
import { GenreService } from '../../services/genre.service';
import { Genre } from '../../interfaces/genre.interface';

@Component({
  selector: 'app-filter',
  imports: [],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  private genreService = inject(GenreService);
  genres: Genre[] = [];

  constructor() {
    this.genreService.getGenres().subscribe({
      next: (data) => {
        this.genres = data;
        console.log("Genres loaded:", this.genres);
      },
      error: (err) => console.error("Error fetching genres:", err)
    });
  }
}
