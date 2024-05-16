import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HomeComponent } from "../home/home.component";
import { HttpClientModule } from '@angular/common/http';
import { DataService } from '../../services/data/data.service';
import { CommonModule } from '@angular/common';
import { ParkingSpot } from './parking-spot';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';



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
      ]
})
export class SpotsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['Number', 'Floor', 'Taken', 'RegistrationNumber'];
  dataSource = new MatTableDataSource<ParkingSpot>();
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dataService: DataService) {}

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
 
  ngAfterViewInit() {
}
}
