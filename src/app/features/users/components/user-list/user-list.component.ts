import { Component, Input } from '@angular/core';
import { User } from '../../../authentication/models/user.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-list',
  imports: [RouterModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  @Input() users: User[] = [];
}
