import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { FloatingButtonComponent } from '../../../shared/components/floating-button/floating-button.component';
import { ProjectDetailsComponent } from '../components/others/project-details/project-details.component';
import { ProjectService } from '../service/project.service';
import { Projects } from '../model/project.model';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';

@Component({
  standalone: true,
  selector: 'app-project-detail-page',
  imports: [CommonModule, ProjectDetailsComponent, FloatingButtonComponent, LoadingComponent],
  template: `
    @if(project) {
      <app-project-details [project]=project></app-project-details>
    }
    @else {
      <app-loading></app-loading>
    }
    <floating-button></floating-button>
  `
})
export class ProjectDetailPage implements OnInit {

  constructor(private projectService: ProjectService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.uuid = this.route.snapshot.paramMap.get('uuid') || '';

    if (!this.uuid) {
      this.router.navigate(['/projects']);
      return;
    }
    // this.findByUuid();
  }

  uuid: string = '';

  project: Projects | null = null;

  findByUuid() {
    this.projectService.getById(this.uuid).subscribe((res: Projects) => {
      if(!res) {
        this.router.navigate(['/projects']);
        return;
      }
      this.project = res;
    });
  }
}
