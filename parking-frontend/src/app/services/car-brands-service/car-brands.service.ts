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

  constructor(private http: HttpClient) { }

  getCarBrands(): Observable<string[]> {
    return this.http.get<string[]>(this.getCarBrandsUrl);
  }

  saveCar(car: Car): Observable<any> {
    return this.http.post(this.postNewCarUrl, car);
  }
}
