import { Component, inject, Input, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { User } from '../../../authentication/models/user.model';
import { AuthService } from '../../../../core/service/auth.service';
import { UserDetailComponent } from '../../components/user-detail/user-detail.component';
import { FloatingButtonComponent } from '../../../../shared/components/floating-button/floating-button.component';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import { UserProfileComponent } from '../../components/user-profile/user-profile.component';
import { StorageService } from '../../../../core/service/storage.service';

@Component({
  selector: 'app-user-profile.page',
  imports: [RouterModule, UserProfileComponent, FloatingButtonComponent, LoadingComponent, ],
  templateUrl: './user-profile.page.html',
  styleUrl: './user-profile.page.css'
})
export class UserProfilePage implements OnInit {
  destiny: string | string[] = ['/users'];
  user?: User;

  private service: UserService = inject(UserService);
  private storageService: StorageService = inject(StorageService);
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.find();
  }

  find() {
    const _id = this.storageService.getSession()?.email;
    this.service.findOne(_id ?? '').subscribe({
      next: (data: User) => {
        this.user = data;
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }
}
