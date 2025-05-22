import { Component, Input } from '@angular/core';
import { Evidences } from '../../../model/project.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-evidence-card',
  imports: [CommonModule],
  templateUrl: './evidence-card.component.html',
  styleUrl: './evidence-card.component.css'
})
export class EvidenceCardComponent {

  @Input() evidence!: Evidences;

  isImage(): boolean {
    return this.evidence.type.startsWith('image/');
  }

  isPdf(): boolean {
    return this.evidence.type === 'application/pdf';
  }

  isDocument(): boolean {
    const docTypes = [
      // Word
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      // OpenDocument (LibreOffice / OpenOffice)
      'application/vnd.oasis.opendocument.text',
      'application/vnd.oasis.opendocument.spreadsheet',
      'application/vnd.oasis.opendocument.presentation',
    ];
    return docTypes.includes(this.evidence.type);
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString();
  }
}
