import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { HeaderComponent } from "../header/header.component";
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user-service/user.service';
import { User } from '../../models/user';
import { BookingService } from '../../services/booking-service/booking.service';
import { WalletService } from '../../services/wallet-service/wallet.service';
import { FormsModule } from '@angular/forms';
import { DialogService } from '../../services/dialog-service/dialog.service';
import { PayUService } from '../../services/payu-service/payu.service';
import { Car } from '../../models/car';
import { CarService } from '../../services/car-service/car.service';
import { CarPhotos } from '../../models/car-photos';
import { AddCarPopupComponent } from '../add-car-popup/add-car-popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [
    SidebarComponent,
    HeaderComponent,
    CommonModule,
    FormsModule],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.css'
})
export class MyAccountComponent implements OnInit {
  user?: User;
  showAddFundsPopup: boolean = false;
  totalBookingsCount: number = 0;
  mostCommonParkingSpot: string = '';
  latestParkingDate: Date | null = null;
  amountToAdd: number = 0;
  cars: Car[] = [];
  selectedCar: Car | null = null;

  constructor(private userService: UserService,
              private bookingService: BookingService,
              private walletService: WalletService,
              private dialogService: DialogService,
              private payUService: PayUService,
              private carService: CarService,
              private dialog: MatDialog,
            ) {}

  ngOnInit(): void {
    this.getUserInfo();
    this.getTotalBookingsCount();
    this.loadCars();
  }

  addFundsPayU() {
    this.payUService.createOrder(this.amountToAdd).subscribe(
      (response) => {
        if (response.redirectUri) {
          window.location.href = response.redirectUri;
        } else {
          console.error('Invalid response:', response);
          alert('Payment initiation failed. Please try again.');
        }
      }
    );
  }
  
  addFundsNoPayU() {
    this.walletService.topUpBalance(this.amountToAdd).subscribe( 
      response => {
      console.log("Balance updated", response);
      this.dialogService.openSuccessPopup("Funds added to the account!").afterClosed().subscribe(() => {
        this.closeAddFundsPopup();
        this.getUserInfo();
        this.amountToAdd = 0;
      });
      
    },
    walletError => {
      console.error('Error updating wallet:', walletError);
    }
    )
    }

  openAddFundsPopup() {
    this.showAddFundsPopup = true;
    }

  closeAddFundsPopup() {
    this.showAddFundsPopup = false;
    }
    
  getUserInfo() {
    this.userService.getUserInfo().subscribe(
      response => this.user = response,
      error => console.error('Error fetching user info', error));
    }

getTotalBookingsCount() {
  this.bookingService.bookingCount$.subscribe(count => {
    this.totalBookingsCount = count;
  });
  this.bookingService.getTotalBookingsCount();
}

loadCars() {
  this.carService.getAllUserCars().subscribe((cars: Car[]) => {
  this.cars = cars;
});
}

selectCar(car: Car) {
  this.selectedCar = car;
}

getVehicleImage(make: keyof typeof CarPhotos, model: string): string {
  return CarPhotos[make]?.[model];
}

deleteCar() {
  if (this.selectedCar?.registrationNumber) {
    this.carService.deleteCar(this.selectedCar.registrationNumber).subscribe({
      next: () => {
        this.cars = this.cars.filter(car => car.registrationNumber !== this.selectedCar?.registrationNumber);
        this.selectedCar = null;
      },
      error: (error) => {
        console.error('Error deleting car:', error);
      }
    });
  }
}

addNewCar() {
  const addCarDialogRef = this.dialog.open(AddCarPopupComponent, {
    width: '40%',
    height: '450px',
  });

  addCarDialogRef.afterClosed().subscribe(result => {
    if (result === 'success') {
      this.dialogService.openSuccessPopup("Car added successfully!").afterClosed().subscribe(() => {
        this.loadCars();
      });
    }
  });
}
}
