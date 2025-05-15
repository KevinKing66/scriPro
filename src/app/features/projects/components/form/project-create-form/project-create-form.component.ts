import { CommonModule } from '@angular/common';
import { Component, EventEmitter,Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ResearchGroup } from '../../../model/project.model';

@Component({
  selector: 'app-project-create-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './project-create-form.component.html',
  styleUrls: ['./project-create-form.component.css', '../../../../../shared/styles/form.css']
})
export class ProjectCreateFormComponent implements OnInit {
  @Input() state: 'FREE' | 'LOADING' | 'ERROR' | 'SUCCESS' = 'FREE';
  @Input() errorMsg: string = '';
  @Input() initialData: any = null;
  @Output() formSubmit = new EventEmitter<any>(); // Para emitir los datos del formulario al padre

  projectForm!: FormGroup;

  @Input() researchGroups: ResearchGroup[] = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    const defaultGroup = this.researchGroups.length > 0 ? this.researchGroups[0].code : null;

    this.projectForm = this.fb.group({
      code: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      creationDateTime: [new Date()],
      status: ['ACTIVE', [Validators.required]],
      researchGroupId: [defaultGroup, [Validators.required]],
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
    this.members.push(
      this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]]
      })
    );
  }

  addEvidence(): void {
    this.evidences.push(
      this.fb.group({
        description: ['', Validators.required],
        content: [''],
        type: ['image', Validators.required],
        creationDateTime: [new Date()],
        participants: [[]]
      })
    );
  }

  async onFileChange(event: any, index: number): Promise<void> {
    const file = event.target.files[0];
    if (!file) return;

    const base64 = await this.convertToBase64(file);
    this.evidences.at(index).patchValue({ content: base64 });
  }

  convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  submitForm(): void {
    if (this.projectForm.invalid) {
      console.warn('Formulario inválido');
      return;
    }

    const participants = this.members.value;
    this.evidences.controls.forEach(evidence => {
      evidence.patchValue({ participants });
    });

    console.log('Proyecto creado:', this.projectForm.value);
    this.formSubmit.emit(this.projectForm.value);
  }
}

/*
{
    "code": "prueba",
    "name": "proyecto de prueba",
    "description": "Este es un proyecto de prueba",
    "creationDateTime": "2025-05-15T03:48:45.659Z",
    "status": "ACTIVE",
    "researchGroupId": "Prueba",
    "members": [
        {
            "name": "kevin",
            "email": "kevin@test.com"
        }
    ],
    "evidences": [
        {
            "description": "Prueba de descripcion",
            "content": "data:image/jpeg;base64,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",
            "type": "image",
            "creationDateTime": "2025-05-15T03:49:12.985Z",
            "participants": [
                {
                    "name": "kevin",
                    "email": "kevin@test.com"
                }
            ]
        }
    ]
}
*/
