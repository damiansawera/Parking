import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { BookingService } from '../../services/booking-service/booking.service';
import { Booking } from '../../models/booking';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule ,HeaderComponent, SidebarComponent],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.css'
})
export class MyBookingsComponent implements OnInit {
currentBookings: Booking[] = [];
pastBookings: Booking[] = [];
bookingStartDate: any;

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
   this.getBookings(); 
  }

  getBookings() {
    this.bookingService.getCurrentBookings().subscribe(
      bookings => {
        this.currentBookings = bookings.map(booking => ({
          ...booking,
          price: this.bookingService.calculatePrice(booking.bookingStartDate)
        }));
      }
    );
    this.bookingService.getPastBookings().subscribe(
      bookings => this.pastBookings = bookings
    );
  }

}
