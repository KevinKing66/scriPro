import { Component, Input } from '@angular/core';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';

@Component({
    selector: 'app-project-list',
    imports: [ProjectCardComponent, PaginationComponent],
    templateUrl: './project-list.component.html',
    styleUrl: './project-list.component.css'
})
export class ProjectListComponent {
  @Input() projects: any[] = [];
  @Input() loading: boolean = false;
}
