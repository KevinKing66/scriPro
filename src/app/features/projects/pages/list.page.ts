import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { FloatingButtonComponent } from '../../../shared/components/floating-button/floating-button.component';
import { AuthService } from '../../../core/service/auth.service';
import { ProjectListComponent } from '../components/others/project-list/project-list.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { ProjectService } from '../service/project.service';
import { Project } from '../model/project.model';
import { PaginatedResponse } from '../../../core/models/pagineted-response.model';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';

@Component({
  standalone: true,
  selector: 'app-project-list-page',
  imports: [CommonModule, ProjectListComponent, PaginationComponent, FloatingButtonComponent, LoadingComponent],
  template: `
    @if(projects == null) {
      <app-loading></app-loading>
    } @else if (projects.length == 0) {
      <div class="column">
        <h1>No se encontraron proyectos</h1>
      </div>
    } @else {
      <div class="d-flex">
        <app-project-list [projects]="projects"></app-project-list>
        <app-pagination
        [maxPages]="totalPages"
        [initialPage]="page"
        (pageChange)="onPageChange($event)"></app-pagination>
        <floating-button></floating-button>
      </div>
    }
  `
})
export class ProjectListPage implements OnInit{
  filter: string = "";
  totalPages: number = 0;
  page: number = 1;
  elementsPerPage: number = 1;
  projects: Project[] | null = null;

  constructor(private service: ProjectService, private router: Router) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.service.findAll(this.filter, this.page, this.elementsPerPage)
    .subscribe({
      next: (data: PaginatedResponse<Project>) => {
        this.projects = data.data;
        this.totalPages = data.totalPages;
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  onPageChange(newPage: number): void {
    console.log("cambiando pagina, a pag. ", newPage);
    this.page = newPage;
    this.fetchData();
  }
}
