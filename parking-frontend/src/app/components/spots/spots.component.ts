import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeComponent } from "../home/home.component";
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ParkingSpot } from '../../models/parking-spot';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ParkingSpotService } from '../../services/parking-spot-service/parking-spot.service';
import { HeaderComponent } from "../header/header.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { TimeDifferencePipe } from '../../pipes/time-dfference.pipe';
import { UnparkCarPopupComponent } from './unpark-car-popup/unpark-car-popup.component';
import { filter, Observable, switchMap, take } from 'rxjs';
import { AuthService } from '../../services/auth-service/auth.service';
import { BookPopupComponent } from '../book-popup/book-popup.component';
import { Car } from '../../models/car';
import { CarService } from '../../services/car-service/car.service';

@Component({
    selector: 'app-spots',
    standalone: true,
    templateUrl: './spots.component.html',
    styleUrls: ['./spots.component.css'],
    imports: [
        HomeComponent,
        HttpClientModule,
        CommonModule,
        MatPaginatorModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        HeaderComponent,
        SidebarComponent,
        TimeDifferencePipe
    ]
})
export class SpotsComponent implements OnInit {
  displayedColumns: string[] = ['Number', 'Floor', 'ParkingTime', 'RegistrationNumber', 'Actions'];
  dataSource = new MatTableDataSource<ParkingSpot>();
  isLoggedIn$: Observable<boolean>;
  userCars: Car[] = [];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private parkingSpotService: ParkingSpotService,
    private dialog: MatDialog,
    private authService: AuthService,
    private carService: CarService
  ) {
    this.isLoggedIn$ = this.authService.isLoggedIn();
  }

  ngOnInit() {
    this.loadParkingSpots();
    this.loadUserCars();
  }

  loadUserCars() {
    this.carService.getAllUserCars().subscribe((cars: Car[]) => {
      this.userCars = cars;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadParkingSpots() {
    this.parkingSpotService.getParkingSpots().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource._updateChangeSubscription();
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      },
    });
  }

  isUserCar(registrationNumber: string): boolean {
    return this.userCars.some(car => car.registrationNumber === registrationNumber);
  }

  onAvailableClick(parkingSpot: ParkingSpot) {
    this.isLoggedIn$.pipe(
      take(1),
      filter(isLoggedIn => isLoggedIn && !parkingSpot.taken)
    ).subscribe(() => {
      this.openBookPopup(parkingSpot);
    });
  }

  onRemoveCarClick(parkingSpot: ParkingSpot) {
    this.isLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.finishParkingPopup(parkingSpot);
      }
    });
  }

  openBookPopup(parkingSpot: ParkingSpot) {
    const dialogRef = this.dialog.open(BookPopupComponent, {
      width: '37%',
      maxHeight: '80vh',
      data: { parkingSpotNumber: parkingSpot.number }
    });
  
    dialogRef.afterClosed().pipe(
      filter(result => result === 'refresh'),
      switchMap(() => {
        return this.dialog.open(BookPopupComponent, {
          data: { parkingSpotNumber: parkingSpot.number, refresh: true }
        }).afterClosed();
      })
    ).subscribe();
  }

  finishParkingPopup(parkingSpot: ParkingSpot) {
    this.dialog.open(UnparkCarPopupComponent, {
      width: '25%',
      height: '200px',
      data: {
        parkingSpotNumber: parkingSpot.number,
        bookingStartDate: parkingSpot.bookingStartDate
      }
    });
  }
}
