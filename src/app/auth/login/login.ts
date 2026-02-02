import { CommonModule } from "@angular/common";
import { Component, signal, inject } from "@angular/core";
import {form,required,FormField,minLength} from '@angular/forms/signals';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from '../../services/login.service';
import { LoginDto } from '../../models/login-dto.model';
import { Router } from '@angular/router';//Importamos la clase Router de angular
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@Component({
  selector: 'app-login',//identificador component
  standalone:true,
  imports: [CommonModule, FormField,MatToolbarModule,MatInputModule,MatCardModule, MatIconModule, MatButtonModule,MatProgressSpinnerModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})


export default class Login {

  constructor(private loginService: LoginService,private router: Router) {}

  //Creamos un objeto de tipo signal que contendrá los campos del formulario
    loginModel = signal({
    name: '',
    password: '',
    });
    //Creamos un objeto de tipo signal que contendrá el estado del campo de contraseña
    hide = signal(true);

    loginForm = form(this.loginModel,(path)=>{
      //REQUERIMIENTOS PARA NAME
      required(path.name,{message:'The user was not entered'});
      minLength(path.name,5,{message:'The name must be longer than 5 characters'});
      
      //REQUERIMIENTOS PARA PASSWORD
      required(path.password,{message:'The password was not entered'});
      minLength(path.password,8,{message:'The key must contain more than 8 characters'})

      

    });


  onSubmit(event: Event) {
    event.preventDefault();
    const { name, password } = this.loginModel();
    const loginDto = new LoginDto(name, password);

    this.loginService.login(loginDto).subscribe({
    next: (res) => {
      console.log("Usuario logueado, token en cookie");
      this.router.navigate(['/dashboard']);
    },
    error: (err) => {
      console.error(err);
    }
  });
  //Llamamos al endpoint de perfil del backend para probar si el usuario logueado es correcto
    this.loginService.getProfile().subscribe((user)=>{
      console.log('Usuario logueado',user);
    });
  }

 //Función para ocultar la contraseña
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());//Cambiamos el estado del campo de contraseña
    event.stopPropagation();//Evitamos que se dispare el evento click del botón
  }

  
}
