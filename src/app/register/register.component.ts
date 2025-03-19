import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/services';
import { AuthenticationRequest, RegisterRequest } from '../services/models';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
errorMsg: Array<string> = [];
registerRequest: RegisterRequest = { firstname:'',lastname:'',email: '', password: '' };
constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}
login() {
  this.router.navigate(['login']);
}
register() {
  this.errorMsg = [];
  this.authService.register({ body: this.registerRequest }).subscribe({
    next: () => {
      this.router.navigate(['activate-account']);
    },
    error: (err) => {
      if (err.error.validationErrors) {
        this.errorMsg = err.error.validationErrors;
      } else {
        this.errorMsg.push(err.error.error);
      }
    },
  });
}
}

