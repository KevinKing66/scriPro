import { Component, Input } from '@angular/core';
import { User } from '../../../authentication/models/user.model';
import { RoleLabelPipe } from '../../../../shared/pipes/role-label.pipe';
import { DocumentTypeLabelPipe } from '../../../../shared/pipes/document-type-label.pipe';
import { UserStatusLabelPipe } from '../../../../shared/pipes/user-status-label.pipe';

@Component({
  selector: 'app-user-detail',
  imports: [RoleLabelPipe, DocumentTypeLabelPipe, UserStatusLabelPipe],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent {
  @Input() user!: User;
}
