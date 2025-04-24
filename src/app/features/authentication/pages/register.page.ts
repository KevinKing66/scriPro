import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RegisterUserFormComponent } from '../components/register-user-form/register-user-form.component';
import { AuthService } from '../../../core/service/auth.service';
import { User } from '../models/user.model';
import { FloatingButtonComponent } from '../../../shared/components/floating-button/floating-button.component';

@Component({
  standalone: true,
  selector: 'app-register-page',
  imports: [CommonModule, RegisterUserFormComponent, FloatingButtonComponent],
  template: `
    <app-register-user-form [state]="state" [errorMsg]="errorMsg" (submitted)="register($event)" />
    <floating-button [route]=destiny content="<"></floating-button>
  `
})
export class RegisterPage {
  state: "FREE" | "LOADING" | "ERROR" | "SUCCESS" = "FREE";
  errorMsg: string = "";
  destiny: string | string[] = ['/users'];

  constructor(private authService: AuthService, private router: Router) { }

  register(data: User) {
    this.authService.register(data).subscribe({
      next: this.nextFn.bind(this),
      error: this.errorFn.bind(this)
    });
  }

  nextFn(){
    this.errorMsg = "";
    this.state = "SUCCESS";
    setTimeout(() => {
      this.state = "FREE";
    }, 8000);
  // this.router.navigate(['/users'];
  }

  errorFn(err: any) {
    console.log("Error: ", err);
    this.state = "ERROR";
    setTimeout(() => {
      this.state = "FREE";
    }, 15000);
    this.errorMsg = err.error.message || err.error || err.message || err;
    console.error('Registration failed', err)
  }
}
