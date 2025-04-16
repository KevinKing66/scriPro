import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { User } from '../../../model/user.model';

@Component({
  selector: 'app-register-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './log-up.component.html',
  styleUrl: './log-up.component.css'
})
// RegisterUserFormComponent
export class RegisterUserFormComponent {
  @Output() submitted = new EventEmitter<User>();

  private formBuilder = inject(FormBuilder);

  form = new FormGroup({
    name: this.formBuilder.control('', Validators.required),
    lastName: this.formBuilder.control('', Validators.required),
    email: this.formBuilder.control('', [Validators.required, Validators.email]),
    password: this.formBuilder.control('', Validators.required),
    studentCode: this.formBuilder.control('', Validators.required),
    docNum: this.formBuilder.control('', Validators.required),
    docType: this.formBuilder.control('', Validators.required),
    phone: this.formBuilder.control('', Validators.required),
    role: this.formBuilder.control('STUDENT', Validators.required),
    researchGroupId: this.formBuilder.control(0, Validators.required),
    status: this.formBuilder.control('ACTIVE', Validators.required),
  });


  onSubmit() {
    if (this.form.valid) {
      this.submitted.emit(this.form.getRawValue() as User);
    }
  }
}
