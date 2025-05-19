import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { simpleResearchGroup } from '../../../model/simple-researchGroup.model';
import { Project } from '../../../model/project.model';

@Component({
  selector: 'app-project-edit-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './project-edit-form.component.html',
  styleUrls: ['./project-edit-form.component.css']
})
export class ProjectEditFormComponent implements OnInit, OnChanges {

  @Input() project!: Project;
  @Input() researchGroups: simpleResearchGroup[] = [];
  @Input() state: 'FREE' | 'LOADING' | 'ERROR' | 'SUCCESS' = 'FREE';
  @Input() errorMsg: string = '';

  @Output() updated = new EventEmitter<any>();

  projectForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['project'] && this.project) {
      this.initForm();
    }
  }

  initForm() {
    this.projectForm = this.fb.group({
      code: [this.project?.code || '', Validators.required],
      name: [this.project?.name || '', Validators.required],
      description: [this.project?.description || '', Validators.required],
      status: [this.project?.status || 'ACTIVE', Validators.required],
      researchGroups: [this.project?.researchGroups || [], Validators.required],
      image: this.fb.group({
        content: [this.project?.image?.content || '']
      }),
      members: this.fb.array([]),
      evidences: this.fb.array([])
    });

    // Inicializar members
    if (this.project?.members?.length) {
      this.project.members.forEach((m: any) => this.addMember(m));
    }

    // Inicializar evidences
    if (this.project?.evidences?.length) {
      this.project.evidences.forEach((e: any) => this.addEvidence(e));
    }
  }

  get members(): FormArray {
    return this.projectForm.get('members') as FormArray;
  }

  get evidences(): FormArray {
    return this.projectForm.get('evidences') as FormArray;
  }

  addMember(memberData?: any): void {
    this.members.push(this.fb.group({
      name: [memberData?.name || '', Validators.required],
      email: [memberData?.email || '', [Validators.required, Validators.email]]
    }));
  }

  removeMember(index: number): void {
    this.members.removeAt(index);
  }

  addEvidence(evidenceData?: any): void {
    this.evidences.push(this.fb.group({
      description: [evidenceData?.description || '', Validators.required],
      content: [evidenceData?.content || ''],
      type: [evidenceData?.type || 'image', Validators.required],
      creationDateTime: [evidenceData?.creationDateTime || new Date()],
      participants: [evidenceData?.participants || []]
    }));
  }

  removeEvidence(index: number): void {
    this.evidences.removeAt(index);
  }

  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    this.convertToBase64(file).then(base64 => {
      this.projectForm.get('image')?.patchValue({ content: base64 });
    });
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

    // Armar sólo los campos modificados para UpdateProject
    const updatedData: any = {};
    const formValue = this.projectForm.value;

    // Comparar con this.project para enviar solo lo modificado
    if (formValue.code !== this.project.code) updatedData.code = formValue.code;
    if (formValue.name !== this.project.name) updatedData.name = formValue.name;
    if (formValue.description !== this.project.description) updatedData.description = formValue.description;
    if (formValue.status !== this.project.status) updatedData.status = formValue.status;

    // Para grupos de investigación, comparar arrays (simple versión)
    if (JSON.stringify(formValue.researchGroups) !== JSON.stringify(this.project.researchGroups)) {
      updatedData.researchGroups = formValue.researchGroups;
    }

    // Para imagen, si cambió contenido
    if (formValue.image?.content !== this.project.image?.content) {
      updatedData.image = formValue.image;
    }

    // Para members y evidences, mandamos completos (puedes mejorar validando cambios)
    if (this.members.length > 0) {
      updatedData.members = formValue.members;
    }
    if (this.evidences.length > 0) {
      updatedData.evidences = formValue.evidences;
    }

    this.updated.emit(updatedData);
  }
}
