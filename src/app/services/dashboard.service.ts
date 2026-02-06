import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoginDto } from '../models/login-dto.model';

import { environment } from '../../environment';
import { UserModel } from '../models/user.model';
import { ProductModel } from '../models/product.model';
import { CustomerModel } from '../models/customer.model';
import { RentModel } from '../models/rent.model';
import { Rent } from '../rent/rent';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private appURL = environment.API_URL;
  private rentURL = `${this.appURL}/rent`;
  private userURL = `${this.appURL}/user`;
  private productURL = `${this.appURL}/product`;
  private customerURL = `${this.appURL}/customer`;

  constructor(private http: HttpClient) {}

  // Rent Methods
  getRents() {
    return this.http.get<RentModel[]>(`${this.rentURL}/allRents`, { withCredentials: true });
  }

  // User Methods
  getUsers() {
    return this.http.get<UserModel[]>(`${this.userURL}`, { withCredentials: true });
  }

  // Product Methods
  getProducts() {
    return this.http.get<ProductModel[]>(`${this.productURL}`, { withCredentials: true });
  }

  // Customer Methods
  getCustomers() {
    return this.http.get<CustomerModel[]>(`${this.customerURL}`, { withCredentials: true });
  }


  newRent(rentDto:RentModel){
    return this.http.post<RentModel>(`${this.rentURL}/newRent`,rentDto,{withCredentials:true});
  }
  

}
