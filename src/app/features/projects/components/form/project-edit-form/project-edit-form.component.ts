import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Projects } from '../../../model/project.model';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-project-edit-form',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './project-edit-form.component.html',
  styleUrls: ['./project-edit-form.component.css', '../../../../../shared/styles/form.css']
})
export class ProjectEditFormComponent implements OnChanges {
  @Input() project!: Projects;
  @Output() updated = new EventEmitter<Projects>();

  private fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    imageUrl: [''],
    status: ['ACTIVE', Validators.required],
    researchGroups: this.fb.array([]),
    updatedAt: [new Date()],
    evidences: this.fb.array([]),
    members: this.fb.array([]),
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
