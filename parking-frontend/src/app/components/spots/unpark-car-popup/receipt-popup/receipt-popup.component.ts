import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-receipt-popup',
  standalone: true,
  imports: [],
  templateUrl: './receipt-popup.component.html',
  styleUrl: './receipt-popup.component.css'
})
export class ReceiptPopupComponent {

  constructor(private ref: MatDialogRef<ReceiptPopupComponent>) {}

  printReceipt(): void {
    this.ref.close('print');
  }

  closePopup() {
    this.ref.close();
  }
}
