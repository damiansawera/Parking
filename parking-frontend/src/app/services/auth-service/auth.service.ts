import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:8080/auth/login';

  private loggedInSubject = new BehaviorSubject<boolean>(false);
  public loggedIn$ = this.loggedInSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string) {
    return this.http.post(this.loginUrl, { username, password }, { observe: 'response', responseType: 'text' })
      .pipe(
        tap(() => {
          console.log('Login successful');
          this.loggedInSubject.next(true);
          this.router.navigate(['/']);
          console.log(this.loggedIn$)
        }),
        catchError(error => {
          console.error('Login failed', error);
          return of(error);
        })
      );
  }

  logout(): void {
    this.loggedInSubject.next(false);
    this.router.navigate(['/']);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn$;
  }
}
