import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { Favourite } from 'src/app/models/favourite';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  userId!: number;
  movies!: Movie[] | undefined;
  favouriteArr!: Favourite[];

  constructor(private moviesSrv: MoviesService) {}

  ngOnInit() {
    this.moviesSrv.fetchMovies().subscribe((movieArr: Movie[]) => {
      this.movies = movieArr;
      let userData = localStorage.getItem('user');
      if (userData) {
        let user = JSON.parse(userData);
        let userId = user.user.id;
        this.userId = userId;
        console.log(userId);
      }
      this.getFavourites();
    });
  }

  getFavourites() {
    this.moviesSrv.getFavourites().subscribe((favourites: Favourite[]) => {
      this.favouriteArr = favourites;
      console.log(this.favouriteArr);
    });
  }
  checkFav(id: number): boolean {
    return (
      Array.isArray(this.favouriteArr) &&
      this.favouriteArr.some((e) => e.movieId === id)
    );
  }
  handleFav(movieId: number) {
    if (this.checkFav(movieId)) {
      let foundMovie: any = this.favouriteArr.find(
        (movie) => movie.movieId === movieId
      );
      if (foundMovie) {
        this.removeFavorite(foundMovie.id);
      }
    } else {
      this.addFavorite(movieId);
    }
  }
  addFavorite(movieId: number) {
    this.moviesSrv.addFavourite(this.userId, movieId).subscribe(() => {
      this.getFavourites();
    });
  }

  removeFavorite(movieId: number) {
    this.moviesSrv.removeFavourite(movieId).subscribe(() => {
      this.getFavourites();
    });
  }
}
