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
  userId!: number;
  apiURL = environment.apiURL;
  movies!: Movie[] | undefined;
  favouriteArr!: Favourite[];

  constructor(private moviesSrv: MoviesService, private http: HttpClient) {}

  ngOnInit() {
    this.moviesSrv.fetchMovies().subscribe((movieArr: Movie[]) => {
      this.movies = movieArr;
      let userData = localStorage.getItem('user');
      this.userId = JSON.parse(userData!).user.id;
      this.getFavourites();
    });
  }

  getFavourites() {
    this.moviesSrv.getFavourites().subscribe((favourites: Favourite[]) => {
      this.favouriteArr = favourites;
    });
  }

  addFavorite(movieId: number) {
    let userId = this.userId;
    this.moviesSrv.addFavourite({ userId, movieId }).subscribe(() => {
      this.getFavourites();
    });
  }

  removeFavorite(movieId: number) {
    this.moviesSrv.removeFavourite(movieId).subscribe(() => {
      this.getFavourites();
    });
  }

  checkFav(id: number): boolean {
    return (
      Array.isArray(this.favouriteArr) &&
      this.favouriteArr!.some((e) => e.movieId === id)
    );
  }

  handleFav(movieId: number) {
    if (this.checkFav(movieId)) {
      let foundMovie: any = this.favouriteArr.find(
        (movie) => movie.movieId === movieId
      );

      if (foundMovie) {
        this.removeFavorite(foundMovie.id);
      } else {
        this.addFavorite(movieId);
      }
    }
  }
}
