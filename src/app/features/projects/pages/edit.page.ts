import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { Projects } from '../model/project.model';
import { ProjectService } from '../service/project.service';
import { ProjectEditFormComponent } from '../components/form/project-edit-form/project-edit-form.component';

@Component({
  standalone: true,
  selector: 'app-project-edit-page',
  imports: [CommonModule, ProjectEditFormComponent],
  template: `
  <div class="container">
    <h1>Editar Proyecto</h1>

    @if (project) {
      <app-project-edit-form
        [project]="project"
        (updated)="onUpdate($event)"
      />
    } @else {
      <p>Cargando proyecto...</p>
    }
  </div>
  `
})
export class ProjectEditPage implements OnInit {
  project!: Projects;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    const uuid: string | null = this.route.snapshot.paramMap.get('uuid');
    if(uuid) {
      this.projectService.getById(uuid).subscribe((data) => {
        this.project = data;
      });
    }
  }

  onUpdate(updatedProject: Projects): void {
    this.projectService.update(this.project.uuid!, updatedProject).subscribe(() => {
      // redirige o muestra feedback
      alert('Proyecto actualizado con éxito.');
    });
  }
}
