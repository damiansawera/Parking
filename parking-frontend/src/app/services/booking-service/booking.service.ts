import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Booking } from '../../models/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private getAllUserBookingsUrl = 'http://localhost:8080/booking/user';
  private getMonthlyBookingsUrl = 'http://localhost:8080/booking/monthly-booking-data';

  private bookingCountSubject = new BehaviorSubject<number>(0);
  bookingCount$ = this.bookingCountSubject.asObservable();

  private bookingsSubject = new BehaviorSubject<Booking[]>([]);
  bookings$ = this.bookingsSubject.asObservable();
  

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

  getMonthlyBookingData(month: number): Observable<{ month: number; year: number; bookings: number }[]> {
    const year = 2024;
    return this.http.get<{ month: number; year: number; bookings: number }[]>(
      `${this.getMonthlyBookingsUrl}?year=${year}&month=${month}`
    );
  }

  getTotalBookingsCount() {
    this.getAllBookings().subscribe(bookings => {
      const count = bookings.length;
      this.bookingCountSubject.next(count);
    });
  }

  calculatePrice(bookingStartDate: Date): number {
    if (!bookingStartDate) {
      return 0;
    }
    const now = new Date();
    const startDate = new Date(bookingStartDate);
    const diffMs = now.getTime() - startDate.getTime();
    const diffHours = Math.ceil(diffMs / (1000 * 60 * 60));
    const pricePerHour = 5;
    const price = pricePerHour * diffHours;
    return parseFloat(price.toFixed(2));
  }

}
