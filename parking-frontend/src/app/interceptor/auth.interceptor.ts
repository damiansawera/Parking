import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable, switchMap, take } from 'rxjs';
import { AuthService } from '../services/auth-service/auth.service';

const publicUrls = [
  '/car/all',
  '/parking-spot/all',
  '/car-brands',
  '/auth/login',
  '/auth/refresh'
];

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);
  const isPublicUrl = publicUrls.some(url => req.url.includes(url));

  if (isPublicUrl) {
    return next(req);
  }

  return authService.token$.pipe(
    take(1),
    switchMap(token => {
      if (token) {
        const authReq = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
        return next(authReq);
      }
      return next(req);
    })
  );
};