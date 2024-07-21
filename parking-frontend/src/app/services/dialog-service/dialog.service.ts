import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SuccessPopupComponent } from '../../components/add-car-popup/success-popup/success-popup.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openSuccessPopup(message: string) {
    return this.dialog.open(SuccessPopupComponent, {
      height: '150px',
      width: '450px',
      data: { message: message }
    });
  }
}