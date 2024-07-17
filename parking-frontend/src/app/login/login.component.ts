import { Component } from '@angular/core';
import { AuthService } from '../services/auth-service/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [FormsModule]
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService) { }

  login() {
    if(this.username && this.password) {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        console.log('Login process complete', response);
      },
      error => {
        console.error('Error during login process', error);
      }
    );
} else {
  console.error('Username and password are required');
}
}
}
