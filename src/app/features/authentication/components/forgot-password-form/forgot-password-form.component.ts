import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ForgotPassword } from '../../../../../../../../backend/scri-pro/src/auth/dto/forgot-password.dto';

@Component({
  selector: 'app-forgot-password-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './forgot-password-form.component.html',
  styleUrl: './forgot-password-form.component.css'
})
export class ForgotPasswordFormComponent {
  @Input()
  cancel: () => void = () => {};

  @Input()
  errorMsg: string = '';

  @Input()
  state: "FREE" | "LOADING" | "SUCCESS" | "ERROR" = "FREE";

  @Output() submitted = new EventEmitter<ForgotPassword>();

  private formBuilder = inject(FormBuilder);

  forgotPasswordForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    code: ['', Validators.required],
    newPassword: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/),
      ],
    ],
  });;

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      const data = this.forgotPasswordForm.value;
      console.log('Enviar datos al backend', data);
      // Aquí llamas al servicio para restablecer la contraseña
    }
  }
}
