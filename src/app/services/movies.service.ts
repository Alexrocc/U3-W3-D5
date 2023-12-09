import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/movie';
import { Favourite } from '../models/favourite';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  apiURL = environment.apiURL;

  constructor(private http: HttpClient) {}

  fetchMovies() {
    return this.http.get<Movie[]>(`${this.apiURL}/movies-popular`);
  }

  addFavourite(data: Favourite) {
    return this.http.post<Favourite>(`${this.apiURL}/favorites`, data);
  }

  getFavourites() {
    const user = localStorage.getItem('user');
    const userId = JSON.parse(user!).user.id;

    return this.http.get<Favourite[]>(
      `${this.apiURL}/favorites?userId=${userId}`
    );
  }
}
