import { Component, inject, Input } from '@angular/core';
import { Project } from '../../../model/project.model';
import { CommonModule } from '@angular/common';
import { EvidenceCardComponent } from '../evidence-card/evidence-card.component';
import { Router } from '@angular/router';
import { ProjectTypeLabelPipe } from '../../../../../shared/pipes/project-type-label.pipe';
import { ReportService } from '../../../service/report.service';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule, EvidenceCardComponent, ProjectTypeLabelPipe],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})
export class ProjectDetailsComponent {
  private readonly router: Router = inject(Router);
  private readonly reportService:ReportService = inject(ReportService);

  @Input() project!: Project;
  @Input() isOwner: boolean = false;

  goToRoute() {
    this.router.navigate(['/projects/edit', this.project._id]);
  }

  exportToPdf() {
    this.reportService.generateProjectPdf(this.project);
  }

}
