import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Wallet } from '../../models/wallet';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  private deductFromBalanceUrl = 'http://localhost:8080/wallet/deduct';
  private topUpBalanceUrl = 'http://localhost:8080/wallet/top-up';

  constructor(private http: HttpClient) { }

  deductFromBalance(priceToPay: number): Observable<Wallet> {
    const params = new HttpParams().set('amount', priceToPay.toString());
    return this.http.put<Wallet>(this.deductFromBalanceUrl, {}, { params });
  }

  topUpBalance(topUpAmount: number): Observable<Wallet> {
    const params = new HttpParams().set('amount', topUpAmount.toString());
    return this.http.put<Wallet>(this.topUpBalanceUrl, {}, { params });
  }

}
