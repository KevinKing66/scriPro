import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ChangePassword } from '../../models/change-password';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../../validators/password-match.validator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-change-password-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './change-password-form.component.html',
  styleUrl: '../../../../shared/styles/form.css'
})
export class ChangePasswordFormComponent {
  @Input()
  errorMsg: string = "";

  @Input()
  state: "FREE" | "LOADING" | "ERROR" | "SUCCESS" = "FREE";

  @Output()
  submitted = new EventEmitter<ChangePassword>();


  private formBuilder = inject(FormBuilder);

  form = new FormGroup({
    newPassword: this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/)
    ]),
    currentPassword: this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/)
    ]),
    confirmPassword: this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/),
      passwordMatchValidator()
    ]),
  });



  onSubmit() {
    if (this.form.valid) {
      this.submitted.emit(this.form.value as ChangePassword);
      this.form.reset();
    } else {
      this.form.markAllAsTouched();
    }
  }


}
