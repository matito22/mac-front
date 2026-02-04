import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterOutlet } from '@angular/router';
import { LoginService } from './services/login.service';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MatToolbarModule,MatIconModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('mac-front');
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
