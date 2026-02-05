import { Component, OnInit, signal } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-rent',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatIconModule],
  templateUrl: './rent.html',
  styleUrl: './rent.scss',
})
export class Rent implements OnInit {


  constructor(private dashboardService:DashboardService) {
  }

  rents = signal<any[]>([]);

  
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
