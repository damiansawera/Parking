import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
private getUserInfoUrl = 'http://localhost:8080/user';

  constructor(private http: HttpClient) { }

getUserInfo(): Observable<User> {
  return this.http.get<User>(this.getUserInfoUrl);
}
}
