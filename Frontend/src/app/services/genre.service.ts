import { inject, Injectable, signal } from '@angular/core';
import { Genre } from '../interfaces/genre.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GenreService {
  private http = inject(HttpClient);
  private users = signal<Genre[]>([])
  readonly url = 'http://127.0.0.1:5000/genres';

  constructor() { }

  getGenres() : Observable<Genre[]> {
    return this.http.get<Genre[]>(this.url);
  }
}
