import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoginDto } from '../models/login-dto.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/auth'; // Adjust the base URL as needed

  constructor(private http: HttpClient) {}


  login(loginDto: LoginDto) {
     return this.http.post<User>(`${this.apiUrl}/login`, loginDto);
    }

    getAuthToken() {
      return localStorage.getItem('authToken') || '';
    }

}
