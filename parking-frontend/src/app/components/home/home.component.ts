import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from "../header/header.component";
import { CarService } from '../../services/car-service/car.service';
import { NgFor } from '@angular/common';
import { MatFormField } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { Chart, ChartConfiguration, ChartData, ChartOptions, ChartType, registerables } from 'chart.js';
import { BookingService } from '../../services/booking-service/booking.service';
import { CarPhotos } from '../../models/car-photos';

Chart.register(...registerables);

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
export class HomeComponent implements OnInit {
    parkedCarsByMakeChart: Chart | null = null;
    parkedCars: any[] = [];
    carMakes: string[] = [];
    selectedCarMake: string | null = null;
    filteredCarCount: number = 0;
    monthlyBookingsChart: Chart | null = null;
    bookingsChart: Chart | null = null;
    selectedMonth: number = new Date().getMonth() + 1;
    months = [
        {value: 1, viewValue: 'January'},
        {value: 2, viewValue: 'February'},
        {value: 3, viewValue: 'March'},
        {value: 4, viewValue: 'April'},
        {value: 5, viewValue: 'May'},
        {value: 6, viewValue: 'June'},
        {value: 7, viewValue: 'July'},
        {value: 8, viewValue: 'August'},
        {value: 9, viewValue: 'September'},
        {value: 10, viewValue: 'October'},
        {value: 11, viewValue: 'November'},
        {value: 12, viewValue: 'December'}
    ];

    constructor(private carService: CarService, private bookingService: BookingService) {}

    ngOnInit(): void {
        this.fetchParkedCars();
        this.loadCarMakes();
        this.loadBookingData();
        this.updateParkedCarsByMakeChart();
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
        this.updateParkedCarsByMakeChart();
      }
    
    getVehicleImage(make: keyof typeof CarPhotos, model: string): string {
        return CarPhotos[make]?.[model];
    }

    loadBookingData(): void {
      this.bookingService.getMonthlyBookingData(this.selectedMonth).subscribe(
          (data: number[]) => {
              this.createBookingsChart(data);
          },
          (error) => {
              console.error('Error fetching booking data:', error);
          }
      );
  }

  createBookingsChart(data: number[]): void {
    const ctx = document.getElementById('bookingsChart') as HTMLCanvasElement;

    if (this.bookingsChart) {
        this.bookingsChart.destroy();
    }

    const gradient = ctx.getContext('2d')!.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(204, 89, 89, 0.5)');
    gradient.addColorStop(1, 'rgba(204, 89, 89, 0)');

    this.bookingsChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map((_, index) => index + 1),
            datasets: [{
                label: 'Bookings',
                data: data,
                borderColor: 'rgb(204, 89, 89)',
                borderWidth: 3,
                fill: true,
                backgroundColor: gradient,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 8,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: true,
                    mode: 'index',
                    intersect: false 
                }
            },
            scales: {
                x: {
                    display: false,
                    grid: {
                        display: false 
                    }
                },
                y: {
                    display: false,
                    grid: {
                        display: false
                    }
                }
            },
            hover: {
                mode: 'index',
                intersect: false
            },
            elements: {
                line: {
                    tension: 0.4
                },
                point: {
                    radius: 0,
                    hoverRadius: 5,
                }
            }
        } as ChartOptions
    });
}

updateParkedCarsByMakeChart(): void {
    const ctx = document.getElementById('parkedCarsByMakeChart') as HTMLCanvasElement;
  
    if (this.parkedCarsByMakeChart) {
      this.parkedCarsByMakeChart.destroy();
    }
  
    const filteredCount = this.filteredCarCount;
    const totalCount = this.parkedCars.length;
    const remainingCount = totalCount - filteredCount;
  
    const data: ChartData = {
      labels: [this.selectedCarMake || 'Selected', 'Other'],
      datasets: [{
        data: [filteredCount, remainingCount],
        backgroundColor: ['#cc5959', '#ffffff'],
        borderColor: ['#cc5959', '#cccccc'],
        borderWidth: 1,
        hoverOffset: 4
      }]
    };
  
    const options: ChartOptions = {
      responsive: false,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context: any) {
              if (context.parsed !== undefined) {
                const label = context.label || '';
                const value = context.parsed;
                const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                const percentage = ((value / total) * 100).toFixed(1);
                return `${label}: ${value} (${percentage}%)`;
              }
              return '';
            }
          }
        }
      }
    };
  
    this.parkedCarsByMakeChart = new Chart(ctx, {
      type: 'doughnut' as ChartType,
      data: data,
      options: options
    });
}
}