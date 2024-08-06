import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth-service/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const publicUrls = [
    '/car/all',
    '/parking-spot/all',
    '/car-brands',
    '/auth/login',
    '/auth/refresh',
    '/payu/notify',
    '/document/generate'
  ];

  if (publicUrls.some(url => req.url.includes(url))) {
    return next(req);
  }

  const token = authService.getToken();
  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return next(req).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return authService.refreshToken().pipe(
          switchMap((newToken) => {
            req = req.clone({
              setHeaders: { Authorization: `Bearer ${newToken}` }
            });
            return next(req);
          }),
          catchError((refreshError) => {
            authService.logout();
            return throwError(() => refreshError);
          })
        );
      }
      return throwError(() => error);
    })
  );
};