import {HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { LoginService } from "../../services/login.service";

//Interceptor entre el cliente y el servidor
//Angular detecta que este interceptor se ha registrado y lo aplica en todas las peticiones
export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const loginService=inject(LoginService);
    const token = loginService.getAuthToken();

    const authReq = req.clone({//Clona el objeto de la peticion
        setHeaders: {//Establece los headers
            Authorization: `Bearer ${token}`//El token que se obtuvo de loginService
        }//Todas mis request al backend tendran automaticamente el token
        //Sin esto, las peticiones saldrian sin token y no se podrian realizar
    })
    
    return next(authReq);
}