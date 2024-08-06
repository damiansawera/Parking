import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from "../header/header.component";
import { CarService } from '../../services/car-service/car.service';
import { NgFor } from '@angular/common';
import { CarMakes } from '../../enums/car-makes';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { BookingService } from '../../services/booking-service/booking.service';
import { BookingChartComponent } from '../chart/chart.component';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [
        SidebarComponent,
        HeaderComponent,
        BookingChartComponent,
        NgFor,
        MatFormField,
        MatSelect,
        MatOption,
        MatLabel
    ]
})
export class HomeComponent {
    parkedCars: any[] = [];
    carMakes: string[] = [];
    selectedCarMake: string | null = null;
    filteredCarCount: number = 0;
    bookingData: { date: string; bookings: number }[] = [];
    months: string[] = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    selectedMonth: string = this.months[new Date().getMonth()];
  

    constructor(private carService: CarService, private bookingService: BookingService) {}

    ngOnInit(): void {
        this.fetchParkedCars();
        this.loadCarMakes();
    }

    getMonthNumber(monthName: string): number {
        return this.months.indexOf(monthName) + 1;
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

      loadBookingData(month: string) {
        const monthNumber = this.getMonthNumber(month);
        this.bookingService.getMonthlyBookingData(monthNumber).subscribe(data => {
          this.bookingData = this.transformBookingData(data);
        });
      }

      transformBookingData(data: any[]): { date: string; bookings: number }[] {
        return data.map(entry => {
          const day = entry[0]; 
          const count = entry[1];
          const date = `${this.months[this.getMonthNumber(this.selectedMonth) - 1]} ${day}`;
          return { date, bookings: count };
        });
      }

      updateChart() {
        this.loadBookingData(this.selectedMonth);
        }
}
