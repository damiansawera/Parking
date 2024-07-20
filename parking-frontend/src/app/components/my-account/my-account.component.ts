import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { HeaderComponent } from "../header/header.component";
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user-service/user.service';
import { User } from '../../models/user';
import { BookingService } from '../../services/booking-service/booking.service';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [
    SidebarComponent,
    HeaderComponent,
    CommonModule,],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.css'
})
export class MyAccountComponent implements OnInit {
  user?: User;
  showAddFundsPopup: boolean = false;
  totalBookingsCount: number = 0;
  mostCommonParkingSpot: string = '';
  latestParkingDate: Date | null = null;

  constructor(private userService: UserService, private bookingService: BookingService) {}

  ngOnInit(): void {
    this.getUserInfo();
    this.getTotalBookingsCount();
  }

  addFunds(paymentType: string) {
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
