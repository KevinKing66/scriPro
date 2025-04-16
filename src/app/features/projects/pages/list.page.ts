import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { FloatingButtonComponent } from '../../../shared/components/floating-button/floating-button.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { AuthService } from '../../authentication/service/auth.service';
import { ProjectListComponent } from '../components/project-list/project-list.component';

@Component({
  standalone: true,
  selector: 'app-register-page',
  imports: [CommonModule, PaginationComponent, ProjectListComponent, FloatingButtonComponent],
  template: `
    <app-project-list></app-project-list>
    <floating-button></floating-button>
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
