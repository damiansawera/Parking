import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-car-popup',
  standalone: true,
  imports: [
    MatButtonModule,
  ],
  templateUrl: './success-popup.component.html',
  styleUrl: './success-popup.component.css'
})
export class SuccessPopupComponent {

constructor(
  private ref: MatDialogRef<SuccessPopupComponent>
) {}


closePopup() {
  this.ref.close();
}
}
