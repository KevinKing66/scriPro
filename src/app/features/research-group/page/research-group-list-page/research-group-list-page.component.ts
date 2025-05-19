import { Component } from '@angular/core';
import { PaginatedResponse } from '../../../../core/models/pagineted-response.model';
import { ResearchGroup } from '../../models/research-group.model';
import { ResearchGroupsService } from '../../../../core/service/research-groups.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FloatingButtonComponent } from '../../../../shared/components/floating-button/floating-button.component';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { ResearchGroupListComponent } from '../../components/research-group-list/research-group-list.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-research-group-list-page',
  imports: [CommonModule, FormsModule, ResearchGroupListComponent, FloatingButtonComponent, LoadingComponent, PaginationComponent],
  templateUrl: './research-group-list-page.component.html',
  styleUrl: './research-group-list-page.component.css'
})
export class ResearchGroupListPageComponent {
  filter: string = "";
  totalPages: number = 0;
  page: number = 1;
  elementsPerPage: number = 10;
  destiny: string | string[] = ['create'];
  researchGroups: ResearchGroup[] | null = null;

  constructor(private service: ResearchGroupsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.service.findAllWithPagination(this.filter, this.page, this.elementsPerPage)
      .subscribe({
        next: (data: PaginatedResponse<ResearchGroup>) => {
          this.researchGroups = data.data;
          this.totalPages = data.totalPages;
        },
        error: (err: any) => {
          console.error(err);
        }
      });
  }


  onSearch(): void {
    this.page = 1;
    this.fetchData();
  }

  onPageChange(newPage: number): void {
    this.page = newPage;
    this.fetchData();
  }

}
