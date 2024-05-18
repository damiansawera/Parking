import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeComponent } from "../home/home.component";
import { HttpClientModule } from '@angular/common/http';
import { DataService } from '../../data.service';
import { CommonModule } from '@angular/common';
import { ParkingSpot } from './parking-spot';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
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
      MatDialogModule
      ]
})
export class SpotsComponent implements OnInit {
  displayedColumns: string[] = ['Number', 'Floor', 'Taken', 'RegistrationNumber', 'Actions'];
  dataSource = new MatTableDataSource<ParkingSpot>();
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dataService: DataService, private dialog: MatDialog) {}

  ngOnInit() {
    this.dataService.fetchData().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      },
    });
  }

  openPopup() {
    this.dialog.open(BookPopupComponent, {
      width: '60%',
      height: '400px' 
    }

    )
  }

  makeParkingSpotAvailable(spots: ParkingSpot): void {
    this.dataService.makeParkingSpotAvailable(spots.number, spots.registrationNumber)
    .subscribe(response => {
      console.log('Response from server:', response);
      this.ngOnInit();
    }, error => {
    console.error('Error:', error); 
  });
  }
}
