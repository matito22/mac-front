import {HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { LoginService } from "../../services/login.service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const loginService=inject(LoginService);
    const token = loginService.getAuthToken();

    const authReq = req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
    })

    return next(authReq);
}