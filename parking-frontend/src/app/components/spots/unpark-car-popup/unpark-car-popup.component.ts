import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ParkingSpotService } from '../../../services/parking-spot-service/parking-spot.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { WalletService } from '../../../services/wallet-service/wallet.service';
import { NgIf } from '@angular/common';

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
bookingStartDate: Date | null | undefined;
  errorMessage?: string;

  constructor(private parkingSpotService: ParkingSpotService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<UnparkCarPopupComponent>,
  private walletService: WalletService) 
  {
    this.parkingSpotNumber = data.parkingSpotNumber;
    this.bookingStartDate = data.bookingStartDate;
  }

  calculatePrice(): number {
    if (!this.bookingStartDate) {
      return 0;
    }
    const now = new Date();
    const startDate = new Date(this.bookingStartDate);
    const diffMs = now.getTime() - startDate.getTime();
    const diffMinutes = diffMs / 60000;

    const pricePerHour = 5;
    const price = pricePerHour * (diffMinutes / 60);
    return parseFloat(price.toFixed(2));
  }

  finishParking(): void {
    const priceToDeduct = this.calculatePrice();
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
