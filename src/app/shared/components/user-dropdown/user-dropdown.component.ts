import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'user-dropdown',
    imports: [CommonModule, RouterModule],
    templateUrl: './user-dropdown.component.html',
    styleUrl: './user-dropdown.component.css'
})
export class UserDropdownComponent {
  showMenu = signal(false);

  logout() {
    console.log('Cerrar sesión');
  }

}
