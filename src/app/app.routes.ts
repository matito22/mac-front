import { Routes } from '@angular/router';
import Login from './auth/login/login';
import Dashboard from './dashboard/dashboard';
import { Rent } from './rent/rent';
import { AuthGuard } from './guards/auth.guard';
import { User } from './user/user';
import { Product } from './product/product';
import { Customer } from './customer/customer';
import { newRent } from './rent/newRent/newRent';

export const routes: Routes = [

    {path:'',redirectTo:'/login',pathMatch:'full'},//Redirigo a login si pones el local host
    { path: 'login',component:Login},
    { 
        path: 'dashboard', 
        component: Dashboard, 
        canActivate: [AuthGuard],       // protege el padre
        canActivateChild: [AuthGuard],  // protege los hijos
        children: [
            { path: 'rent', component: Rent },
            { path: 'rent/newRent', component: newRent },//new rent es hermano de rent para que pueda desaparecer el html de rent y aparezca el formulario de newRent
            { path: 'users', component: User },
            { path: 'products', component: Product },
            { path: 'customers', component: Customer },
        ] 
        }

 

    

    

];
