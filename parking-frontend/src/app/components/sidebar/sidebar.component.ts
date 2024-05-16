import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private router: Router) { }

  navigateToSpots() {
    this.router.navigate(['/spots'])
  }
  navigateToHome() {
    this.router.navigate([''])
  }
}
