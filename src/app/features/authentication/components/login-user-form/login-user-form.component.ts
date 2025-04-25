import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-user-form',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './login-user-form.component.html',
  styleUrls: ['./login-user-form.component.css', '../../../../shared/styles/form.css']
})
export class LoginUserFormComponent {
  @Input() state: "FREE" | "LOADING" | "ERROR" | "SUCCESS" = "FREE";
  @Output() submitted = new EventEmitter<User>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    if (this.form.valid) {
      this.submitted.emit(this.form.value as User);
      this.form.reset();
    } else {
      this.form.markAllAsTouched();
    }
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }
}
