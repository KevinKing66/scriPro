import { Component, Input } from '@angular/core';
import { Project } from '../../../model/project.model';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'project-card',
    imports: [RouterModule],
    templateUrl: './project-card.component.html',
    styleUrl: './project-card.component.css'
})
export class ProjectCardComponent {
  @Input() project!: Project;
}
