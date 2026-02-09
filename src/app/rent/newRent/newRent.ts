import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerModel } from '../../models/customer.model';
import { RentListModel } from '../../models/rent.list.model';
import { BehaviorSubject, debounceTime, switchMap, of } from 'rxjs';
import { form, FormField } from '@angular/forms/signals';
import { LoginService } from '../../services/login.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {  DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import {MatTimepickerModule} from '@angular/material/timepicker';
@Component({
  selector: 'app-rent',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FormField, MatFormFieldModule, MatInputModule, MatDatepickerModule,MatTimepickerModule,MatAutocompleteModule],
  templateUrl: './newRent.html',
  styleUrl: './newRent.scss'
})
export class newRent implements OnInit {

  // Control del input
  searchControl = new FormControl('');

 //behaviour subject es un obvserable especial que guarda el ultimo valor emitido y permite vaciarlo o actualizar con next([])
  //se inicializa vacio porque al cargar la pagina no buscamos nada todavia
 filteredItems$ = new BehaviorSubject<CustomerModel[]>([]);

  // Modelo de renta
  newRentModel = signal<RentListModel>({
    deliveryDate: null,
    withdrawalDate: null,
    eventAddress: '',
    customerId: 0,
    requestingUserId:0,
    deliveryTime: null,
    withdrawalTime: null
  });

  newRentForm = form(this.newRentModel);

  constructor(
    private readonly dashboardService: DashboardService,
    private readonly router: Router,
    private readonly loginService: LoginService
  ) {}

  ngOnInit(): void {

    const user = this.loginService.currentUser();
    console.log('user',user);
    if (user) {
      this.newRentModel.update(rent => ({
        ...rent,
        requestingUserId: user.userId
      }));
    }
    // Suscripción al input de búsqueda
    this.searchControl.valueChanges//observable que emite cada vez que cambia el valor del input
      .pipe(
        debounceTime(300),//espera 300ms después de escribir antes de enviar la búsqueda , evita demasiadas llamadas al backend
        switchMap(value => {//Para cada valor del input
          const term = (value ?? '').trim();//Normalizamos null
          if (!term) {
            // Si no hay texto, limpiamos la lista
            this.filteredItems$.next([]);
            return of([]);
          }
          // Llamada al backend si hay texto
          return this.dashboardService.searchCustomers(term);
        })
      )
      .subscribe(customers => {//Cuando se recibe la respuesta del backend se actualiza la lista de sugerencias
        this.filteredItems$.next(customers);
      });
  }



  // Seleccionar cliente
  selectCustomer(customer: CustomerModel) {
    if (!customer?.idCustomer) return;

    // Guardamos el ID del customer en la nueva renta
    this.newRentModel.update(rent => ({
      ...rent,
      customerId: customer.idCustomer
    }));

    // Mostramos el nombre en el input
    this.searchControl.setValue(customer.name, { emitEvent: false });

    // Limpiamos la lista de sugerencias
    this.filteredItems$.next([]);
  }

newRent() {
  const rent = this.newRentModel();

   const rentToSend = {
    ...this.newRentModel(),
    deliveryDate: this.formatDateToString(this.newRentModel().deliveryDate),  // Formato YYYY-MM-DD
    withdrawalDate: this.formatDateToString(this.newRentModel().withdrawalDate),  // Formato YYYY-MM-DD
    deliveryTime: this.formatTimeToString(this.newRentModel().deliveryTime),  // Formato HH:mm
    withdrawalTime: this.formatTimeToString(this.newRentModel().withdrawalTime), // Formato HH:mm
  };
  console.log('Rent model armado:', rentToSend);

  this.dashboardService.newRent(rentToSend).subscribe({
    next: () => {
      console.log('Rent creado correctamente');
      this.router.navigate(['/dashboard/rent']);
    },
    error: err => console.error('Error creando rent:', err)
  });
}


// Método para formatear la fecha, verificando si es string o null
formatDateToString(date: string | Date | null): string {
  if (date === null) return ''; // O puedes devolver null o el valor predeterminado que prefieras
  if (typeof date === 'string') return date; // Si ya es un string, lo devolvemos tal cual
  return date.toISOString().split('T')[0];  // Si es un Date, lo formateamos a 'YYYY-MM-DD'
}

// Método para formatear la hora, verificando si es un string o null
formatTimeToString(time: string | Date | null): string {
  if (time === null) return ''; // O puedes devolver null o el valor predeterminado que prefieras
  if (typeof time === 'string') return time; // Si ya es un string, lo devolvemos tal cual
  return time.toISOString().split('T')[1].slice(0, 5);  // Si es un Date, lo formateamos a 'HH:mm'
}
returnRent() {
  this.router.navigate(['/dashboard/rent']);
}
}