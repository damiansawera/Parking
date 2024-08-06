import { Component, Inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ParkingSpotService } from '../../../services/parking-spot-service/parking-spot.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { WalletService } from '../../../services/wallet-service/wallet.service';
import { NgIf } from '@angular/common';
import { BookingService } from '../../../services/booking-service/booking.service';
import { ReceiptPopupComponent } from './receipt-popup/receipt-popup.component';
import { ReceiptService } from '../../../services/receipt-service/receipt.service';
import { ParkingEndTimePipe } from '../../../pipes/parking-end-time.pipe';

@Component({
  selector: 'app-unpark-car-popup',
  standalone: true,
  imports: [
    MatButton,
    NgIf,
    ParkingEndTimePipe
  ],
  templateUrl: './unpark-car-popup.component.html',
  styleUrl: './unpark-car-popup.component.css'
})
export class UnparkCarPopupComponent {

parkingSpotNumber: string;
bookingStartDate: Date;
errorMessage?: string;
price: number = 0;

  constructor(private parkingSpotService: ParkingSpotService,
              private ref: MatDialogRef<UnparkCarPopupComponent>,
              private walletService: WalletService,
              private bookingService: BookingService,
              private dialog: MatDialog,
              private receiptService: ReceiptService,
              @Inject(MAT_DIALOG_DATA) public data: any
) 
  {
    this.parkingSpotNumber = data.parkingSpotNumber;
    this.bookingStartDate = data.bookingStartDate;
    this.getPrice();
  }

  getPrice() {
   this.price = this.bookingService.calculatePrice(this.bookingStartDate);
  }

  finishParking(): void {
    const priceToDeduct = this.bookingService.calculatePrice(this.bookingStartDate);
    this.walletService.deductFromBalance(priceToDeduct)
    .subscribe(
      () => {
        this.parkingSpotService.makeParkingSpotAvailable(this.parkingSpotNumber)
          .subscribe(
            () => {
              this.closePopup();
              this.openReceiptPopup();
            },
            () => {
              this.errorMessage = 'Error while finishing parking';
            }
          );
      },
      walletError => {
        console.error('Error updating wallet:', walletError);
        this.errorMessage = 'Insufficient balance';
      }
    );
    }

    openReceiptPopup() {
      const dialogRef = this.dialog.open(ReceiptPopupComponent, {
        width: '25%',
        height: '180px'
      });
    
      dialogRef.afterClosed().subscribe(result => {
        if (result === 'print') {
          this.printReceipt();
        }
      });
    }

    printReceipt(): void {
      const parkingEndDate = new Date();
    const parkingEndTimePipe = new ParkingEndTimePipe();
    const parkingEndTime = parkingEndTimePipe.transform(parkingEndDate);
    const formattedEndDate = this.formatDate(parkingEndDate);
  
      const receiptData = {
        parkingEndTime: parkingEndTime,
        parkingEndDate: formattedEndDate,
        price: this.price,
        parkingSpotNumber: this.data.parkingSpotNumber,
        registrationNumber: this.data.registrationNumber
      };
  
      this.receiptService.generateReceipt(receiptData).subscribe(
        (blob: Blob) => {
          const url = window.URL.createObjectURL(blob);
          window.open(url, '_blank');
        },
        (error) => {
          console.error('Error generating receipt', error);
        }
      );
    }
  
    private formatDate(date: Date): string {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }

  closePopup() {
    this.ref.close();
  }

}
