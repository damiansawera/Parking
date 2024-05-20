import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from "../header/header.component";
import { CarService } from '../../services/car-service/car.service';
import { NgFor } from '@angular/common';
import { CarMakes } from '../../enums/car-makes';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [
        SidebarComponent,
        HeaderComponent,
        NgFor
    ]
})
export class HomeComponent {
    parkedCars: any[] = [];

    constructor(private carService: CarService) {}

    ngOnInit(): void {
        this.fetchParkedCars();
    }

    fetchParkedCars() {
        this.carService.getParkedCars().subscribe((data: any[]) => {
            this.parkedCars = data;
        });
    }
    
    getVehicleImage(make: keyof typeof CarMakes): string {
        return CarMakes[make];
      }
}
