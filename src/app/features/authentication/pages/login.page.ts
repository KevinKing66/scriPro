import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/service/auth.service';
import { LoginUserFormComponent } from '../components/login-user-form/login-user-form.component';
import { User } from '../models/user.model';
import { StorageService } from '../../../core/service/storage.service';

@Component({
  standalone: true,
  selector: 'app-login-page',
  imports: [CommonModule, LoginUserFormComponent],
  template: `
    <app-login-user-form [state]="pageState" (submitted)="login($event)" />
  `
})
export class LoginPage {
  pageState: "FREE" | "LOADING" | "SUCCESS" | "ERROR" = "FREE";

  authService: AuthService = inject(AuthService);
  storageService: StorageService = inject(StorageService);
  router: Router = inject(Router);

  login(data: User) {
    this.pageState = "LOADING";
    this.authService.login(data).subscribe({
      next: (res) => {
        this.storageService.setSession(res.user);
        this.authService.setUser(res.user);
        this.authService.setToken(res.access_token);
        this.router.navigate(['/projects']);
      },
      error: err => {
        console.error('Registration failed', err);
        this.pageState = "ERROR";}
    });
  }
}
