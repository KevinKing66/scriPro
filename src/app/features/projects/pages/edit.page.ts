import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { Project } from '../model/project.model';
import { ProjectService } from '../service/project.service';
import { ProjectEditFormComponent } from '../components/form/project-edit-form/project-edit-form.component';
import { ResearchGroup } from '../../research-group/models/research-group.model';
import { ResearchGroupsService } from '../../../core/service/research-groups.service';
import { FloatingButtonComponent } from '../../../shared/components/floating-button/floating-button.component';
import { UpdateProject } from '../model/update-project.model';

@Component({
  standalone: true,
  selector: 'app-project-edit-page',
  imports: [CommonModule, ProjectEditFormComponent, FloatingButtonComponent],
  template: `
  <div class="d-flex column">
    <h1>Editar Proyecto</h1>

    @if (project) {
      <app-project-edit-form
        [project]="project"
        [state]="state" [errorMsg]="errorMsg"
        [researchGroups]="researchGroups"
        (updated)="onUpdate($event)"
      />
    } @else {
      <p>Cargando proyecto...</p>
    }
    <floating-button [route]=destiny content="<"></floating-button>
  </div>
  `
})
export class ProjectEditPage implements OnInit {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private projectService: ProjectService = inject(ProjectService);
  private researchGroupsService: ResearchGroupsService = inject(ResearchGroupsService);

  destiny: string | string[] = ['/projects'];

  project!: Project;
  researchGroups: ResearchGroup[] = [];

  state: "FREE" | "LOADING" | "ERROR" | "SUCCESS" = "FREE";
  errorMsg: string = "";

  ngOnInit(): void {
    const _id: string | null = this.route.snapshot.paramMap.get('_id');
    if (_id) {
      this.projectService.findOne(_id).subscribe((data) => {
        this.project = data;
      });
      this.loadResearchGroups();
    }
  }

  onUpdate(updatedProject: UpdateProject): void {
    console.log("Updated project: ", updatedProject);
    // this.projectService.update(this.project._id, updatedProject).subscribe({
    //   next: () => {
    //     this.errorMsg = "";
    //     this.state = "SUCCESS";
    //     setTimeout(() => {
    //       this.state = "FREE";
    //     }, 8000);
    //   },
    //   error: err => {
    //     console.log("Error: ", err);
    //     this.state = "ERROR";
    //     setTimeout(() => {
    //       this.state = "FREE";
    //     }, 15000);
    //     this.errorMsg = err.error.message || err.error || err.message || err;
    //   },
    // });
  }


  loadResearchGroups() {
    this.researchGroupsService.findAll().subscribe({
      next: (data: ResearchGroup[]) => {
        this.researchGroups = data.map(item => ({
          code: item.code,
          name: item.name,
          description: item.description,
          faculty: item.faculty,
          creationDate: item.creationDate || '',
          admin: item.admin,
          status: item.status,
          knowledgeArea: item.knowledgeArea,
          contactEmail: item.contactEmail,
          contactPhone: item.contactPhone,
        }));
      },
      error: (err: any) => {
        console.log("Error: ", err);
        this.state = "ERROR";
        setTimeout(() => {
          this.state = "FREE";
        }, 15000);
        this.errorMsg = err.error.message || err.error || err.message || err;
        console.error(err);
      }
    });
  }
}
