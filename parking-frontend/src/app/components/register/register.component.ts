import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../header/header.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, HeaderComponent, RouterModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
username: string = '';
password: string = '';
email: string = '';

constructor(private authService: AuthService) {}

register() {
  this.authService.register(this.username, this.password, this.email);
}

}
