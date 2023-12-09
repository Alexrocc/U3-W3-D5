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
  check: any;

  constructor(private moviesSrv: MoviesService, private http: HttpClient) {}

  async ngOnInit() {
    await this.moviesSrv.fetchMovies().subscribe((movieArr: Movie[]) => {
      this.movies = movieArr;
    });

    this.moviesSrv.getFavourites().subscribe((favourites: Favourite[]) => {
      this.favouriteArr = favourites;
      console.log(this.favouriteArr);
      this.favouriteArr!.forEach((e) => {
        this.check = this.movies?.filter((movie) => e.movieId === movie.id);
        console.log(this.check);
      });
    });
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
