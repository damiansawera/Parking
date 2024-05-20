import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ParkingSpot } from '../../models/parking-spot';

@Injectable({
  providedIn: 'root'
})
export class ParkingSpotService {
private getAllParkingSpotsUrl = 'http://localhost:8080/parking-spot';
private removeCarFromParkingSpotUrl = 'http://localhost:8080/parking-spot/{id}';
private addCarToParkingSpotUrl = 'http://localhost:8080/parking-spot/add/{id}';

  constructor(private http: HttpClient) { }

  fetchData(): Observable<ParkingSpot[]> {
    return this.http.get<ParkingSpot[]>(this.getAllParkingSpotsUrl);
  }

  makeParkingSpotAvailable(number: string): Observable<ParkingSpot[]> {
    const url = this.removeCarFromParkingSpotUrl.replace('{id}', number);

    return this.http.put<ParkingSpot[]>(url, { number });
  }

  addCarToParkingSpot(number: string, registrationNumber: string): Observable<ParkingSpot[]> {
    const url = this.addCarToParkingSpotUrl.replace('{id}', number);
    const params = new HttpParams().set('registrationNumber', registrationNumber);
    return this.http.put<ParkingSpot[]>(url, { number }, { params });
    }
}
