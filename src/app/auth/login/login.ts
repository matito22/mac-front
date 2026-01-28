import { Component } from '@angular/core';
import { MatCard } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatToolbar } from "@angular/material/toolbar";

@Component({
  selector: 'app-login',
  imports: [MatCard, MatInputModule, MatToolbar],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export default class Login {

}
