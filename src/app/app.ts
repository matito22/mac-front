import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, signal, OnDestroy } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { NgIf } from '@angular/common';
import { LoginService } from './services/login.service';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MatToolbarModule,MatIconModule,NgIf],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('mac-front');
  showHeader = true;
  private _subs: any;

  constructor(private loginService: LoginService, private router: Router) {
    this._subs = this.router.events.subscribe((ev: any) => {
      if (ev instanceof NavigationEnd) {
        this.showHeader = !this.router.url.includes('/login');
      }
    });
  }

  ngOnDestroy(): void {
    if (this._subs) this._subs.unsubscribe();
  }


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
