import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Booking } from '../../models/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private getAllUserBookingsUrl = 'http://localhost:8080/booking/user';

  constructor(private http: HttpClient) { }

  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.getAllUserBookingsUrl);
  }

  getCurrentBookings(): Observable<Booking[]> {
    return this.getAllBookings().pipe(
      map((bookings: any[]) => bookings.filter(booking => !booking.paid && booking.bookingEndDate === null))
    );
  }

  getPastBookings(): Observable<Booking[]> {
    return this.getAllBookings().pipe(
      map((bookings: any[]) => bookings.filter(booking => booking.paid && booking.bookingEndDate !== null))
    );
  }
}
