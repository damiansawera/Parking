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

  constructor(private userService: UserService,
              private bookingService: BookingService,
              private walletService: WalletService,
              private dialogService: DialogService) {}

  ngOnInit(): void {
    this.getUserInfo();
    this.getTotalBookingsCount();
  }

  addFunds() {
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
}
