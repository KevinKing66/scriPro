import { Component, inject, OnInit } from '@angular/core';
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
import { FilterService } from '../../../core/service/filter.service';
import { ReportService } from '../service/report.service';

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
      <div class="d-flex content">

        <div>
          <button (click)="exportToPdf()" class="btn-fat btn btn-primary">
            Exportar reporte de proyectos
          </button>
        </div>
        <app-project-list [projects]="projects"></app-project-list>
        <app-pagination
        [maxPages]="totalPages"
        [initialPage]="page"
        (pageChange)="onPageChange($event)"></app-pagination>
      </div>
    }
    <floating-button></floating-button>
  `
})
export class ProjectListPage implements OnInit{
  private service: ProjectService = inject(ProjectService);
  private readonly reportService: ReportService = inject(ReportService);
  private filterService: FilterService = inject(FilterService);
  filter: string = "";
  totalPages: number = 0;
  page: number = 1;
  elementsPerPage: number = 5;
  projects: Project[] | null = null;

  ngOnInit(): void {
    this.filterService.filter$.subscribe(value => {
      this.filter = value;
      this.fetchData();
    });
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
    this.page = newPage;
    this.fetchData();
  }

  exportToPdf() {
    if (this.projects == null) return;
    this.reportService.generateProjectsReportPdf(this.projects);
  }

}
