import { Routes } from '@angular/router';
import Login from './auth/login/login';

export const routes: Routes = [

    {path:'',redirectTo:'/login',pathMatch:'full'},//Redirigo a login si pones el local host
    {   path: 'login',component:Login}
];
