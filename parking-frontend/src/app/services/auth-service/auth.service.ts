import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:8080/auth/login';
  private registerUrl = 'http://localhost:8080/auth/register';
  private refreshUrl = 'http://localhost:8080/auth/refresh';
  private tokenRefreshInterval = 300000;

  private loggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  public loggedIn$ = this.loggedInSubject.asObservable();

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

  register(username: string, password: string, email: string) {
    return this.http.post(this.registerUrl, {username, password, email}, {observe: 'response' })
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
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  private setSession(authResult: any): void {
    const body = authResult.body as any;
    localStorage.setItem('token', body.accessToken);
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
