import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../header/header.component";
import { RouterModule } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, HeaderComponent, RouterModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
user: User = {
  fullName: '',
  username: '',
  email: '',
  password: ''
};

constructor(private authService: AuthService) {}

register() {
  this.authService.register(this.user).subscribe(response => {
    console.log("Registration successful", response);
  }, error => {
    console.error("Registration failed", error);
  });
}

}
