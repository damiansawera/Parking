import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth-service/auth.service';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isLoggedIn$: Observable<Boolean>;

  constructor(private router: Router, private authService: AuthService) {
    this.isLoggedIn$ = this.authService.isLoggedIn();
   }

  navigateToSpots() {
    this.router.navigate(['/spots'])
  }

  navigateToHome() {
    this.router.navigate([''])
  }
  
  navigateToMyBookings() {
    this.router.navigate(['/my-bookings'])
  }
}
