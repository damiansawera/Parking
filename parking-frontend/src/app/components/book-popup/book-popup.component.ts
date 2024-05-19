import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { CarService } from '../../services/car-service/car.service';
import { NgFor, NgIf } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Car } from '../../models/car';
import { AddCarPopupComponent } from './add-car-popup/add-car-popup.component';

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
    ReactiveFormsModule
  ],
  templateUrl: './book-popup.component.html',
  styleUrl: './book-popup.component.css'
})
export class BookPopupComponent implements OnInit {

  carMakes: string[] = [];
  form: FormGroup;

  constructor(private ref:MatDialogRef<BookPopupComponent>,
    private carService: CarService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {
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
    const dialogRef = this.dialog.open(AddCarPopupComponent, {
      height: '200px',
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.closePopup();
        }
      }
    )
  }

  checkRegistrationNumber() {
    const registrationNumber = this.form.get('registrationNumberField')?.value;
    if (registrationNumber) {
      this.carService.getCarByRegistrationNumber(registrationNumber).subscribe((data: any) => {
        console.log('Received data:', data);
        if (data) {
          this.form.patchValue({
            vehicleMakeField: data.vehicleMake,
            vehicleModelField: data.vehicleModel,
            colorField: data.color,
            productionYearField: data.productionYear,
          });
          console.log('Form patched, now disabling');
          this.form.disable();
        } else {
          console.log('No data found, enabling form');
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

  ngOnInit() {
    this.carService.getCarMakes()
    .subscribe((data: string[]) => {
      this.carMakes = data;
  });
}
}
