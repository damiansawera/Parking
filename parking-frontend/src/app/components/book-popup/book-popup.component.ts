import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { CarBrandsService } from '../../services/data-service/car-brands-service/car-brands.service';
import { NgFor } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-popup',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgFor,
    ReactiveFormsModule
  ],
  templateUrl: './book-popup.component.html',
  styleUrl: './book-popup.component.css'
})
export class BookPopupComponent implements OnInit {
  carBrands: string[] = [];
  form: FormGroup;

  constructor(private ref:MatDialogRef<BookPopupComponent>,
      private carBrandsService: CarBrandsService,
      private formBuilder: FormBuilder) {
        this.form = this.formBuilder.group({
        inputField: ['', Validators.required],
        selectField: ['', Validators.required]
        })
      }

  ngOnInit() {
    this.carBrandsService.getCarBrands()
    .subscribe((data: string[]) => {
      this.carBrands = data;
  })
};

  closePopup() {
    this.ref.close();
  }
}
