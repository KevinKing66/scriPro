import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Project } from '../../../model/project.model';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ResearchGroup } from '../../../../research-group/models/research-group.model';

@Component({
  selector: 'app-project-edit-form',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './project-edit-form.component.html',
  styleUrls: ['./project-edit-form.component.css', '../../../../../shared/styles/form.css']
})
export class ProjectEditFormComponent implements OnChanges {
  @Input() project!: Project;

  @Input() state: 'FREE' | 'LOADING' | 'ERROR' | 'SUCCESS' = 'FREE';
  @Input() errorMsg: string = '';
  @Input() researchGroups: ResearchGroup[] = [];

  @Output() updated = new EventEmitter<Project>();

  private fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
    name: [this.project.name, Validators.required],
    description: [this.project.description, Validators.required],
    image: this.fb.group(this.project?.image || {}),
    status: [this.project.status, Validators.required],
    researchGroups: [this.project.researchGroups, [Validators.required]],
    members: this.fb.array(this.project?.members || []),
    evidences: this.fb.array(this.project?.evidences || []),
  });

  ngOnChanges(changes: SimpleChanges) {
    if (changes['project'] && this.project) {
      this.form.patchValue({
        ...this.project,
        updatedAt: new Date(),
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.updated.emit(this.form.value);
    }
  }

}
