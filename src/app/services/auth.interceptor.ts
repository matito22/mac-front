import { HttpInterceptorFn } from '@angular/common/http';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';

//Auth interceptor actua cuando ya se realizo una request , Authguard actua incluso antes de realizar la request, desde router
//Nos refresca el token si ya estamos logueados, para no tener que salir y volver a entrar

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const http = inject(HttpClient);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {//Todas las request y response pasan por aquí

      if (error.status === 401 && !req.url.includes('auth/refresh')) {//Si devuelve un 401 unauthorized entramos , no debe ser refresh sino entra en un loop infinito

        // 🔁 llamamos refresh (cookies viajan solas)
        return http.post<any>('http://localhost:3000/auth/refresh',{},{ withCredentials: true }).pipe(
          switchMap(() => {
            
            return next(req);//Si refresh sale bien, continuamos con la request que habia dado error
          }),
          catchError(err => {
            // Si refresh falla, es porque token expiro, refreshtoken no existe y sigue el error 401 , session muerta, redirigimos a login
            window.location.href = '/login';//Redireccionamos a login
            return throwError(() => err);
          })
        );
      }

      return throwError(() => error);
    })
  );
};
