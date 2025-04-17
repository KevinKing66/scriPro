import { Component, Input } from '@angular/core';
import { Projects } from '../../../model/project.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})
export class ProjectDetailsComponent {

  @Input() project: Projects | null = null;
}
