import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { Favourite } from 'src/app/models/favourite';
import { MoviesService } from 'src/app/services/movies.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  apiURL = environment.apiURL;
  movies!: Movie[] | undefined;
  favouriteArr!: Favourite[] | undefined;

  constructor(private moviesSrv: MoviesService, private http: HttpClient) {}

  ngOnInit(): void {
    this.moviesSrv.fetchMovies().subscribe((movieArr: Movie[]) => {
      this.movies = movieArr;
    });

    this.moviesSrv.getFavourites().subscribe((favourites: Favourite[]) => {
      this.favouriteArr = favourites;
    });
  }
}
