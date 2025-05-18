import { Component, inject, Input } from '@angular/core';
import { Project } from '../../../model/project.model';
import { CommonModule } from '@angular/common';
import { EvidenceCardComponent } from '../evidence-card/evidence-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule, EvidenceCardComponent],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})
export class ProjectDetailsComponent {
  private readonly router: Router = inject(Router);

  @Input() project!: Project;
  @Input() isOwner: boolean = false;

  goToRoute() {
    this.router.navigate(['/projects/edit', this.project._id]);
  }
}
