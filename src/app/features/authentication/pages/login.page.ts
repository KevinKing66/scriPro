import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { LoginUserFormComponent } from '../components/login-user-form/login-user-form.component';
import { User } from '../models/user.model';

@Component({
  standalone: true,
  selector: 'app-login-page',
  imports: [CommonModule, LoginUserFormComponent],
  template: `
    <app-login-user-form (submitted)="login($event)" />
  `
})
export class LoginPage {
  constructor(private authService: AuthService, private router: Router) { }

  login(data: User) {
    console.log('Login data:', data);
    this.authService.register(data).subscribe({
      next: () => this.router.navigate(['/auth/login']),
      error: err => console.error('Registration failed', err)
    });
  }
}
