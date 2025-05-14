import { Component, inject } from '@angular/core';
import { ForgotPasswordFormComponent } from '../../components/forgot-password-form/forgot-password-form.component';
import { AuthService } from '../../../../core/service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ForgotPassword } from '../../models/forgot-password';

@Component({
  selector: 'app-forgot-password.page',
  imports: [ForgotPasswordFormComponent],
  templateUrl: './forgot-password.page.html',
  styleUrl: './forgot-password.page.css'
})
export class ForgotPasswordPage {
  state: "FREE" | "LOADING" | "SUCCESS" | "ERROR" = "FREE";
  errorMsg: string = "";

  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private authService: AuthService = inject(AuthService);

  cancel(){
    this.router.navigate(['/login']);
  }

  forgotPassword(data: ForgotPassword) {
    this.state = "LOADING";
    this.authService.forgotPassword(data).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: err => {
        console.error('Change password failed', err);
        this.state = "ERROR";
        setTimeout(() => {
          this.state = "FREE";
        }, 15000);
        this.errorMsg = err.error.message || err.error || err.message || err;
      }
    });
  }
}
