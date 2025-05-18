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
    @if (project) {
      <app-project-details [project]="project" [isOwner]="isOwner" />
    } @else {
      <app-loading />
    }

    <floating-button [route]="destiny" />
  `
})
export class ProjectDetailPage implements OnInit {
  private readonly projectService = inject(ProjectService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly storageService = inject(StorageService);

  project: Project | null = null;
  isOwner = false;
  destiny: string[] = ['/projects/create'];

  private _id = '';

  ngOnInit(): void {
    this._id = this.route.snapshot.paramMap.get('_id') ?? '';

    if (!this._id) {
      this.router.navigate(['/projects']);
      return;
    }

    this.loadProject();
  }

  private loadProject(): void {
    this.projectService.findOne(this._id).subscribe({
      next: (project) => {
        if (!project) {
          this.router.navigate(['/projects']);
          return;
        }

        this.project = project;
        this.checkOwnership();
      },
      error: () => {
        this.router.navigate(['/projects']);
      }
    });
  }

  private checkOwnership(): void {
    const user = this.storageService.getSession();
    const ownerEmail = this.project?.owner?.email;
    const memberEmails = this.project?.members?.map(m => m.email) || [];

    this.isOwner = [ownerEmail, ...memberEmails].includes(user?.email);
  }
}

