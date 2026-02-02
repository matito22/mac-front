import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
 import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,MatSidenavModule,MatCardModule,MatIconModule,MatToolbarModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export default class Dashboard {
  constructor(private loginService: LoginService, private router: Router) {}


  
//LLamamos al endpoint de logout del backend para cerrar sesion y eliminar ambos token de cookie
clickLogout(event: MouseEvent) {
  this.loginService.logout().subscribe({
    next: () => {
      this.router.navigate(['/login']);
    },
    error: err => console.error(err)
  });
}


}
