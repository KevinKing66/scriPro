import { Component, Input } from '@angular/core';
import { Project } from '../../../model/project.model';
import { CommonModule } from '@angular/common';
import { EvidenceCardComponent } from '../evidence-card/evidence-card.component';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule, EvidenceCardComponent],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})
export class ProjectDetailsComponent {

  @Input() project: Project | null = null;
}
