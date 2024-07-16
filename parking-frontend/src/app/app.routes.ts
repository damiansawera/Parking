import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SpotsComponent } from './components/spots/spots.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'spots', component: SpotsComponent},
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent}
];
