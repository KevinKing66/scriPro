import { Component, inject, Input, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { User } from '../../../authentication/models/user.model';
import { AuthService } from '../../../../core/service/auth.service';
import { UserDetailComponent } from '../../components/user-detail/user-detail.component';
import { FloatingButtonComponent } from '../../../../shared/components/floating-button/floating-button.component';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import { UserProfileComponent } from '../../components/user-profile/user-profile.component';

@Component({
  selector: 'app-user-profile.page',
  imports: [RouterModule, UserProfileComponent, FloatingButtonComponent, LoadingComponent, ],
  templateUrl: './user-profile.page.html',
  styleUrl: './user-profile.page.css'
})
export class UserProfilePage implements OnInit {
  destiny: string | string[] = ['/users'];
  // user?: User;

  // @Input() user!: User;
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

//   destiny: string | string[] = ['/users'];


  private service: UserService = inject(UserService);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);



  ngOnInit() {
    this.find();
  }

  find() {
    this.service.findOne(this.authService.getEmail()).subscribe({
      next: (data: User) => {
        this.user = data;
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }
}
