import { Routes } from '@angular/router';
import Login from './auth/login/login';
import Dashboard from './dashboard/dashboard';

export const routes: Routes = [

    {path:'',redirectTo:'/login',pathMatch:'full'},//Redirigo a login si pones el local host
    { path: 'login',component:Login},
    { path: 'dashboard', component: Dashboard },

    

    

];
