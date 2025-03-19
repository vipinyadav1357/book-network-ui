import { Component, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/services';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CodeInputComponent, CodeInputModule } from 'angular-code-input';
import { skipUntil } from 'rxjs';

@Component({
  selector: 'app-activate-account',
  standalone: true,
  imports: [CommonModule, FormsModule, CodeInputModule],
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.scss',
})
export class ActivateAccountComponent {
  message: string = '';
  isOkay: boolean = false;
  submitted: boolean = false;
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) { }
  onCodeCompleted(token: string) {
    this.confirmAccount(token);
  }
  redirectToLogin() {
    this.router.navigate(['login']);
  }
  private confirmAccount(token: string) {
    this.authService.confirm({ token }).subscribe({
      next: () => {
        this.message = 'Account activated successfully';
        this.isOkay = true;
        this.submitted = true;
      },
      error: (err) => {
        this.message = 'Invalid token';
        console.log(err);
        this.isOkay = false;
        this.submitted = true;
      },
    });
  }
  // protected readonly skipUntil = skipUntil;

}
