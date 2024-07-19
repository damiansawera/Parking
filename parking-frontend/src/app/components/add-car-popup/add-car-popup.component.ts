import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { CarService } from '../../services/car-service/car.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Car } from '../../models/car';
import { MatIcon } from '@angular/material/icon';
import { BookFormValidator } from '../../validators/book-form-validator';
import { UpperFirstCharPipe } from '../../pipes/upper-first-char-pipe';
import { FordModels } from '../../enums/ford-models';
import { HondaModels } from '../../enums/honda-models';
import { BmwModels } from '../../enums/bmw-models';
import { AudiModels } from '../../enums/audi-models';
import { ToyotaModels } from '../../enums/toyota-models';
import { SuccessPopupComponent } from './success-popup/success-popup.component';
import { BookPopupComponent } from '../book-popup/book-popup.component';

@Component({
    selector: 'app-book-popup',
    standalone: true,
    templateUrl: './add-car-popup.component.html',
    styleUrl: './add-car-popup.component.css',
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
export class AddCarPopupComponent implements OnInit {
  
  carMakes: string[] = [];
  form: FormGroup;
  parkingSpotNumber: string;
  carModels: any;

  constructor(private ref:MatDialogRef<AddCarPopupComponent>,
    private carService: CarService,
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
      this.ref.close('success');
    }
  }

  openSuccessPopup() {
    const dialogRef = this.dialog.open(SuccessPopupComponent, {
      height: '150px',
      width: '450px'
    });
    }

    checkRegistrationNumber() {
      const registrationNumber = this.form.get('registrationNumberField')?.value;
      if (registrationNumber) {
        this.carService.getCarByRegistrationNumber(registrationNumber).subscribe(
          (data: any) => {
            if (data) {
              this.form.get('registrationNumberField')?.setErrors({ alreadyExists: true });
            } else {
              this.form.get('registrationNumberField')?.setErrors(null);
            }
          }
        );
      }
    }

private loadCarMakes(): void {
  this.carService.getCarMakes()
    .subscribe((data: string[]) => {
      this.carMakes = data;
    });
}

updateCarModels(make: string) {
  const allModels = [
    ...Object.values(FordModels),
    ...Object.values(HondaModels),
    ...Object.values(BmwModels),
    ...Object.values(AudiModels),
    ...Object.values(ToyotaModels)
  ];

  if (!make) {
    this.carModels = allModels;
  } else {
    switch (make) {
      case 'Ford':
        this.carModels = Object.values(FordModels);
        break;
      case 'Honda':
        this.carModels = Object.values(HondaModels);
        break;
        case 'Bmw':
          this.carModels = Object.values(BmwModels);
          break;
        case 'Audi':
          this.carModels = Object.values(AudiModels);
          break;
          
        case 'Toyota':
          this.carModels = Object.values(ToyotaModels);
          break;
      default:
        this.carModels = allModels;
    }
  }
  this.form.get('vehicleModelField')?.setValue(null);
}

ngOnInit() {
  this.loadCarMakes();
  this.updateCarModels('');
}
}