import { Component } from '@angular/core';
import { UserListComponent } from '../../components/user-list/user-list.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { User } from '../../../authentication/models/user.model';
import { FloatingButtonComponent } from '../../../../shared/components/floating-button/floating-button.component';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';

@Component({
  selector: 'app-user-list-page',
  imports: [UserListComponent, PaginationComponent, FloatingButtonComponent, LoadingComponent],
  templateUrl: './user-list.page.html',
  styleUrl: './user-list.page.css'
})
export class UserListPage {
  maxPages: number = 0;
  page: number = 1;
  destiny: string | string[] = ['create'];
  users: User[] | null = [
    {
      "_id": "6805683643e3930f93e62131",
      "email": "kevinvallenato2002@gmail.com",
      "code": "20250",
      "name": "Kevin",
      "lastName": "Caicedo",
      "password": "$2b$10$FvRqIm5G25.cIuAhZReI.efzkZmeLBRjsxuYf86K8kgjL3RQ2UOUC",
      "role": "ADMIN",
      "status": "ACTIVE",
      "docNum": "1003235293",
      "docType": "CC",
      "phone": "+573158618906",
    },
    {
      "_id": "68057d72a6cf64238fae44e1",
      "email": "john.doe@example.com",
      "code": "ST12345",
      "name": "Picha corta",
      "lastName": "Doe",
      "password": "securePassword123!",
      "role": "STUDENT",
      "researchGroupId": "101",
      "status": "ACTIVE",
      "docNum": "123456789",
      "docType": "CC",
      "phone": "+573001234567"
    }];
}
