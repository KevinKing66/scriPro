import { Routes } from '@angular/router';
import { ProjectListPage } from './features/projects/pages/list.page';
import { ProjectCreatePage } from './features/projects/pages/create.page';
import { ProjectDetailPage } from './features/projects/pages/detail.page';
import { ProjectEditPage } from './features/projects/pages/edit.page';
import { LoginPage } from './features/authentication/pages/login.page';
import { RegisterPage } from './features/authentication/pages/register.page';
import { MainLayoutComponent } from './shared/layouts/main/main-layout.component';

export const routes: Routes = [
  {
    path: 'projects', component: MainLayoutComponent, children: [
      { path: '', component: ProjectListPage },
      { path: 'create', component: ProjectCreatePage },
      { path: 'edit/:uuid', component: ProjectEditPage },
      { path: ':uuid', component: ProjectDetailPage },
    ]
  },
  { path: 'user', component: MainLayoutComponent, children: [
      { path: 'create', component: RegisterPage },
      { path: 'edit/:uuid', component: RegisterPage },
    ]
  },
  { path: 'login', component: LoginPage },
  //
];
