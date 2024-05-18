import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarBrandsService {
  private apiUrl = 'http://localhost:8080/car-brands';

  constructor(private http: HttpClient) { }

  getCarBrands(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl);
  }
}
