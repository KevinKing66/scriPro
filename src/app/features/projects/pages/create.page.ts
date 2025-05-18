import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { ProjectService } from '../service/project.service';
import { Project } from '../model/project.model';
import { ProjectCreateFormComponent } from '../components/form/project-create-form/project-create-form.component';
import { FloatingButtonComponent } from '../../../shared/components/floating-button/floating-button.component';
import { ResearchGroupsService } from '../../../core/service/research-groups.service';
import { StorageService } from '../../../core/service/storage.service';
import { ResearchGroup } from '../../research-group/models/research-group.model';

@Component({
  standalone: true,
  selector: 'app-project-create-page',
  imports: [CommonModule, ProjectCreateFormComponent, FloatingButtonComponent],
  template: `
    <div class="d-flex">
      <app-project-create-form
      [owner]="owner"
      [state]="state" [errorMsg]="errorMsg"
      [researchGroups]="researchGroups"
      (formSubmit)="handleSubmit($event)"/>
      <floating-button [route]=destiny content="<"></floating-button>
    </div>
  `
})
export class ProjectCreatePage implements OnInit {
  constructor(private service: ProjectService, private researchGroupsService: ResearchGroupsService, private storageService: StorageService, private router: Router) { }

  owner = {
    "email": "kevin.caicedo.d@uniautonoma.edu",
    "name": "Kevin Caicedo"
  };
  state: "FREE" | "LOADING" | "ERROR" | "SUCCESS" = "FREE";
  errorMsg: string = "";

  @Output() submitted = new EventEmitter<Project>();
  destiny: string | string[] = ['/projects'];

  researchGroups: ResearchGroup[] = [];

  ngOnInit() {
    this.loadResearchGroups();
  }

  handleSubmit(project: Project) {
    this.service.create(project).subscribe({
      next: () => {
        this.errorMsg = "";
        this.state = "SUCCESS";
        setTimeout(() => {
          this.state = "FREE";
        }, 8000);
      },
      error: err => {
        console.log("Error: ", err);
        this.state = "ERROR";
        setTimeout(() => {
          this.state = "FREE";
        }, 15000);
        this.errorMsg = err.error.message || err.error || err.message || err;
      },
    });
  }

  loadResearchGroups(){
    this.researchGroupsService.findAll().subscribe({
      next: (data: any[]) => {
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
