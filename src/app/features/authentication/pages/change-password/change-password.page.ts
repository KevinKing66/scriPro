import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/service/auth.service';
import { Router } from '@angular/router';
import { ChangePassword } from '../../models/change-password';
import { ChangePasswordFormComponent } from '../../components/change-password-form/change-password-form.component';
import { FloatingButtonComponent } from '../../../../shared/components/floating-button/floating-button.component';

@Component({
  selector: 'app-change-password.page',
  imports: [ChangePasswordFormComponent, FloatingButtonComponent],
  templateUrl: './change-password.page.html',
  styleUrl: './change-password.page.css'
})
export class ChangePasswordPage implements OnInit {
  state: "FREE" | "LOADING" | "ERROR" | "SUCCESS" = "FREE";
  errorMsg: string = "";
  email: string = "";
  destiny: string[] = ["/users/profile"];

  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit(): void {
    this.email = this.authService.getEmail();
    if (!this.email) {
      this.router.navigate(['/authentication/login']);
      return;
    }
  }


   changePassword(data: ChangePassword) {
     this.authService.changePassword({ email: this.email, ...data})
     .subscribe({
      next: this.nextFn.bind(this),
      error: this.errorFn.bind(this)
    });
  }

  nextFn(){
    this.errorMsg = "";
    this.state = "SUCCESS";
    setTimeout(() => {
      this.router.navigate(['/users/profile']);
    }, 8000);
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
