import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Projects } from '../../../model/project.model';

@Component({
  selector: 'app-project-create-form',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './project-create-form.component.html',
  styleUrl: './project-create-form.component.css'
})
export class ProjectCreateFormComponent implements OnInit {
  @Input() initialData: any = null; // Para recibir datos iniciales si los hay
  @Output() formSubmit = new EventEmitter<any>(); // Para emitir los datos del formulario al padre

  projectForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      creationDateTime: [new Date(), [Validators.required]],
      status: ['ACTIVE', [Validators.required]],
      researchGroupId: [null, [Validators.required]],
      members: this.fb.array([]),
      evidences: this.fb.array([])
    });
  }

  get members(): FormArray {
    return this.projectForm.get('members') as FormArray;
  }

  get evidences(): FormArray {
    return this.projectForm.get('evidences') as FormArray;
  }

  addMember(): void {
    this.members.push(this.fb.control('', Validators.required));
  }

  addEvidence(): void {
    this.evidences.push(
      this.fb.group({
        uuid: [''],
        description: ['', Validators.required],
        filePath: [''],
        fileName: [''],
        type: ['', Validators.required],
        creationDateTime: [new Date(), Validators.required]
      })
    );
  }

  submitForm(): void {
    if (this.projectForm.valid) {
      console.log('Proyecto creado:', this.projectForm.value);
      this.formSubmit.emit(this.projectForm.value); // Emitir los datos
    }
  }
}
