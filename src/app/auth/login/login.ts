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
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from "@angular/common/http";



@Component({
  selector: 'app-login',//identificador component
  standalone:true,
  imports: [CommonModule, FormField,MatToolbarModule,MatInputModule,MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})


export default class Login {

  constructor(private loginService: LoginService) {}


    loginModel = signal({
    name: '',
    password: '',
  });

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

     this.loginService.login(loginDto).subscribe((user)=>{
      console.log('Usuario logueado',user);
    });
  }

 
}
