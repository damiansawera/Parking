import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-car-popup',
  standalone: true,
  imports: [
    MatButtonModule,
  ],
  templateUrl: './add-car-popup.component.html',
  styleUrl: './add-car-popup.component.css'
})
export class AddCarPopupComponent {

constructor(
  private ref: MatDialogRef<AddCarPopupComponent>
) {}


closePopup() {
  this.ref.close();
}
}
