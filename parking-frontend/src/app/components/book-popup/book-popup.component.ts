import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgClass, NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Car } from '../../models/car';
import { ParkingSpotService } from '../../services/parking-spot-service/parking-spot.service';
import { CarService } from '../../services/car-service/car.service';
import { CarMakes } from '../../enums/car-makes';
import { AddCarPopupComponent } from '../add-car-popup/add-car-popup.component';
import { SuccessPopupComponent } from '../add-car-popup/success-popup/success-popup.component';


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
    height: '500px',
    data: { parkingSpotNumber: this.data.parkingSpotNumber }
  });

  addCarDialogRef.afterClosed().subscribe(result => {
    if (result === 'success') {
      this.openSuccessPopup();
    }
  });
}

openSuccessPopup() {
  const successDialogRef = this.dialog.open(SuccessPopupComponent, {
    height: '150px',
    width: '450px'
  });

  successDialogRef.afterClosed().subscribe(() => {
    this.ref.close('refresh');
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
