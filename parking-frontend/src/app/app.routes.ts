import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SpotsComponent } from './components/spots/spots.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'spots', component: SpotsComponent},
    {path: '', component: HomeComponent}
];
