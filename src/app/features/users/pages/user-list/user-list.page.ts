import { Component, OnInit } from '@angular/core';
import { UserListComponent } from '../../components/user-list/user-list.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { User } from '../../../authentication/models/user.model';
import { FloatingButtonComponent } from '../../../../shared/components/floating-button/floating-button.component';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import { UserService } from '../../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginatedResponse } from '../../../../core/models/pagineted-response.model';

@Component({
  selector: 'app-user-list-page',
  imports: [UserListComponent, PaginationComponent, FloatingButtonComponent, LoadingComponent],
  templateUrl: './user-list.page.html',
  styleUrl: './user-list.page.css'
})
export class UserListPage implements OnInit {
  filter: string = "";
  totalPages: number = 0;
  page: number = 1;
  elementsPerPage: number = 10;
  destiny: string | string[] = ['create'];
  users: User[] | null = null;

  constructor(private service: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.service.findAll(this.filter, this.page, this.elementsPerPage)
      .subscribe({
        next: (data: PaginatedResponse<User>) => {
          this.users = data.data;
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

}
