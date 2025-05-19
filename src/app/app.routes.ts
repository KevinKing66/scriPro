import { Routes } from '@angular/router';
import { ProjectListPage } from './features/projects/pages/list.page';
import { ProjectCreatePage } from './features/projects/pages/create.page';
import { ProjectDetailPage } from './features/projects/pages/detail.page';
import { ProjectEditPage } from './features/projects/pages/edit.page';
import { LoginPage } from './features/authentication/pages/login.page';
import { RegisterPage } from './features/authentication/pages/register.page';
import { MainLayoutComponent } from './shared/layouts/main/main-layout.component';
import { UserListPage } from './features/users/pages/user-list/user-list.page';
import { UserDetailPage } from './features/users/pages/user-detail/user-detail.page';
import { UserProfilePage } from './features/users/pages/user-profile/user-profile.page';
import { ChangePasswordPage } from './features/authentication/pages/change-password/change-password.page';
import { ForgotPasswordPage } from './features/authentication/pages/forgot-password/forgot-password.page';
import { ResearchGroupListPageComponent } from './features/research-group/page/research-group-list-page/research-group-list-page.component';
import { ResearchGroupCreateEditPageComponent } from './features/research-group/page/research-group-create-edit-page/research-group-create-edit-page.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'projects', component: MainLayoutComponent, canActivate: [authGuard], children: [
      { path: '', component: ProjectListPage },
      { path: 'create', component: ProjectCreatePage },
      { path: 'edit/:_id', component: ProjectEditPage },
      { path: ':_id', component: ProjectDetailPage },
    ]
  },
  {
    path: 'research-group', component: MainLayoutComponent, canActivate: [authGuard], children: [
      { path: '', component: ResearchGroupListPageComponent },
      { path: 'create', component: ResearchGroupCreateEditPageComponent },
      { path: 'edit/:_id', component: ResearchGroupCreateEditPageComponent },
      // { path: ':_id', component: ProjectDetailPage },
    ]
  },
  {
    path: 'users', component: MainLayoutComponent, canActivate: [authGuard], children: [
      { path: '', component: UserListPage },
      { path: 'create', component: RegisterPage },
      { path: 'profile', component: UserProfilePage },
      { path: 'edit/:email', component: RegisterPage },
      { path: ':email', component: UserDetailPage },
    ]
  },
  {
    path: 'authentication', canActivate: [authGuard], component: MainLayoutComponent, children: [
      { path: 'register', component: RegisterPage },
      { path: 'change-password', component: ChangePasswordPage },
    ]
  },
  {
    path: 'authentication', children: [
      { path: 'forgot-password', component: ForgotPasswordPage },
    ]
  },
  { path: 'login', component: LoginPage },
  {path: '**', redirectTo: 'projects' },
  //
];
