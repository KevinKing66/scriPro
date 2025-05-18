import { CommonModule } from '@angular/common';
import { Component, EventEmitter,Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ResearchGroup } from '../../../../research-group/models/research-group.model';

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

  @Input() owner!: { email: string, name: string};

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    this.projectForm = this.fb.group({
      code: ['', [Validators.required]],
      name: ['', [Validators.required]],
      owner: [this.owner, [Validators.required]],
      description: ['', [Validators.required]],
      creationDateTime: [new Date()],
      status: ['ACTIVE', [Validators.required]],
      researchGroups: [[], [Validators.required]],
      image: this.fb.group({
        content: ['']
      }),
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

  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    this.convertToBase64(file).then(base64 => {
      this.projectForm.get('image')?.patchValue({ content: base64 });
    });
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

  removeEvidence(index: number): void {
    this.evidences.removeAt(index);
  }

  removeMember(index: number): void {
    this.members.removeAt(index);
  }

  async onFileChange(event: any, index: number): Promise<void> {
    const file = event.target.files[0];
    if (!file) return;

    const base64 = await this.convertToBase64(file);
    const mimeType = this.getMimeTypeFromBase64(base64);

    this.evidences.at(index).patchValue({
      content: base64,
      type: mimeType,
    });
  }

  getMimeTypeFromBase64(base64: string): string {
    const mimeType = base64.split(';')[0].split(':')[1];
    return mimeType;
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
      this.projectForm.markAllAsTouched();
      return;
    }

    const participants = this.members.value;
    this.evidences.controls.forEach(evidence => {
      evidence.patchValue({ participants });
    });

    this.formSubmit.emit(this.projectForm.value);
    this.projectForm.reset();
  }
}
