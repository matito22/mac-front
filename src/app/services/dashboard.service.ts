import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoginDto } from '../models/login-dto.model';

import { environment } from '../../environment';
import { UserModel } from '../models/user.model';
import { ProductModel } from '../models/product.model';
import { CustomerModel } from '../models/customer.model';
import { RentModel } from '../models/rent.model';
import { Rent } from '../rent/rent';
import { RentListModel } from '../models/rent.list.model';

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


  newRent(rentDto:RentListModel){
    return this.http.post<RentListModel>(`${this.rentURL}/newRent`,rentDto,{withCredentials:true});
  }

   // Busca customers en el backend
// dashboard.service.ts
searchCustomers(search: string) {
  let params = new HttpParams().set('search', search);
  return this.http.get<CustomerModel[]>(`${this.customerURL}/search`, { params, withCredentials: true });
}



  

}
