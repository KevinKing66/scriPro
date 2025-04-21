import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { FloatingButtonComponent } from '../../../shared/components/floating-button/floating-button.component';
import { AuthService } from '../../../core/service/auth.service';
import { ProjectListComponent } from '../components/others/project-list/project-list.component';

@Component({
  standalone: true,
  selector: 'app-project-list-page',
  imports: [CommonModule, ProjectListComponent, FloatingButtonComponent],
  template: `
  <div class="d-flex">
    <app-project-list></app-project-list>
    <floating-button></floating-button>
  </div>
  `
})
export class ProjectListPage {
  constructor(private authService: AuthService, private router: Router) { }

  fetchData(data: any) {
  }
}
