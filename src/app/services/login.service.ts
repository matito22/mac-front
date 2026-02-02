import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoginDto } from '../models/login-dto.model';
import { User } from '../models/user.model';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private appURL = environment.API_URL; //URL del backend
  private apiURL= `${this.appURL}/auth`;//URL del backend para login

  constructor(private http: HttpClient) {}

  //LLamamos al login del backend
  login(loginDto: LoginDto) {
     return this.http.post(`${this.apiURL}/login`, loginDto,{withCredentials:true});
    }
    
    //Llamamos al endpoint de perfil del backend
  getProfile() {
    return this.http.get<User>(`${this.apiURL}/profile`,{withCredentials:true});
  }

  
  logout(){
    return this.http.post(`${this.apiURL}/logout`,{},{withCredentials:true});
  }

  

}
