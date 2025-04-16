import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RegisterUserFormComponent } from '../components/register-user-form/register-user-form.component';
import { AuthService } from '../service/auth.service';

@Component({
  standalone: true,
  selector: 'app-register-page',
  imports: [CommonModule, RegisterUserFormComponent],
  template: `
    <h2>Registro de usuario</h2>
    <app-login-user-form (submitted)="login($event)" />
  `
})
export class RegisterPage {
  constructor(private authService: AuthService, private router: Router) { }

  login(data: any) {
    this.authService.register(data).subscribe({
      next: () => this.router.navigate(['/auth/login']),
      error: err => console.error('Registration failed', err)
    });
  }
}
