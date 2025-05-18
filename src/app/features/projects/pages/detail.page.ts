import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { FloatingButtonComponent } from '../../../shared/components/floating-button/floating-button.component';
import { ProjectDetailsComponent } from '../components/others/project-details/project-details.component';
import { ProjectService } from '../service/project.service';
import { Evidences, Project } from '../model/project.model';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { StorageService } from '../../../core/service/storage.service';
import { Member } from '../model/create-project.model';

@Component({
  standalone: true,
  selector: 'app-project-detail-page',
  imports: [CommonModule, ProjectDetailsComponent, FloatingButtonComponent, LoadingComponent],
  template: `
    @if(project) {
      <app-project-details [project]=project [isOwner]=isOwner></app-project-details>
    }
    @else {
      <app-loading></app-loading>
    }
    <floating-button [route]=destiny></floating-button>
  `
})
export class ProjectDetailPage implements OnInit {

  private projectService: ProjectService = inject(ProjectService);
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);
  storageService: StorageService = inject(StorageService);

  isOwner: boolean = false;

  ngOnInit() {
    this._id = this.route.snapshot.paramMap.get('_id') || '';

    if (!this._id) {
      this.router.navigate(['/projects']);
      return;
    }
    this.find();
  }

  _id: string = '';
  destiny: string | string[] = ['/projects/create'];

  project: Project | null = null;

  find() {
    this.projectService.findOne(this._id).subscribe((res: Project) => {
      if (!res) {
        this.router.navigate(['/projects']);
        return;
      }
      this.project = res;
      this.refreshIsOwner();
    });
  }

  refreshIsOwner() {
    const user = this.storageService.getSession();
    const owner = this.project?.owner;
    const members = this.project?.members;
    if (owner?.email === user?.email || members?.some((member: Member) => member.email === user?.email)) {
      this.isOwner = true;
    }

  }
}
