import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { CarService } from '../../services/car-service/car.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Car } from '../../models/car';
import { AddCarPopupComponent } from './add-car-popup/add-car-popup.component';
import { MatIcon } from '@angular/material/icon';
import { ParkingSpotService } from '../../services/parking-spot-service/parking-spot.service';

@Component({
  selector: 'app-book-popup',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgFor,
    NgIf,
    NgClass,
    ReactiveFormsModule,
    MatIcon
  ],
  templateUrl: './book-popup.component.html',
  styleUrl: './book-popup.component.css'
})
export class BookPopupComponent implements OnInit {

  carMakes: string[] = [];
  form: FormGroup;
  parkingSpotNumber: string;

  constructor(private ref:MatDialogRef<BookPopupComponent>,
    private carService: CarService,
    private parkingSpotService: ParkingSpotService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { parkingSpotNumber: string }
  ) {
        this.parkingSpotNumber = data.parkingSpotNumber;
        this.form = this.formBuilder.group({
        registrationNumberField: ['', Validators.required],
        vehicleMakeField: ['', Validators.required],
        vehicleModelField: ['', Validators.required],
        colorField: ['', Validators.required],
        productionYearField: ['', [Validators.required, this.productionYearValidator]]
        })
      }

  closePopup() {
    this.ref.close();
  }

  clearForm() {
    this.form.reset();
    this.form.enable();
  }

  saveCar() {
    if (this.form.valid) {
      const newCar: Car = {
        registrationNumber: this.form.get('registrationNumberField')?.value,
        vehicleMake: this.form.get('vehicleMakeField')?.value,
        vehicleModel: this.form.get('vehicleModelField')?.value,
        color: this.form.get('colorField')?.value,
        productionYear: this.form.get('productionYearField')?.value
      };
      this.carService.saveCar(newCar).subscribe(
        response => {
          console.log('Car added successfully', response);
        },
        error => {
          console.error('Error adding car', error);
        }
      );
      this.openSuccessPopup();
      this.checkRegistrationNumber();
    }
  }

  openSuccessPopup() {
    this.dialog.open(AddCarPopupComponent, {
      height: '150px',
      width: '450px'
    });
  }

  checkRegistrationNumber() {
    const registrationNumber = this.form.get('registrationNumberField')?.value;
    if (registrationNumber) {
      this.carService.getCarByRegistrationNumber(registrationNumber).subscribe((data: any) => {
        if (data) {
          this.form.patchValue({
            vehicleMakeField: data.vehicleMake,
            vehicleModelField: data.vehicleModel,
            colorField: data.color,
            productionYearField: data.productionYear,
          });
          this.form.disable();
        } else {
          this.form.enable();
        }
      });
    }
  }

  productionYearValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const valid = /^\d{4}$/.test(value);
    return valid ? null : { productionYear: true };
  }

  bookParkingSpot() {
    this.parkingSpotService.addCarToParkingSpot(
      this.parkingSpotNumber,
      this.form.get('registrationNumberField')?.value).subscribe(
        response => {
          console.log('Car parked successfully', response);
        },
        error => {
          console.error('Error while parking car', error);
        });
    this.ref.close();

}

  ngOnInit() {
    this.carService.getCarMakes()
    .subscribe((data: string[]) => {
      this.carMakes = data;
  });
}
}
