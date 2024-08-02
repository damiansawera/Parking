import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:8080/auth/login';
  private registerUrl = 'http://localhost:8080/auth/register';
  private refreshUrl = 'http://localhost:8080/auth/refresh';
  private tokenRefreshInterval = 400000;

  private loggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  public loggedIn$ = this.loggedInSubject.asObservable();

  private tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('token'));
  public token$ = this.tokenSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.startTokenRefreshTimer();
   }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  login(username: string, password: string) {
    return this.http.post(this.loginUrl, { username, password }, { observe: 'response'})
      .pipe(
        tap(response => {
          this.setSession(response);
          this.loggedInSubject.next(true);
          this.router.navigate(['/']);
        }),
        catchError(error => {
          console.error('Login failed', error);
          return of(error);
        })
      );
  }

  register(user: User) {
    console.log("starting to send");
    return this.http.post(this.registerUrl, user, {observe: 'response' })
    .pipe(
      tap(() => {this.router.navigate(['/']);
  }),
  catchError(error => {
    console.error('Registration failed', error);
    return of(error);
  })
);
  }

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refreshToken');
    return this.http.post<any>(this.refreshUrl, { refreshToken }, {observe: 'response'})
      .pipe(
        tap(response => {
          this.setSession(response);
        }),
        catchError(error => {
          console.error('Refresh token failed', error);
          this.logout();
          throw error;
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    this.loggedInSubject.next(false);
    this.router.navigate(['/']);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn$;
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.tokenSubject.next(token);
  }

  private setSession(authResult: any): void {
    const body = authResult.body as any;
    this.setToken(body.accessToken);
    localStorage.setItem('refreshToken', body.refreshToken);
  }
  
  private startTokenRefreshTimer(): void {
    interval(this.tokenRefreshInterval).subscribe(() => {
      if (this.hasToken()) {
        this.refreshToken().subscribe(
          response => console.log('Token refreshed successfully'),
          error => console.error('Token refresh failed')
        );
      }
    });
  }
}
