import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ParkingReceipt } from '../../models/parking-receipt';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {
  private generateDocumentUrl = 'http://localhost:8080/document/generate';

  constructor(private http: HttpClient) { }

  generateReceipt(receiptData: ParkingReceipt): Observable<Blob> {
    return this.http.post<Blob>(this.generateDocumentUrl, receiptData, {
      responseType: 'blob' as 'json'
    }).pipe(
      map(res => new Blob([res], { type: 'application/pdf' }))
    );
  }
  
}
