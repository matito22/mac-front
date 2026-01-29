import { CommonModule } from "@angular/common";
import { Component, signal } from "@angular/core";
import {form,required,FormField,minLength} from '@angular/forms/signals';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';



@Component({
  selector: 'app-login',//identificador component
  standalone:true,
  imports: [CommonModule, FormField,MatToolbarModule,MatInputModule,MatCardModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})


export default class Login {

    loginModel = signal({
    name: '',
    password: '',
  });

  loginForm = form(this.loginModel,(path)=>{
    required(path.name,{message:'El usuario no fue ingresado'});
    minLength(path.name,5,{message:'El nombre debe tener mas de 5 caracteres'});

  });


  onSubmit(event:Event){
    event.preventDefault();

    console.log({
      model: this.loginModel(),
      form: this.loginForm().value(),
      valid:this.loginForm().value(),
      invalid: this.loginForm().invalid(),
      nameErrors:this.loginForm.name().errors(),
  })
  }
}
