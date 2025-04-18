import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { ProjectService } from '../service/project.service';
import { Projects } from '../model/project.model';
import { ProjectCreateFormComponent } from '../components/form/project-create-form/project-create-form.component';
import { FloatingButtonComponent } from '../../../shared/components/floating-button/floating-button.component';

@Component({
  standalone: true,
  selector: 'app-project-create-page',
  imports: [CommonModule, ProjectCreateFormComponent, FloatingButtonComponent],
  template: `
    <div class="d-flex">
      <app-project-create-form (formSubmit)="handleSubmit($event)"/>
      <floating-button [route]=destiny customElement="<"></floating-button>
    </div>
  `
})
export class ProjectCreatePage {
  constructor(private service: ProjectService, private router: Router) { }

  @Output() submitted = new EventEmitter<Projects>();
  destiny: string | string[] = ['/projects'];

  handleSubmit(project: Projects) {
    this.service.create(project).subscribe({
      next: () => console.log('Proyecto creado'),
      error: err => console.error(err),
    });
  }
}
