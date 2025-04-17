import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { FloatingButtonComponent } from '../../../shared/components/floating-button/floating-button.component';
import { AuthService } from '../../authentication/service/auth.service';
import { ProjectListComponent } from '../components/project-list/project-list.component';

@Component({
  standalone: true,
  selector: 'app-project-detail-page',
  imports: [CommonModule, ProjectListComponent, FloatingButtonComponent],
  template: `
    <app-project-list></app-project-list>
    <floating-button></floating-button>
  `
})
export class ProjectDetailPage {
  constructor(private authService: AuthService, private router: Router) { }

  fetchData(data: any) {
  }
}
