import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth-service/auth.service';

const publicUrls = [
  '/car/all',
  '/parking-spot',
  '/car-brands',
  '/auth/login',
  '/auth/refresh'
];

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);
  const authToken = authService.getToken();

  const isPublicUrl = publicUrls.some(url => req.url.includes(url));

  if (authToken && !isPublicUrl) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + authToken)
    });
    return next(authReq);
  }
  return next(req);
};
