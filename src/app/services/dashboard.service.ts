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
export class DashboardService {
  private appURL = environment.API_URL; //URL del backend
  private apiURL= `${this.appURL}/rent`;//URL del backend para login

  rents: any[];

  constructor(private http: HttpClient) {
    this.rents = [];
  }


    

  getRents() {
    return this.http.get<any[]>(`${this.apiURL}/allRents`,{withCredentials:true});
  }



  

}
