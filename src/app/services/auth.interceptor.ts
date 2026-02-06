import { HttpInterceptorFn, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const http = inject(HttpClient);
  const router = inject(Router);
  
  const API_URL = 'http://localhost:3000';

  // 1. CLONAMOS LA PETICIÓN ORIGINAL
  // Importante el withCredentials para que el navegador envíe las Cookies (Access Token / Refresh Token) al servidor.
  const authReq = req.clone({
    withCredentials: true,
  });

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      
      // 2. VERIFICAMOS SI EL ERROR ES 401 (UNAUTHORIZED)
      // Importante: No intentamos refrescar si la petición ya era el 'refresh' o el 'login' para evitar bucles infinitos.
      const isRefreshRequest = req.url.includes('/auth/refresh');
      const isLoginRequest = req.url.includes('/auth/login');

      if (error.status === 401 && !isRefreshRequest && !isLoginRequest) {
        
        // 3. INTENTAMOS REFRESCAR EL TOKEN
        // Enviamos un POST vacío al endpoint de refresh.NestJS recibirá la cookie del Refresh Token automáticamente.
       return http.post<any>(`${API_URL}/auth/refresh`, {}, { withCredentials: true }).pipe(

          switchMap(() => {
            // Si el refresh sale bien, reintentamos la petición original pero esta vez el navegador ya tiene la nueva cookie de access_token.
            return next(authReq);
          }),
          catchError((refreshError) => {
            // 4. SI EL REFRESH TAMBIÉN FALLA (por ejemplo: Refresh Token expirado). Limpiamos todo y mandamos al usuario al login.
            router.navigate(['/login']);
            return throwError(() => refreshError);
          })
        );
      }

      // Si es cualquier otro error (404, 500, etc.), lo lanzamos normalmente
      return throwError(() => error);
    })
  );
};