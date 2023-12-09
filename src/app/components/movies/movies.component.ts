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
  isFav!: any;

  constructor(private moviesSrv: MoviesService, private http: HttpClient) {}

  ngOnInit() {
    this.moviesSrv.fetchMovies().subscribe((movieArr: Movie[]) => {
      this.movies = movieArr;
    });

    this.moviesSrv.getFavourites().subscribe((favourites: Favourite[]) => {
      this.favouriteArr = favourites;
    });

    setTimeout(() => {
      this.favouriteArr?.forEach((e) => {
        //  this.isFav = this.movies!.includes(e.movieId)
      });
    }, 1000);
  }
  addFavorite(movieId: number) {
    const user = localStorage.getItem('user');
    const userId = JSON.parse(user!).user.id;
    this.moviesSrv.addFavourite({ userId, movieId }).subscribe();
    setTimeout(() => {
      this.moviesSrv.getFavourites().subscribe((favourites: Favourite[]) => {
        this.favouriteArr = favourites;
      });
      console.log(this.favouriteArr);
    }, 1000);
  }
}
