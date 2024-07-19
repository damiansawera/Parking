import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take, tap } from 'rxjs';
import { ParkingSpot } from '../../models/parking-spot';

@Injectable({
  providedIn: 'root'
})
export class ParkingSpotService {
private getAllParkingSpotsUrl = 'http://localhost:8080/parking-spot/all';
private removeCarFromParkingSpotUrl = 'http://localhost:8080/parking-spot/{id}';
private addCarToParkingSpotUrl = 'http://localhost:8080/parking-spot/add/{id}';

private parkingSlotsSubject = new BehaviorSubject<ParkingSpot[]>([]);
parkingSlots$ = this.parkingSlotsSubject.asObservable();

  constructor(private http: HttpClient) { }

  loadAllParkingSpots(): Observable<ParkingSpot[]> {
    return this.http.get<ParkingSpot[]>(this.getAllParkingSpotsUrl).pipe(
      tap(spots => this.parkingSlotsSubject.next(spots))
    );
  }

  makeParkingSpotAvailable(number: string): Observable<ParkingSpot[]> {
    const url = this.removeCarFromParkingSpotUrl.replace('{id}', number);
    return this.http.put<ParkingSpot[]>(url, { number }).pipe(
      tap(() => this.loadAllParkingSpots().subscribe())
    );
  }

  addCarToParkingSpot(number: string, registrationNumber: string): Observable<ParkingSpot[]> {
    const url = this.addCarToParkingSpotUrl.replace('{id}', number);
    const params = new HttpParams().set('registrationNumber', registrationNumber);
    return this.http.put<ParkingSpot[]>(url, { number }, { params }).pipe(
      tap(() => this.loadAllParkingSpots().subscribe())
    );
    }

    getParkingSpots() {
      return this.parkingSlots$;
    }
}
