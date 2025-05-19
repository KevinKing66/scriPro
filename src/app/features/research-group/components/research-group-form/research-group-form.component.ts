import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-research-group-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './research-group-form.component.html',
  styleUrl: './research-group-form.component.css'
})
export class ResearchGroupFormComponent implements OnInit {
  @Input() initialData?: any;
  @Output() formSubmitted = new EventEmitter<any>();


  form!: FormGroup;
  showErrors = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      code: [this.initialData?.code || '', Validators.required],
      name: [this.initialData?.name || '', Validators.required],
      description: [this.initialData?.description || '', Validators.required],
      admin: this.fb.group({
        name: [this.initialData?.admin?.name || ''],
        email: [this.initialData?.admin?.email || ''],
      }),
      faculty: [this.initialData?.faculty || ''],
      contactEmail: [this.initialData?.contactEmail || '', Validators.email],
      status: [this.initialData?.status || 'ACTIVE', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.formSubmitted.emit(this.form.value);
    } else {
      this.showErrors = true;
      this.form.markAllAsTouched();
    }
  }

  hasError(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!control && control.invalid && (control.touched || this.showErrors);
  }

  hasGroupError(group: string, field: string): boolean {
    const control = this.form.get([group, field].join('.'));
    return !!control && control.invalid && (control.touched || this.showErrors);
  }
}
