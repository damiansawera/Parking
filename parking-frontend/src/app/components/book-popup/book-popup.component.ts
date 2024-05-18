import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-book-popup',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './book-popup.component.html',
  styleUrl: './book-popup.component.css'
})
export class BookPopupComponent {

  constructor(private ref:MatDialogRef<BookPopupComponent>) {}

  closePopup() {
    this.ref.close();
  }
}
