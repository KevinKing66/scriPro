import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login-user-form',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login-user-form.component.html',
  styleUrl: './login-user-form.component.css'
})
export class LoginUserFormComponent {
  @Output() submitted = new EventEmitter<User>();

  email: string = '';
  password: string = '';

  onLogin() {
    this.submitted.emit({ email: this.email, password: this.password } as User);
  }

}
