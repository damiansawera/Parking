import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SpotsComponent } from './components/spots/spots.component';
import { LoginComponent } from './components/login/login.component';
import { MyBookingsComponent } from './components/my-bookings/my-bookings.component';
import { RegisterComponent } from './components/register/register.component';
import { MyAccountComponent } from './components/my-account/my-account.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'spots', component: SpotsComponent},
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'my-bookings', component: MyBookingsComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'my-account', component: MyAccountComponent}
];
