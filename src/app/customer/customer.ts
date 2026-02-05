import { Component, OnInit, signal } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CustomerModel } from '../models/customer.model';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatIconModule],
  templateUrl: './customer.html',
  styleUrl: './customer.scss',
})
export class Customer implements OnInit {
  
  customers = signal<CustomerModel[]>([]);
  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    console.log('ngOnInit ejecutado en Customer component');
    this.dashboardService.getCustomers().subscribe({
      next: data => {
        console.log('Datos recibidos de getCustomers:', data);
        this.customers.set(data);
      },
      error: err => {
        console.error('Error en getCustomers:', err);
      }
    });
  }
}
