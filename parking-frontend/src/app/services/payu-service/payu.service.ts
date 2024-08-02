import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PayUService {
  private baseUrl = 'http://localhost:8080/payu';
  constructor(private http: HttpClient) {}


  createOrder(totalAmount: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/order`, { totalAmount });
  }
}
