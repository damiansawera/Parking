import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from "../header/header.component";
import { CarService } from '../../services/car-service/car.service';
import { NgFor } from '@angular/common';
import { CarMakes } from '../../enums/car-makes';
import { MatFormField } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [
        SidebarComponent,
        HeaderComponent,
        NgFor,
        MatFormField,
        MatSelect,
        MatOption
    ]
})
export class HomeComponent {
    parkedCars: any[] = [];
    carMakes: string[] = [];
    selectedCarMake: string | null = null;
    filteredCarCount: number = 0;

    constructor(private carService: CarService) {}

    ngOnInit(): void {
        this.fetchParkedCars();
        this.loadCarMakes();
    }

    fetchParkedCars() {
        this.carService.getParkedCars().subscribe((data: any[]) => {
            this.parkedCars = data;
            this.filterCarsByMake();
        });
    }

    loadCarMakes(): void {
        this.carService.getCarMakes().subscribe((data: string[]) => {
            this.carMakes = data;
        });
    }

    filterCarsByMake(): void {
        if (this.selectedCarMake) {
            this.filteredCarCount = this.parkedCars.filter(car => car.vehicleMake === this.selectedCarMake).length;
        } else {
            this.filteredCarCount = this.parkedCars.length;
        }
    }
    
    getVehicleImage(make: keyof typeof CarMakes): string {
        return CarMakes[make];
      }
}
