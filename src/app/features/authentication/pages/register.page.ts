import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RegisterUserFormComponent } from '../components/register-user-form/register-user-form.component';
import { AuthService } from '../service/auth.service';
import { User } from '../models/user.model';
import { FloatingButtonComponent } from '../../../shared/components/floating-button/floating-button.component';

@Component({
  standalone: true,
  selector: 'app-register-page',
  imports: [CommonModule, RegisterUserFormComponent, FloatingButtonComponent],
  template: `
    <app-register-user-form (submitted)="register($event)" />
    <floating-button [route]=destiny content="<"></floating-button>
  `
})
export class RegisterPage {
  state: "free" | "loading" | "error" | "success" = "free";
  destiny: string | string[] = ['/users'];

  constructor(private authService: AuthService, private router: Router) { }

  register(data: User) {
    this.authService.register(data).subscribe({
      next: this.nextFn.bind(this),
      error: this.errorFn.bind(this)
    });
  }

  nextFn(){
    this.state = "success";
    setTimeout(() => {
      this.state = "free";
    }, 2000);
  // this.router.navigate(['/users'];
  }

  errorFn(err: any) {
    this.state = "error";
    setTimeout(() => {
      this.state = "free";
    }, 2000);
    console.error('Registration failed', err)
  }
}
