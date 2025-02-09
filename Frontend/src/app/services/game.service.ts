import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Filter } from '../interfaces/filter.interface';
import { Observable } from 'rxjs';
import { Game } from '../interfaces/game.interface';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private http = inject(HttpClient);

  constructor() { }

  getGames(filter: Filter) : Observable<Game[]> {
    let url = 'http://127.0.0.1:5000//games/filter?'

    if (filter.name != null && filter.name != '') {
      url += 'name=' + filter.name + '&';
    }

    if (filter.genre != null && filter.genre != '') {
      url += 'genre=' + filter.genre + '&';
    }

    if (filter.platform != null && filter.platform != '') {
      url += 'platform=' + filter.platform + '&';
    }

    if (filter.rating != null && filter.rating != '') {
      url += 'rating=' + filter.rating + '&';
    }

    console.log("URL:", url);

    return this.http.get<Game[]>(url);
  }
  
}
