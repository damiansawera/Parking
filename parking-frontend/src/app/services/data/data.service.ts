import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ParkingSpot } from '../../components/spots/parking-spot';

@Injectable({
  providedIn: 'root'
})
export class DataService {
private apiUrl = 'http://localhost:8080/parking-spot';

  constructor(private http: HttpClient) { }

  fetchData(): Observable<ParkingSpot[]> {
    return this.http.get<ParkingSpot[]>(this.apiUrl);
  }
}
