import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgClass, NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Car } from '../../models/car';
import { ParkingSpotService } from '../../services/parking-spot-service/parking-spot.service';
import { CarService } from '../../services/car-service/car.service';
import { CarMakes } from '../../enums/car-makes';
import { AddCarPopupComponent } from '../add-car-popup/add-car-popup.component';
import { DialogService } from '../../services/dialog-service/dialog.service';


@Component({
  selector: 'app-book-popup',
  standalone: true,
  imports: [NgFor,
    MatButtonModule,
    NgClass
  ],
  templateUrl: './book-popup.component.html',
  styleUrl: './book-popup.component.css'
})
export class BookPopupComponent implements OnInit {
parkingSpotNumber: string;
cars: Car[] = [];
selectedCar: Car | null = null;

constructor(
  private parkingSpotService: ParkingSpotService,
  private carService: CarService,
  private ref:MatDialogRef<BookPopupComponent>,
  private dialogService: DialogService,
  private dialog: MatDialog,
  @Inject(MAT_DIALOG_DATA) public data: { parkingSpotNumber: string, refresh?: boolean }
) {
  this.parkingSpotNumber = data.parkingSpotNumber;
  if (this.data.refresh) {
    this.refreshCars();
  }
}

ngOnInit(): void {
  this.loadCars();
}

selectCar(car: Car) {
  this.selectedCar = car;
}

getVehicleImage(make: keyof typeof CarMakes): string {
  return CarMakes[make];
}

addNewCar() {
  const addCarDialogRef = this.dialog.open(AddCarPopupComponent, {
    width: '40%',
    height: '450px',
    data: { parkingSpotNumber: this.data.parkingSpotNumber }
  });

  addCarDialogRef.afterClosed().subscribe(result => {
    if (result === 'success') {
      this.dialogService.openSuccessPopup("Car added successfully!").afterClosed().subscribe(() => {
        this.ref.close('refresh');
      });
    }
  });
}

bookParkingSpot() {
  if(this.selectedCar) {  
  this.parkingSpotService.addCarToParkingSpot(
  this.parkingSpotNumber, this.selectedCar.registrationNumber) 
  .subscribe(
    response => {
      console.log('Car parked successfully', response);
    },
    error => {
      console.error('Error while parking car', error);
    });
  }
this.ref.close();
}

loadCars() {
  this.carService.getAllUserCars().subscribe((cars: Car[]) => {
  this.cars = cars;
});
}

refreshCars() {
  if (this.data.refresh)
    this.loadCars();
}

closePopup() {
  this.ref.close();
}

}
