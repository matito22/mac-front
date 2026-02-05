import { Component, OnInit, signal } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { UserModel } from '../models/user.model';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatIconModule],
  templateUrl: './user.html',
  styleUrl: './user.scss',
})
export class User implements OnInit {
 
 users = signal<UserModel[]>([]);
  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    console.log('ngOnInit ejecutado en User component');
    this.dashboardService.getUsers().subscribe({
      next: data => {
        console.log('Datos recibidos de getUsers:', data);
        this.users.set(data);
      },
      error: err => {
        console.error('Error en getUsers:', err);
      }
    });
  }
}
