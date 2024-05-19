import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../../models/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private getCarBrandsUrl = 'http://localhost:8080/car-brands';
  private postNewCarUrl = 'http://localhost:8080/car';
  private getCarByRegistrationNumberUrl = 'http://localhost:8080/car/search';

  constructor(private http: HttpClient) { }

  getCarMakes(): Observable<string[]> {
    return this.http.get<string[]>(this.getCarBrandsUrl);
  }

  saveCar(car: Car): Observable<any> {
    return this.http.post(this.postNewCarUrl, car);
  }

  getCarByRegistrationNumber(registrationNumber: string): Observable<Car[]> {
    return this.http.get<Car[]>
    (this.getCarByRegistrationNumberUrl + '?registrationNumber=' + registrationNumber);
  }
}
