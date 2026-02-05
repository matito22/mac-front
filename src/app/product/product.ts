import { Component, OnInit, signal } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ProductModel } from '../models/product.model';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatIconModule],
  templateUrl: './product.html',
  styleUrl: './product.scss',
})
export class Product implements OnInit {

   products = signal<ProductModel[]>([]);

   
  

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    console.log('ngOnInit ejecutado en Product component');
    this.dashboardService.getProducts().subscribe({
      next: data => {
        console.log('Datos recibidos de getProducts:', data);
        this.products.set(data);
      },
      error: err => {
        console.error('Error en getProducts:', err);
      }
    });
  }
}
