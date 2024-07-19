import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Car } from '../../models/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private getCarBrandsUrl = 'http://localhost:8080/car-brands';
  private postNewCarUrl = 'http://localhost:8080/car';
  private getAllCarsUrl = 'http://localhost:8080/car/all';
  private getAllUserCarsUrl = 'http://localhost:8080/car/user';
  private getCarByRegistrationNumberUrl = 'http://localhost:8080/car/search';

  constructor(private http: HttpClient) { }

  getCarMakes(): Observable<string[]> {
    return this.http.get<string[]>(this.getCarBrandsUrl);
  }

  saveCar(car: Car): Observable<any> {
    return this.http.post(this.postNewCarUrl, car);
  }

  getCarByRegistrationNumber(registrationNumber: string): Observable<any[]> {
    return this.http.get<any[]>
    (this.getCarByRegistrationNumberUrl + '?registrationNumber=' + registrationNumber);
  }

  getParkedCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.getAllCarsUrl).pipe(
      map(cars => cars.filter(car => car.parkingSpotNumber !== null))
    );
  }

  getAllUserCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.getAllUserCarsUrl);
  }

}
