import { Component, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RentModel } from '../models/rent.model';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-rent',
  standalone: true,
  imports: [CommonModule,MatToolbarModule,MatTableModule, RouterModule, MatCardModule, MatIconModule],
  templateUrl: './rent.html',
  styleUrl: './rent.scss',
})
export class Rent implements OnInit {


  constructor(private dashboardService:DashboardService) {
  }

  displayedColumns: string[] = [
  'idRent',
  'customer',
  'deliveryDate',
  'withdrawalDate',
  'rentalDays',
  'eventAddress',
  'state',
  'totalAmount',
  'lastModificationDate'
];

  rents = signal<RentModel[]>([]);

  
  ngOnInit() {
    console.log('ngOnInit ejecutado en Rent component');
    this.dashboardService.getRents().subscribe({
      next: data => {
        console.log('Datos recibidos de getRents:', data);
        this.rents.set(data);
        
      },
      error: err => {
        console.error('Error en getRents:', err);
      }
    });
  }
}
