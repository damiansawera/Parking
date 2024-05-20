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
import { BookPopupComponent } from '../book-popup/book-popup.component';
import { ParkingSpotService } from '../../services/parking-spot-service/parking-spot.service';
import { HeaderComponent } from "../header/header.component";
import { SidebarComponent } from "../sidebar/sidebar.component";



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
        SidebarComponent
    ]
})
export class SpotsComponent implements OnInit {
  displayedColumns: string[] = ['Number', 'Floor', 'Taken', 'RegistrationNumber', 'Actions'];
  dataSource = new MatTableDataSource<ParkingSpot>();
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private parkingSpotService: ParkingSpotService, private dialog: MatDialog) {}

  ngOnInit() {
    this.parkingSpotService.fetchData().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      },
    });
  }

  openPopup(parkingSpot: ParkingSpot) {
    const dialogRef = this.dialog.open(BookPopupComponent, {
      width: '40%',
      height: '500px',
      data: {parkingSpotNumber: parkingSpot.number }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }

  makeParkingSpotAvailable(spots: ParkingSpot): void {
    this.parkingSpotService.makeParkingSpotAvailable(spots.number)
    .subscribe(response => {
      console.log('Response from server:', response);
      this.ngOnInit();
    }, error => {
    console.error('Error:', error); 
  });
  }
}
