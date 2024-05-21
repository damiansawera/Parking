import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { CarService } from '../../services/car-service/car.service';
import { NgClass, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Car } from '../../models/car';
import { AddCarPopupComponent } from './add-car-popup/add-car-popup.component';
import { MatIcon } from '@angular/material/icon';
import { ParkingSpotService } from '../../services/parking-spot-service/parking-spot.service';
import { BookFormValidator } from '../../validators/book-form-validator';
import { UpperFirstCharPipe } from '../../pipes/upper-first-char-pipe';

@Component({
    selector: 'app-book-popup',
    standalone: true,
    templateUrl: './book-popup.component.html',
    styleUrl: './book-popup.component.css',
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        NgFor,
        NgIf,
        NgClass,
        ReactiveFormsModule,
        MatIcon,
        UpperFirstCharPipe
    ]
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
        registrationNumberField: ['',
        [Validators.required,
        Validators.maxLength(10)]],

        vehicleMakeField: ['',
        Validators.required],

        vehicleModelField: ['',
        [Validators.required,
        Validators.maxLength(12)]],

        colorField: ['',
        [Validators.required,
        Validators.maxLength(12)]],
        
        productionYearField: ['',
        [Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4),
        BookFormValidator.productionYearValidator,
        BookFormValidator.restrictToDigits]]
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
    }
  }

  openSuccessPopup() {
    this.dialog.open(AddCarPopupComponent, {
      height: '150px',
      width: '450px'
    });
    this.checkRegistrationNumber();
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

private loadCarMakes(): void {
  this.carService.getCarMakes()
    .subscribe((data: string[]) => {
      this.carMakes = data;
    });
}

ngOnInit() {
  this.loadCarMakes();
}
}

