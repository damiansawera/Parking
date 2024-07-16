import { Component } from '@angular/core';
import { LoginComponent } from "../../login/login.component";
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    LoginComponent,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(status => this.isLoggedIn = status);
  }

  redirectToLogin(): void {
    this.router.navigate(['/login']);
  }
  
  logout(): void {
    this.authService.logout();
  }
}
