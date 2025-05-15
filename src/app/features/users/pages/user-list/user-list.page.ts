import { Component, OnInit } from '@angular/core';
import { UserListComponent } from '../../components/user-list/user-list.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { User } from '../../../authentication/models/user.model';
import { FloatingButtonComponent } from '../../../../shared/components/floating-button/floating-button.component';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import { UserService } from '../../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-list-page',
  imports: [UserListComponent, PaginationComponent, FloatingButtonComponent, LoadingComponent],
  templateUrl: './user-list.page.html',
  styleUrl: './user-list.page.css'
})
export class UserListPage implements OnInit {
  maxPages: number = 0;
  page: number = 1;
  destiny: string | string[] = ['create'];
  users: User[] | null = null;
  filter: string = "";

  constructor(private service: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.service.find().subscribe({
      next: (data: User[]) => {
        this.users = data;
        this.maxPages = Math.ceil(this.users.length / 10); // Assuming 10 users per page
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

}
