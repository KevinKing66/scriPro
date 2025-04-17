import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { ProjectService } from '../service/project.service';
import { Projects } from '../model/project.model';
import { ProjectCreateFormComponent } from '../components/form/project-create-form/project-create-form.component';

@Component({
  standalone: true,
  selector: 'app-project-create-page',
  imports: [CommonModule, ProjectCreateFormComponent, ProjectCreateFormComponent],
  template: `
    <div class="d-flex">
      <h1>Crear Proyecto</h1>
      <app-project-create-form (formSubmit)="handleSubmit($event)"/>
    </div>
  `
})
export class ProjectCreatePage {
  constructor(private service: ProjectService, private router: Router) { }

  @Output() submitted = new EventEmitter<Projects>();

  handleSubmit(project: Projects) {
    this.service.create(project).subscribe({
      next: () => console.log('Proyecto creado'),
      error: err => console.error(err),
    });
  }
}
