import { Component, Inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ParkingSpotService } from '../../../services/parking-spot-service/parking-spot.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { WalletService } from '../../../services/wallet-service/wallet.service';
import { NgIf } from '@angular/common';
import { BookingService } from '../../../services/booking-service/booking.service';

@Component({
  selector: 'app-unpark-car-popup',
  standalone: true,
  imports: [
    MatButton,
    NgIf
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
      walletResponse => {
        console.log('Wallet updated:', walletResponse);
        this.parkingSpotService.makeParkingSpotAvailable(this.parkingSpotNumber)
          .subscribe(
            response => {
              console.log('Parking spot made available:', response);
              this.closePopup();
            },
            error => {
              console.error('Error making parking spot available:', error);
              this.errorMessage = 'Error making parking spot available';
            }
          );
      },
      walletError => {
        console.error('Error updating wallet:', walletError);
        this.errorMessage = 'Insufficient balance';
      }
    );
    }

  closePopup() {
    this.ref.close();
  }

}
