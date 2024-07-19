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
import { filter, Observable, switchMap } from 'rxjs';
import { AuthService } from '../../services/auth-service/auth.service';
import { BookPopupComponent } from '../book-popup/book-popup.component';

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
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private parkingSpotService: ParkingSpotService,
    private dialog: MatDialog,
    private authService: AuthService
  ) {
    this.isLoggedIn$ = this.authService.isLoggedIn();
  }

  ngOnInit() {
    this.loadParkingSpots();
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

  onAvailableClick(parkingSpot: ParkingSpot) {
    this.isLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn && !parkingSpot.taken) {
        this.openBookPopup(parkingSpot);
      }
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
      width: '40%',
      height: '500px',
      data: { parkingSpotNumber: parkingSpot.number }
    });
  
    dialogRef.afterClosed().pipe(
      filter(result => result === 'refresh'),
      switchMap(() => {
        return this.dialog.open(BookPopupComponent, {
          width: '40%',
          height: '500px',
          data: { parkingSpotNumber: parkingSpot.number, refresh: true }
        }).afterClosed();
      })
    ).subscribe();
  }

  finishParkingPopup(parkingSpot: ParkingSpot) {
    const dialogRef = this.dialog.open(UnparkCarPopupComponent, {
      width: '25%',
      height: '200px',
      data: {
        parkingSpotNumber: parkingSpot.number,
        bookingStartDate: parkingSpot.bookingStartDate
      }
    });
  }
}
