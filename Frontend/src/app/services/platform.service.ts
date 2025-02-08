import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Platform } from '../interfaces/platform.interface';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {
  private http = inject(HttpClient);
  private users = signal<Platform[]>([])
  readonly url = 'http://127.0.0.1:5000/platforms';

  constructor() { }

  getPlatforms() {
    return this.http.get<Platform[]>(this.url);
  }
}
