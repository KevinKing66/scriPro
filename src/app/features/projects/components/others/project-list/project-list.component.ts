import { Component, Input } from '@angular/core';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { Project } from '../../../model/project.model';

@Component({
    selector: 'app-project-list',
    imports: [ProjectCardComponent],
    templateUrl: './project-list.component.html',
    styleUrl: './project-list.component.css'
})
export class ProjectListComponent {
  @Input() projects: Project[] = [];
}
