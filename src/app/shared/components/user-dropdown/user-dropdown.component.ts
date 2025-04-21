import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../features/authentication/service/auth.service';

@Component({
    selector: 'user-dropdown',
    imports: [CommonModule, RouterModule],
    templateUrl: './user-dropdown.component.html',
    styleUrl: './user-dropdown.component.css'
})
export class UserDropdownComponent {
  authService = inject(AuthService);
  router: Router = inject(Router);
  showMenu = signal(false);

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
