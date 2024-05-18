import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { CarService } from '../../services/car-brands-service/car-brands.service';
import { NgFor, NgIf } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Car } from '../../models/car';

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

  carBrands: string[] = [];
  form: FormGroup;

  constructor(private ref:MatDialogRef<BookPopupComponent>,
      private carService: CarService,
      private formBuilder: FormBuilder) {
        this.form = this.formBuilder.group({
        registrationNumberField: ['', Validators.required],
        carBrandField: ['', Validators.required],
        vehicleModelField: ['', Validators.required],
        colorField: ['', Validators.required],
        productionYearField: ['', [Validators.required, this.productionYearValidator]]
        })
      }

  ngOnInit() {
    this.carService.getCarBrands()
    .subscribe((data: string[]) => {
      this.carBrands = data;
  })
};

  closePopup() {
    this.ref.close();
  }

  saveCar() {
    if (this.form.valid) {
      const newCar: Car = {
        registrationNumber: this.form.get('registrationNumberField')?.value,
        vehicleMake: this.form.get('carBrandField')?.value,
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
    }
  }

  productionYearValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const valid = /^\d{4}$/.test(value);
    return valid ? null : { productionYear: true };
  }
}
