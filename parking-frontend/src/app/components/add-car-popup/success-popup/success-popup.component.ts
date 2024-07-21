import { Component, Inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
message: string = '';

constructor(
  private ref: MatDialogRef<SuccessPopupComponent>,
  @Inject(MAT_DIALOG_DATA) public data: { message: string }
) 
{
this.message = data.message;
}


closePopup() {
  this.ref.close();
}
}
