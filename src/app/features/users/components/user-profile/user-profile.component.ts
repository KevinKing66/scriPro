import { Component, Input } from '@angular/core';
import { User } from '../../../authentication/models/user.model';
import { UserStatusLabelPipe } from '../../../../shared/pipes/user-status-label.pipe';
import { DocumentTypeLabelPipe } from '../../../../shared/pipes/document-type-label.pipe';
import { RoleLabelPipe } from '../../../../shared/pipes/role-label.pipe';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  imports: [RoleLabelPipe, DocumentTypeLabelPipe, UserStatusLabelPipe, RouterModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  @Input() user!: User;
}
