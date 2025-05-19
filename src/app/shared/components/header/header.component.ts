import { Component, inject } from '@angular/core';
import { UserDropdownComponent } from '../user-dropdown/user-dropdown.component';
import { Router, RouterModule } from '@angular/router';
import { FilterService } from '../../../core/service/filter.service';

@Component({
    selector: 'app-header',
    imports: [UserDropdownComponent, RouterModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {
  private readonly router: Router = inject(Router);
  filterService: FilterService = inject(FilterService);

  redirectIfNotInProjects() {
    const currentUrl = this.router.url;
    if (!currentUrl.startsWith('/projects')) {
      this.router.navigate(['/projects']);
    }
  }

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.filterService.setFilter(input.value);
  }
}
