import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

//Intercepta TODAS las peticiones HTTP de Angular antes de que salgan
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const isAuthEndpoint = req.url.includes('/api/auth/login');

  if (isAuthEndpoint) {
    return next(req);
  }

  const token = localStorage.getItem('token');

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next(cloned);
  }

  return next(req);
};
