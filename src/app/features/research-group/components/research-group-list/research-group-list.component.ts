import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ResearchGroup } from '../../models/research-group.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-research-group-list',
  imports: [RouterModule, CommonModule],
  templateUrl: './research-group-list.component.html',
  styleUrl: './research-group-list.component.css'
})
export class ResearchGroupListComponent {
  @Input() researchGroups: ResearchGroup[] = [];
}
