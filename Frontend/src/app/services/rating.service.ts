import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Rating } from '../interfaces/rating.interface';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private http = inject(HttpClient);
  readonly url = 'http://127.0.0.1:5000/ratings';

  constructor() { }

  getRatings() {
    return this.http.get<Rating[]>(this.url);
  }
}
