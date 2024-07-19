import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ParkingSpotService } from '../../../services/parking-spot-service/parking-spot.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-unpark-car-popup',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './unpark-car-popup.component.html',
  styleUrl: './unpark-car-popup.component.css'
})
export class UnparkCarPopupComponent {

parkingSpotNumber: string;
bookingStartDate: Date | null | undefined;

  constructor(private parkingSpotService: ParkingSpotService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<UnparkCarPopupComponent>) 
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
    const diffMinutes = Math.floor(diffMs / 60000);

    const pricePerHour = 5;
    const price = pricePerHour * Math.ceil(diffMinutes / 60);
    return price;
  }

  finishParking(): void {
    this.parkingSpotService.makeParkingSpotAvailable(this.parkingSpotNumber)
    .subscribe(response => {
      console.log('Response from server:', response);
      this.closePopup();
    }, error => {
    console.error('Error:', error); 
  });
  }

  closePopup() {
    this.ref.close();
  }

}
