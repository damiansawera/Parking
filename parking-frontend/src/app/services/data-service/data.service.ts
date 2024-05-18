import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ParkingSpot } from '../../models/parking-spot';

@Injectable({
  providedIn: 'root'
})
export class DataService {
private getAllParkingSpots = 'http://localhost:8080/parking-spot';
private removeCarFromParkingSpot = 'http://localhost:8080/parking-spot/{id}';

  constructor(private http: HttpClient) { }

  fetchData(): Observable<ParkingSpot[]> {
    return this.http.get<ParkingSpot[]>(this.getAllParkingSpots);
  }

  makeParkingSpotAvailable(number: string, registrationNumber: string): Observable<ParkingSpot[]> {
    const url = this.removeCarFromParkingSpot.replace('{id}', number);
    const params = new HttpParams().set('registrationNumber', registrationNumber);

    return this.http.put<ParkingSpot[]>(url, { registrationNumber }, { params });
  }

}
