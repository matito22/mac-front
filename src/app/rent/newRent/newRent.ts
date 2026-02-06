import { Component, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentModel } from '../../models/rent.model';
import { form, FormField } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-rent',
  standalone: true,
  imports: [CommonModule,FormsModule,FormField],
  templateUrl: './newRent.html',
  styleUrl: './newRent.scss'
})
export class newRent {

  constructor(private readonly dashboardService:DashboardService,private readonly router: Router) {
  }

newRentModel= signal<RentModel>(
  {
    idRent: 0,
    customer: {
      idCustomer: 0,
      name: '',
      phone: '',
      address: '',
      type: ''
    },
    deliveryDate: '',
    eventAddress: '',
    state: '',
    totalAmount: 0,
    rentalDays: 0,
    withdrawalDate: '',
    lastModificationDate: ''
  }
);

newRentForm = form(this.newRentModel,()=>{

});


  newRent(){
   const rentDdto:RentModel = this.newRentModel();

   this.dashboardService.newRent(rentDdto).subscribe({
    next: (res) => {
      console.log("Rent creado, token en cookie");
      // NO guardar res en localStorage
      // el token debe estar SOLO en cookies
      
      this.router.navigate(['/dashboard']);
    },
    error: (err) => {
      console.error('Error creando rent:', err);
    }
  });
  
    
  }



}
