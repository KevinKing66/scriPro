import { Component, Input } from '@angular/core';
import { User } from '../../../authentication/models/user.model';
import { UserDetailComponent } from '../../components/user-detail/user-detail.component';
import { FloatingButtonComponent } from '../../../../shared/components/floating-button/floating-button.component';

@Component({
  selector: 'app-user-detail.page',
  imports: [UserDetailComponent, FloatingButtonComponent],
  templateUrl: './user-detail.page.html',
  styleUrl: './user-detail.page.css'
})
export class UserDetailPage {
  @Input() user: User = {
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
  };
  destiny: string | string[] = ['/users'];

}
