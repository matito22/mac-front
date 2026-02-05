import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DashboardService } from '../services/dashboard.service';
import { Router, RouterModule } from '@angular/router';
import { RentModel } from '../models/rent.model';
import { form } from '@angular/forms/signals';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,MatSidenavModule,MatCardModule,MatIconModule,MatToolbarModule,RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export default class Dashboard {
  constructor(private dashboardService:DashboardService) {}


}