import { Component, EventEmitter, inject, Output } from '@angular/core';
import { GenreService } from '../../services/genre.service';
import { Genre } from '../../interfaces/genre.interface';
import { PlatformService } from '../../services/platform.service';
import { Platform } from '../../interfaces/platform.interface';
import { RatingService } from '../../services/rating.service';
import { Rating } from '../../interfaces/rating.interface';
import { Filter } from '../../interfaces/filter.interface';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-filter',
  imports: [FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  private genreService = inject(GenreService);
  genres: Genre[] = [];

  private platformService = inject(PlatformService);
  platforms: Platform[] = [];

  private ratingService = inject(RatingService);
  ratings: Rating[] = [];

  gameName: string = "";
  genre: string = "";
  platform: string = "";
  rating: string = "";

  filters : Filter = {
    name: "",
    genre: "",
    platform: "",
    rating: "",
  };

  @Output() filterChange = new EventEmitter<Filter>();

  onSearch() {
    this.filters.name = this.gameName;
    this.filters.genre = this.genre;
    this.filters.platform = this.platform;
    this.filters.rating = this.rating;
    this.filterChange.emit(this.filters);
    console.log('Filters applied:', this.filters);
  }

  constructor() {
    this.genreService.getGenres().subscribe({
      next: (data) => {
        this.genres = data;
        console.log("Genres loaded:", this.genres);
      },
      error: (err) => console.error("Error fetching genres:", err)
    });

    this.platformService.getPlatforms().subscribe({
      next: (data) => {
        this.platforms = data;
        console.log("Platforms loaded:", this.platforms);
      },
      error: (err) => console.error("Error fetching platforms:", err)
    });

    this.ratingService.getRatings().subscribe({
      next: (data) => {
        this.ratings = data;
        console.log("Ratings loaded:", this.ratings);
      },
      error: (err) => console.error("Error fetching ratings:", err)
    });
  }
}
