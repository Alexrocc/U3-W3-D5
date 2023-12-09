import { Injectable } from '@angular/core';
import { AuthData } from './auth-data';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap, catchError, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwtHelper = new JwtHelperService();
  apiURL = environment.apiURL;

  private authSubj = new BehaviorSubject<null | AuthData>(null);
  user$ = this.authSubj.asObservable();

  user!: AuthData;

  constructor(private http: HttpClient, private router: Router) {}

  login(data: { email: string; password: string }) {
    return this.http.post<AuthData>(`${this.apiURL}/login`, data).pipe(
      tap((isLogged) => {
        this.authSubj.next(isLogged);
        this.user = isLogged;
        localStorage.setItem('user', JSON.stringify(isLogged));
        this.router.navigate(['/']);
      }),
      catchError(this.errors)
    );
  }

  register(data: { name: string; email: string; password: string }) {
    return this.http.post(`${this.apiURL}/signup`, data).pipe(
      tap(() => {
        this.router.navigate(['login']), catchError(this.errors);
      })
    );
  }

  logout() {
    this.authSubj.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

  restore() {
    const user = localStorage.getItem('user');
    if (!user) {
      this.router.navigate(['login']);
      return;
    }
    const userData: AuthData = JSON.parse(user);
    if (this.jwtHelper.isTokenExpired(userData.accessToken)) {
      this.router.navigate(['login']);
      return;
    }
    this.authSubj.next(userData);
  }

  private errors(error: any) {
    switch (error.error) {
      case 'Email already exists':
        return throwError('Email already in use');
        break;

      case 'Email format is invalid':
        return throwError('Email is invalid');
        break;

      case 'Cannot find user':
        return throwError('This user cannot be found');

      default:
        return 'Response error';
    }
  }
}
