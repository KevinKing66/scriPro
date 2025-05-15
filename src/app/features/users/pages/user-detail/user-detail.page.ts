import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../../authentication/models/user.model';
import { UserDetailComponent } from '../../components/user-detail/user-detail.component';
import { FloatingButtonComponent } from '../../../../shared/components/floating-button/floating-button.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-detail.page',
  imports: [CommonModule, UserDetailComponent, FloatingButtonComponent, LoadingComponent],
  templateUrl: './user-detail.page.html',
  styleUrl: './user-detail.page.css'
})
export class UserDetailPage implements OnInit, OnDestroy {
  @Input() user?: User;
  destiny: string | string[] = ['/users'];


  constructor(private service: UserService, private router: Router, private route: ActivatedRoute) { }
  email: string = "";

  ngOnInit() {
    this.email = this.route.snapshot.paramMap.get('email') || '';

    if (!this.email) {
      this.router.navigate(['/projects']);
      return;
    }
    this.find();
  }
  
  ngOnDestroy() {
    this.user = undefined;
  }

  find(){
    this.service.findOne(this.email).subscribe({
      next: (data: User) => {
        this.user = data;
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }
}
